// ─────────────────────────────────────────────────────────────────────────────
// CosmosView — the Source Map as an explorable 3D cosmos (React Three Fiber).
//
// Every facet is a glowing star placed on its tier's shell: Tier I (the
// Unmanifest Source) at the heart, Tier II around it, the Cross-Tier
// light-bringers on a tilted band between worlds, then Tier III and the
// Archons (Tier IV) on the outermost shell. Canonical parallels are threads
// of light coloured by specificity. Drag to orbit, scroll / pinch to zoom,
// hover for a name, tap to open the figure. GSAP flies the camera.
// ─────────────────────────────────────────────────────────────────────────────
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, PerformanceMonitor } from '@react-three/drei';
import gsap from 'gsap';

const SHELLS = {
  1: { r: 3.2, label: 'I · Unmanifest Source' },
  2: { r: 7.5, label: 'II · True Most High' },
  'cross-tier': { r: 11, label: '✶ Light-Bringers' },
  3: { r: 14.5, label: 'III · Demiurge' },
  4: { r: 18.5, label: 'IV · Archons' },
};
const BAND_COLORS = {
  specific: '#5fb39a',
  moderate: '#e0b85e',
  'universal-motif': '#d9775f',
  'tag-divergent': '#8d918f',
};

function tierKey(t) {
  const k = String(t);
  return SHELLS[k] ? (k === 'cross-tier' ? 'cross-tier' : Number(k)) : 4;
}

// Deterministic hash → [0,1)
function rand(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  return ((h >>> 0) % 100000) / 100000;
}

function layout(facets) {
  const byTier = {};
  facets.forEach((f) => { const k = tierKey(f.tier_assignment); (byTier[k] = byTier[k] || []).push(f); });
  const pos = {};
  const golden = Math.PI * (3 - Math.sqrt(5));
  Object.entries(byTier).forEach(([k, list]) => {
    const shell = SHELLS[k];
    const n = list.length;
    list.forEach((f, i) => {
      const jitter = 1 + (rand(f.id) - 0.5) * 0.12;
      if (k === 'cross-tier') {
        // Tilted band between the worlds
        const a = (i / n) * Math.PI * 2 + rand(f.id + 'a') * 0.2;
        const y = (rand(f.id + 'y') - 0.5) * 2.4;
        const v = new THREE.Vector3(Math.cos(a) * shell.r * jitter, y, Math.sin(a) * shell.r * jitter);
        v.applyAxisAngle(new THREE.Vector3(1, 0, 0), 0.42);
        pos[f.id] = v;
      } else {
        // Fibonacci sphere
        const y = 1 - (i / Math.max(1, n - 1)) * 2;
        const rad = Math.sqrt(Math.max(0, 1 - y * y));
        const th = golden * i;
        pos[f.id] = new THREE.Vector3(Math.cos(th) * rad, y, Math.sin(th) * rad).multiplyScalar(shell.r * jitter);
      }
    });
  });
  return pos;
}

function glowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.18, 'rgba(255,255,255,0.85)');
  grd.addColorStop(0.45, 'rgba(255,255,255,0.22)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const reduceMotion = typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Shells: faint sacred-geometry spheres ──
function Shells() {
  const group = useRef();
  useFrame((_, dt) => { if (group.current && !reduceMotion) group.current.rotation.y += dt * 0.015; });
  return (
    <group ref={group}>
      {[1, 2, 3, 4].map((k, i) => (
        <mesh key={k}>
          <icosahedronGeometry args={[SHELLS[k].r, i < 2 ? 2 : 3]} />
          <meshBasicMaterial color="#86bba6" wireframe transparent opacity={0.035 + (i === 0 ? 0.03 : 0)} depthWrite={false} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2 + 0.42, 0, 0]}>
        <torusGeometry args={[SHELLS['cross-tier'].r, 0.02, 8, 160]} />
        <meshBasicMaterial color="#b5d6c8" transparent opacity={0.35} />
      </mesh>
      {/* the Source */}
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial color="#f1efe3" />
      </mesh>
      <sprite scale={[5, 5, 5]}>
        <spriteMaterial map={useMemo(glowTexture, [])} color="#d9d4b0" transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
    </group>
  );
}

// ── Stars (figures) ──
function Figures({ facets, positions, colorOf, degree, visible, selectedId, related, onHover, onPick, lite }) {
  const mesh = useRef();
  const pts = useRef();
  const tex = useMemo(glowTexture, []);
  const tmp = useMemo(() => new THREE.Object3D(), []);
  const col = useMemo(() => new THREE.Color(), []);

  const glowGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const p = new Float32Array(facets.length * 3);
    facets.forEach((f, i) => { const v = positions[f.id]; p.set([v.x, v.y, v.z], i * 3); });
    g.setAttribute('position', new THREE.BufferAttribute(p, 3));
    g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(facets.length * 3), 3));
    return g;
  }, [facets, positions]);

  useEffect(() => {
    const m = mesh.current;
    if (!m) return;
    const colors = glowGeo.attributes.color;
    facets.forEach((f, i) => {
      const v = positions[f.id];
      const isSel = f.id === selectedId;
      const isRel = related.has(f.id);
      const dim = (selectedId && !isSel && !isRel) || !visible(f);
      const s = (0.09 + Math.min(0.16, (degree[f.id] || 0) * 0.025)) * (isSel ? 2.4 : isRel ? 1.6 : 1) * (dim ? 0.7 : 1);
      tmp.position.copy(v);
      tmp.scale.setScalar(s);
      tmp.updateMatrix();
      m.setMatrixAt(i, tmp.matrix);
      col.set(isSel ? '#f1efe3' : colorOf(f));
      if (dim) col.multiplyScalar(0.22);
      else if (isRel) col.lerp(new THREE.Color('#b5d6c8'), 0.45);
      m.setColorAt(i, col);
      colors.setXYZ(i, col.r, col.g, col.b);
    });
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
    colors.needsUpdate = true;
  }, [facets, positions, selectedId, related, visible, colorOf, degree, glowGeo, tmp, col]);

  return (
    <group>
      <points ref={pts} geometry={glowGeo} visible={!lite}>
        <pointsMaterial map={tex} size={0.95} sizeAttenuation vertexColors transparent opacity={0.6}
          depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <instancedMesh
        ref={mesh}
        args={[null, null, facets.length]}
        onPointerMove={(e) => { e.stopPropagation(); onHover(e.instanceId ?? null, e.nativeEvent.offsetX, e.nativeEvent.offsetY); }}
        onPointerOut={() => onHover(null)}
        onClick={(e) => {
          e.stopPropagation();
          // Ignore the click that ends an orbit drag (R3F reports the pointer travel in px)
          if (e.delta > 6 || e.instanceId == null) return;
          onPick(e.instanceId);
        }}
      >
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

// ── Threads (parallels) ──
function Threads({ edges, positions, selectedId }) {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const p = new Float32Array(edges.length * 6);
    const c = new Float32Array(edges.length * 6);
    const col = new THREE.Color();
    edges.forEach((e, i) => {
      const a = positions[e.a], b = positions[e.b];
      p.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6);
      const hot = selectedId && (e.a === selectedId || e.b === selectedId);
      col.set(BAND_COLORS[e.band] || '#939179').multiplyScalar(hot ? 1.6 : e.sig ? 0.75 : 0.32);
      if (selectedId && !hot) col.multiplyScalar(0.35);
      c.set([col.r, col.g, col.b, col.r, col.g, col.b], i * 6);
    });
    g.setAttribute('position', new THREE.BufferAttribute(p, 3));
    g.setAttribute('color', new THREE.BufferAttribute(c, 3));
    return g;
  }, [edges, positions, selectedId]);
  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial vertexColors transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

// ── Camera choreography (GSAP) ──
function Director({ controls, focus }) {
  const { camera } = useThree();
  const first = useRef(true);
  useEffect(() => {
    const c = controls.current;
    if (!c) return;
    const d = reduceMotion ? 0 : 1;
    if (first.current) {
      first.current = false;
      camera.position.set(0, 18, 95);
      gsap.to(camera.position, { x: 0, y: 9, z: 40, duration: 2.6 * d, ease: 'power3.out', onUpdate: () => c.update() });
      return;
    }
    const target = focus ? focus.clone() : new THREE.Vector3();
    const dir = focus ? focus.clone().normalize() : new THREE.Vector3(0, 0.22, 1).normalize();
    const dist = focus ? Math.max(9, focus.length() * 0.9 + 6) : 40;
    const to = focus ? target.clone().add(dir.multiplyScalar(dist * 0.55)).add(new THREE.Vector3(0, 2, 0)) : dir.multiplyScalar(dist);
    gsap.to(c.target, { x: target.x, y: target.y, z: target.z, duration: 1.4 * d, ease: 'power2.inOut', onUpdate: () => c.update() });
    gsap.to(camera.position, { x: to.x, y: to.y, z: to.z, duration: 1.4 * d, ease: 'power2.inOut', onUpdate: () => c.update() });
  }, [focus, controls, camera]);
  return null;
}

// Keep the selected figure in the part of the canvas the detail sheet
// does not cover: shift the projection up by half the covered height.
function ViewOffset({ wrapRef }) {
  const { camera, size } = useThree();
  const cur = useRef(0);
  useFrame(() => {
    let want = 0;
    const wrap = wrapRef.current;
    if (wrap) {
      const sheet = wrap.getRootNode().querySelector('.sheet');
      if (sheet) {
        const c = wrap.getBoundingClientRect();
        const covered = Math.max(0, Math.min(c.bottom, window.innerHeight) - sheet.getBoundingClientRect().top);
        want = Math.min(covered, size.height * 0.8) / 2;
      }
    }
    cur.current += (want - cur.current) * (reduceMotion ? 1 : 0.12);
    if (Math.abs(cur.current) < 0.5) { if (camera.view) camera.clearViewOffset(); return; }
    camera.setViewOffset(size.width, size.height, 0, cur.current, size.width, size.height);
  });
  return null;
}

// Real GPU required: software rendering (failIfMajorPerformanceCaveat) gets
// the 2D views instead, so slow machines never land in a stuttering 3D scene.
function webglAvailable() {
  try {
    if (window.__FORCE_3D__) return true;
    const c = document.createElement('canvas');
    const opts = { failIfMajorPerformanceCaveat: true };
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2', opts) || c.getContext('webgl', opts)));
  } catch { return false; }
}

export default function CosmosView({ facets, deityById, traditionById, parallels, isFacetVisible, selectedFacetId, selectedRelated, onSelect, onClear, colorFor, onUnavailable, onBrowseList }) {
  const controls = useRef();
  const wrapRef = useRef();
  const [hover, setHoverState] = useState(null);
  const [tip, setTip] = useState({ x: 0, y: 0 });
  const [dpr, setDpr] = useState(1.5);
  const [lite, setLite] = useState(false);
  const setHover = useCallback((id, x, y) => {
    setHoverState(id);
    if (id != null && x != null) setTip({ x, y });
  }, []);
  const [ok] = useState(webglAvailable);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => { if (!ok && onUnavailable) onUnavailable(); }, [ok, onUnavailable]);

  const positions = useMemo(() => layout(facets), [facets]);
  const degree = useMemo(() => {
    const d = {};
    parallels.forEach((p) => { d[p.facet_a_id] = (d[p.facet_a_id] || 0) + 1; d[p.facet_b_id] = (d[p.facet_b_id] || 0) + 1; });
    return d;
  }, [parallels]);
  const edges = useMemo(() => parallels
    .filter((p) => positions[p.facet_a_id] && positions[p.facet_b_id])
    .map((p) => ({ a: p.facet_a_id, b: p.facet_b_id, band: p.specificity_band, sig: p.specificity_significant !== false })), [parallels, positions]);
  const colorOf = useCallback((f) => {
    const deity = deityById[f.parent_deity_id];
    return colorFor(deity ? deity.tradition_id : null).edge;
  }, [deityById, colorFor]);

  const focus = selectedFacetId && positions[selectedFacetId] ? positions[selectedFacetId] : null;
  const hovered = hover != null ? facets[hover] : null;
  const hoveredDeity = hovered ? deityById[hovered.parent_deity_id] : null;
  const hoveredTrad = hoveredDeity ? traditionById[hoveredDeity.tradition_id] : null;

  if (!ok) return null;

  // Tooltip stays inside the canvas: flip left/below near the edges
  const wrapW = wrapRef.current ? wrapRef.current.clientWidth : 0;
  const tipLeft = tip.x > wrapW / 2;
  const tipStyle = {
    left: tipLeft ? undefined : Math.max(8, tip.x + 14),
    right: tipLeft ? Math.max(8, wrapW - tip.x + 14) : undefined,
    top: tip.y < 70 ? tip.y + 18 : tip.y - 58,
  };

  return (
    <div ref={wrapRef} className={'cosmos' + (selectedFacetId ? ' has-sel' : '')} role="region"
      aria-label={`3D cosmos of ${facets.length} figures. Use the Tiers view to browse them as a list.`}
      style={{ position: 'relative', height: 'calc(100dvh - 210px - var(--nav-h, 0px))', minHeight: 420 }}>
      <Canvas
        dpr={dpr}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
        camera={{ fov: 50, near: 0.1, far: 600, position: [0, 18, 95] }}
        onPointerMissed={() => setHover(null)}
        style={{ cursor: hover != null ? 'pointer' : 'grab', touchAction: 'none' }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(1.5)}
          flipflops={3}
          onFallback={() => { setDpr(1); setLite(true); }}
        />
        <color attach="background" args={['#141713']} />
        <fog attach="fog" args={['#141713', 45, 140]} />
        <Stars radius={160} depth={60} count={reduceMotion || lite ? 1200 : 3000} factor={4} saturation={0} fade speed={reduceMotion ? 0 : 0.6} />
        <Shells />
        <Threads edges={edges} positions={positions} selectedId={selectedFacetId} />
        <Figures
          facets={facets}
          positions={positions}
          colorOf={colorOf}
          degree={degree}
          visible={isFacetVisible}
          selectedId={selectedFacetId}
          related={selectedRelated}
          onHover={setHover}
          onPick={(i) => { setHoverState(null); onSelect(facets[i].id); }}
          lite={lite}
        />
        <OrbitControls
          ref={controls}
          makeDefault
          enableDamping
          dampingFactor={0.07}
          minDistance={4}
          maxDistance={110}
          autoRotate={!reduceMotion && !interacted && !selectedFacetId}
          autoRotateSpeed={0.35}
          onStart={() => setInteracted(true)}
        />
        <Director controls={controls} focus={focus} />
        <ViewOffset wrapRef={wrapRef} />
      </Canvas>

      {hovered && (
        <div className="cosmos-tip" style={{ position: 'absolute', pointerEvents: 'none', ...tipStyle }}>
          <div className="cosmos-tip__name">{hoveredDeity?.primary_name}</div>
          <div className="cosmos-tip__meta">{hoveredTrad?.name || hoveredDeity?.tradition_id} · {hovered.facet_name}</div>
        </div>
      )}

      <div className="cosmos-legend glass">
        <div className="marginalia" style={{ color: '#b5d6c8' }}>The Cosmos</div>
        <div className="cosmos-legend__row">{facets.length} figures · {edges.length} parallels</div>
        <div className="cosmos-legend__row">Drag to orbit · pinch or scroll to zoom · tap a figure</div>
        {onBrowseList && (
          <button className="cosmos-list-btn" onClick={onBrowseList}>Browse as a list</button>
        )}
      </div>
      <div className="cosmos-tiers glass">
        {[1, 2, 'cross-tier', 3, 4].map((k) => (
          <div key={k} className="cosmos-tiers__item">{SHELLS[k].label}</div>
        ))}
      </div>
      {selectedFacetId && (
        <button className="cosmos-reset glass" onClick={() => onClear && onClear()}>Show whole cosmos</button>
      )}
    </div>
  );
}
