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
import { OrbitControls, Stars, Html } from '@react-three/drei';
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
          <meshBasicMaterial color="#c9a84c" wireframe transparent opacity={0.035 + (i === 0 ? 0.03 : 0)} depthWrite={false} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2 + 0.42, 0, 0]}>
        <torusGeometry args={[SHELLS['cross-tier'].r, 0.02, 8, 160]} />
        <meshBasicMaterial color="#f0d080" transparent opacity={0.35} />
      </mesh>
      {/* the Source */}
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial color="#fff1c4" />
      </mesh>
      <sprite scale={[5, 5, 5]}>
        <spriteMaterial map={useMemo(glowTexture, [])} color="#e9c86a" transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
    </group>
  );
}

// ── Stars (figures) ──
function Figures({ facets, positions, colorOf, degree, visible, selectedId, related, onHover, onPick }) {
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
      col.set(isSel ? '#fff4d4' : colorOf(f));
      if (dim) col.multiplyScalar(0.22);
      else if (isRel) col.lerp(new THREE.Color('#f0d080'), 0.45);
      m.setColorAt(i, col);
      colors.setXYZ(i, col.r, col.g, col.b);
    });
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
    colors.needsUpdate = true;
  }, [facets, positions, selectedId, related, visible, colorOf, degree, glowGeo, tmp, col]);

  return (
    <group>
      <points ref={pts} geometry={glowGeo}>
        <pointsMaterial map={tex} size={0.95} sizeAttenuation vertexColors transparent opacity={0.6}
          depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <instancedMesh
        ref={mesh}
        args={[null, null, facets.length]}
        onPointerMove={(e) => { e.stopPropagation(); onHover(e.instanceId ?? null); }}
        onPointerOut={() => onHover(null)}
        onClick={(e) => { e.stopPropagation(); if (e.instanceId != null) onPick(e.instanceId); }}
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
      col.set(BAND_COLORS[e.band] || '#8f8263').multiplyScalar(hot ? 1.6 : e.sig ? 0.75 : 0.32);
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

function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch { return false; }
}

export default function CosmosView({ facets, deityById, traditionById, parallels, isFacetVisible, selectedFacetId, selectedRelated, onSelect, onClear, colorFor, onUnavailable }) {
  const controls = useRef();
  const [hover, setHover] = useState(null);
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

  return (
    <div className="cosmos" style={{ position: 'relative', height: 'calc(100dvh - 210px)', minHeight: 460 }}>
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
        camera={{ fov: 50, near: 0.1, far: 600, position: [0, 18, 95] }}
        onPointerMissed={() => setHover(null)}
        style={{ cursor: hover != null ? 'pointer' : 'grab', touchAction: 'none' }}
      >
        <color attach="background" args={['#050408']} />
        <fog attach="fog" args={['#050408', 45, 140]} />
        <Stars radius={160} depth={60} count={reduceMotion ? 1500 : 4000} factor={4} saturation={0} fade speed={reduceMotion ? 0 : 0.6} />
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
          onPick={(i) => onSelect(facets[i].id)}
        />
        {hovered && (
          <Html position={positions[hovered.id]} center style={{ pointerEvents: 'none', transform: 'translateY(-26px)' }}>
            <div className="cosmos-tip">
              <div className="cosmos-tip__name">{hoveredDeity?.primary_name}</div>
              <div className="cosmos-tip__meta">{hoveredTrad?.name || hoveredDeity?.tradition_id} · {hovered.facet_name}</div>
            </div>
          </Html>
        )}
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
      </Canvas>

      <div className="cosmos-legend glass">
        <div className="marginalia" style={{ color: '#f0d080' }}>The Cosmos</div>
        <div className="cosmos-legend__row">{facets.length} figures · {edges.length} parallels</div>
        <div className="cosmos-legend__row">Drag to orbit · pinch or scroll to zoom · tap a figure</div>
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
