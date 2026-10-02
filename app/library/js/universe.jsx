/* =============================================================
   universe.jsx — the immersive WebGL backdrop (React Three Fiber)

   A living gold galaxy with floating sacred geometry sits behind every
   section. It follows the pointer (mouse or finger), drifts with scroll,
   and GSAP flies the camera to a new vantage point on each section.
   Honours Reduce Motion, scales particle count to the device, and pauses
   while the Source Map (its own 3D cosmos) fills the screen.
   ============================================================= */

import React, { useEffect, useMemo, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';

const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const small = Math.min(window.innerWidth, window.innerHeight) < 700;
const cores = navigator.hardwareConcurrency || 4;
const COUNT = reduceMotion ? 2000 : small ? 3000 : cores >= 8 ? 5000 : 4000;

/* Camera vantage per section: [camera x,y,z], [look x,y,z], galaxy tilt */
const SHOTS = {
  home:        { pos: [0, 13, 30],   look: [0, -3, 0],   tilt: 0.95 },
  traditions:  { pos: [22, 7, 18],   look: [4, 0, 0],    tilt: 1.05 },
  deities:     { pos: [-20, 10, 16], look: [-4, 0, 0],   tilt: 0.85 },
  texts:       { pos: [0, 30, 14],   look: [0, 0, 0],    tilt: 1.2 },
  calendars:   { pos: [26, 4, 6],    look: [8, 0, 0],    tilt: 0.7 },
  patterns:    { pos: [-10, 5, 14],  look: [-6, 0, -4],  tilt: 1.0 },
  timeline:    { pos: [0, 44, 4],    look: [0, 0, 0],    tilt: 1.4 },
  'source-map':{ pos: [0, 2, 4],     look: [0, 0, 0],    tilt: 0.95 },
};

const rig = { x: 0, y: 13, z: 30, lx: 0, ly: -3, lz: 0, tilt: 0.95 };
const pointer = { x: 0, y: 0 };
let scrollV = 0;
let paused = false;
let modalOpen = false;

/* ── Galaxy: spiral arms of gold dust (custom shader for twinkle + soft dots) ── */
function Galaxy({ geoRef }) {
  const ref = useRef();
  const { geometry, material } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const size = new Float32Array(COUNT);
    const seed = new Float32Array(COUNT);
    const inner = new THREE.Color('#fff1c4');
    const gold = new THREE.Color('#c9a84c');
    const ember = new THREE.Color('#8a4b13');
    const blue = new THREE.Color('#7fa8d8');
    const arms = 4;
    for (let i = 0; i < COUNT; i++) {
      const r = Math.pow(Math.random(), 1.35) * 30 + 0.2;
      const arm = (i % arms) / arms * Math.PI * 2;
      const spin = r * 0.2;
      const spread = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1);
      const a = arm + spin + spread * 0.9;
      pos[i * 3] = Math.cos(a) * r + (Math.random() - 0.5) * 0.6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * (2.2 - Math.min(1.8, r / 14)) * (Math.random() * 1.2);
      pos[i * 3 + 2] = Math.sin(a) * r + (Math.random() - 0.5) * 0.6;
      const c = inner.clone().lerp(gold, Math.min(1, r / 8)).lerp(ember, Math.max(0, (r - 16) / 16));
      if (Math.random() < 0.07) c.copy(blue);
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
      size[i] = (Math.random() * 1.6 + 0.5) * (r < 1.5 ? 1.8 : 1);
      seed[i] = Math.random() * 100;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    const m = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      uniforms: { uTime: { value: 0 }, uPixel: { value: Math.min(window.devicePixelRatio, 1.25) } },
      vertexShader: `
        attribute float aSize; attribute float aSeed;
        uniform float uTime; uniform float uPixel;
        varying vec3 vColor; varying float vTw;
        void main() {
          vColor = color;
          vTw = 0.55 + 0.45 * sin(uTime * 1.3 + aSeed);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * uPixel * (52.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying vec3 vColor; varying float vTw;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          a = pow(a, 1.6) * vTw;
          gl_FragColor = vec4(vColor * (0.75 + a), a * 0.9);
        }`,
    });
    return { geometry: g, material: m };
  }, []);
  useEffect(() => { if (geoRef) geoRef.current = geometry; }, [geometry, geoRef]);

  useFrame((state, dt) => {
    if (!ref.current) return;
    material.uniforms.uTime.value = state.clock.elapsedTime;
    if (!reduceMotion) ref.current.rotation.y += dt * 0.03 + scrollV * 0.0006;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, rig.tilt - 0.95, 0.05);
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}

/* ── Adaptive quality: if the frame rate sags, render fewer stars at 1x ── */
let quality = 1; // 1 = full, 0.6, 0.35
function QualityGovernor({ galaxyGeo }) {
  const gl = useThree((s) => s.gl);
  const acc = useRef({ t: 0, n: 0, settled: 0 });
  useFrame((_, dt) => {
    if (quality <= 0.35 || reduceMotion) return;
    const a = acc.current;
    a.t += dt; a.n += 1;
    if (a.t < 2) return;
    const fps = a.n / a.t;
    a.t = 0; a.n = 0;
    if (fps < 45) {
      quality = quality === 1 ? 0.6 : 0.35;
      gl.setPixelRatio(1);
      const g = galaxyGeo.current;
      if (g) g.setDrawRange(0, Math.floor(COUNT * quality));
    }
  });
  return null;
}

/* ── Floating sacred geometry ── */
const SOLIDS = [
  { geo: 'ico', pos: [-16, 5, -6], s: 1.6, speed: 0.12 },
  { geo: 'oct', pos: [17, -1, -8], s: 1.4, speed: -0.16 },
  { geo: 'dodec', pos: [12, 7, 6], s: 1.0, speed: 0.2 },
  { geo: 'torus', pos: [-13, -3, 8], s: 1.2, speed: -0.1 },
  { geo: 'tetra', pos: [4, -6, -16], s: 1.6, speed: 0.14 },
];
function Solid({ geo, pos, s, speed, i }) {
  const ref = useRef();
  useFrame((state, dt) => {
    if (!ref.current || reduceMotion || quality <= 0.35) return;
    ref.current.rotation.x += dt * speed;
    ref.current.rotation.y += dt * speed * 1.3;
    ref.current.position.y = pos[1] + Math.sin(state.clock.elapsedTime * 0.4 + i) * 0.35;
  });
  return (
    <mesh ref={ref} position={pos} scale={s}>
      {geo === 'ico' && <icosahedronGeometry args={[1, 0]} />}
      {geo === 'oct' && <octahedronGeometry args={[1, 0]} />}
      {geo === 'dodec' && <dodecahedronGeometry args={[1, 0]} />}
      {geo === 'torus' && <torusGeometry args={[1, 0.28, 10, 36]} />}
      {geo === 'tetra' && <tetrahedronGeometry args={[1, 0]} />}
      <meshBasicMaterial color="#c9a84c" wireframe transparent opacity={0.2} depthWrite={false} />
    </mesh>
  );
}

/* ── The radiant Source at the galaxy's heart ── */
function Core() {
  const tex = useMemo(() => {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, 'rgba(255,244,212,1)');
    grd.addColorStop(0.2, 'rgba(240,208,128,0.55)');
    grd.addColorStop(0.55, 'rgba(201,168,76,0.12)');
    grd.addColorStop(1, 'rgba(201,168,76,0)');
    g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  }, []);
  const ref = useRef();
  useFrame((state) => {
    if (ref.current && !reduceMotion) ref.current.scale.setScalar(4.2 + Math.sin(state.clock.elapsedTime * 0.8) * 0.3);
  });
  return (
    <sprite ref={ref} scale={[4.2, 4.2, 4.2]}>
      <spriteMaterial map={tex} transparent opacity={0.7} depthWrite={false} blending={THREE.AdditiveBlending} />
    </sprite>
  );
}

/* ── Camera follows the GSAP rig plus pointer parallax ── */
function CameraRig() {
  const { camera, invalidate } = useThree();
  const look = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const px = reduceMotion ? 0 : pointer.x * 1.6;
    const py = reduceMotion ? 0 : pointer.y * 1.0;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, rig.x + px, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, rig.y + py, 0.06);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, rig.z, 0.06);
    look.set(rig.lx, rig.ly, rig.lz);
    camera.lookAt(look);
    scrollV *= 0.92;
  });
  useEffect(() => { if (reduceMotion) invalidate(); }, [invalidate]);
  return null;
}

let invalidateRef = null;
function Pauser() {
  const setFrameloop = useThree((s) => s.setFrameloop);
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    invalidateRef = invalidate;
    const h = () => setFrameloop(paused || modalOpen || document.hidden ? 'never' : reduceMotion ? 'demand' : 'always');
    window.addEventListener('universe:pause', h);
    document.addEventListener('visibilitychange', h);
    // Freeze the galaxy behind an open detail modal (it is fully covered and blurred)
    const overlay = document.getElementById('modal-overlay');
    const mo = overlay && new MutationObserver(() => { modalOpen = overlay.getAttribute('aria-hidden') === 'false'; h(); });
    if (mo) mo.observe(overlay, { attributes: true, attributeFilter: ['aria-hidden'] });
    return () => { window.removeEventListener('universe:pause', h); document.removeEventListener('visibilitychange', h); if (mo) mo.disconnect(); };
  }, [setFrameloop, invalidate]);
  return null;
}

function Universe() {
  const geoRef = useRef(null);
  return (
    <Canvas
      dpr={[1, 1.25]}
      gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
      camera={{ fov: 55, near: 0.1, far: 200, position: [0, 13, 30] }}
      frameloop={reduceMotion ? 'demand' : 'always'}
      style={{ position: 'fixed', inset: 0 }}
    >
      <color attach="background" args={['#050408']} />
      <fog attach="fog" args={['#050408', 26, 90]} />
      <Galaxy geoRef={geoRef} />
      <QualityGovernor galaxyGeo={geoRef} />
      <Core />
      {SOLIDS.map((s, i) => <Solid key={i} i={i} {...s} />)}
      <CameraRig />
      <Pauser />
    </Canvas>
  );
}

/* Real GPU required; software rendering falls back to the light 2D starfield */
function webglAvailable() {
  try {
    if (window.__FORCE_3D__) return true;
    const c = document.createElement('canvas');
    const opts = { failIfMajorPerformanceCaveat: true };
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2', opts) || c.getContext('webgl', opts)));
  } catch { return false; }
}

/** Fly the camera to a section's vantage point. */
export function flyTo(section) {
  const shot = SHOTS[section] || SHOTS.home;
  const d = reduceMotion ? 0 : 2.2;
  gsap.to(rig, {
    x: shot.pos[0], y: shot.pos[1], z: shot.pos[2],
    lx: shot.look[0], ly: shot.look[1], lz: shot.look[2],
    tilt: shot.tilt,
    duration: d, ease: 'power3.inOut', overwrite: true,
    onUpdate: () => { if (reduceMotion && invalidateRef) invalidateRef(); },
    onComplete: () => {
      if (reduceMotion && invalidateRef) { for (let i = 0; i < 40; i++) setTimeout(() => invalidateRef && invalidateRef(), i * 16); }
      paused = section === 'source-map';
      window.dispatchEvent(new Event('universe:pause'));
    },
  });
  if (section !== 'source-map' && paused) {
    paused = false;
    window.dispatchEvent(new Event('universe:pause'));
  }
}

/** Mount the universe; returns false when WebGL is unavailable. */
export function mountUniverse(el) {
  if (!el || !webglAvailable()) return false;
  window.addEventListener('pointermove', (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
  }, { passive: true });
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => { scrollV += window.scrollY - lastY; lastY = window.scrollY; }, { passive: true });
  createRoot(el).render(<Universe />);
  return true;
}
