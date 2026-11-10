import { useEffect, useRef } from 'react';

// A pointer-reactive wireframe globe drawn on a 2D canvas (no 3D library).
// Decorative only: it marks the two campuses and a few network links.

const DEG = Math.PI / 180;
const CENTER_LON = 104; // keep South-East Asia facing the viewer
const BASE_PITCH = 14 * DEG;

// [lat, lon, label?] — the first two are the campuses, the rest are plain nodes.
const NODES = [
  [4.6, 101.1, 'UTP · PERAK'],
  [-7.25, 112.75, 'ITS · SURABAYA'],
  [-6.2, 106.8],
  [1.35, 103.8],
  [13.7, 100.5],
  [22.3, 114.2],
  [35.7, 139.7],
  [25.2, 55.3],
  [19.0, 72.8],
  [-33.9, 151.2],
  [37.5, 127.0],
  [14.6, 121.0],
  [-31.9, 115.9],
  [51.5, -0.1],
];

// [from, to, hot?] — `hot` links use the red accent.
const LINKS = [
  [0, 1, true],
  [0, 3],
  [0, 4],
  [0, 7],
  [0, 8],
  [1, 2],
  [1, 9],
  [1, 12],
  [3, 5],
  [5, 6],
  [5, 10],
  [2, 11],
  [7, 13],
  [6, 9],
];

const toVec = (lat, lon) => {
  const phi = lat * DEG;
  const lambda = (lon - CENTER_LON) * DEG;
  return [Math.cos(phi) * Math.sin(lambda), Math.sin(phi), Math.cos(phi) * Math.cos(lambda)];
};

// Evenly distributed surface points (Fibonacci sphere).
function spherePoints(count) {
  const points = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    points.push([Math.cos(golden * i) * r, y, Math.sin(golden * i) * r]);
  }
  return points;
}

// Latitude/longitude wireframe as short line segments.
function graticule() {
  const segments = [];
  const STEP = 6;
  for (let lon = 0; lon < 360; lon += 30) {
    for (let lat = -90; lat < 90; lat += STEP) segments.push([toVec(lat, lon), toVec(lat + STEP, lon)]);
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    for (let lon = 0; lon < 360; lon += STEP) segments.push([toVec(lat, lon), toVec(lat, lon + STEP)]);
  }
  return segments;
}

// Great-circle arc between two unit vectors, lifted off the surface.
function arc(a, b, steps = 28) {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const omega = Math.acos(dot);
  const lift = 0.06 + 0.3 * (omega / Math.PI);
  const sin = Math.sin(omega) || 1;
  const points = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const wa = Math.sin((1 - t) * omega) / sin;
    const wb = Math.sin(t * omega) / sin;
    const r = 1 + lift * Math.sin(Math.PI * t);
    points.push([(a[0] * wa + b[0] * wb) * r, (a[1] * wa + b[1] * wb) * r, (a[2] * wa + b[2] * wb) * r]);
  }
  return points;
}

const NODE_VECS = NODES.map(([lat, lon]) => toVec(lat, lon));
const GRATICULE = graticule();
const ARCS = LINKS.map(([from, to, hot], i) => ({
  points: arc(NODE_VECS[from], NODE_VECS[to]),
  hot: Boolean(hot),
  phase: (i * 0.37) % 1,
}));

// `labels` annotates the two campus markers (only on wide viewports, where the
// globe is a foreground element rather than a backdrop).
export default function Globe({ className = '', labels = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const wideViewport = window.matchMedia('(min-width: 1001px)');

    let width = 0;
    let height = 0;
    let dots = [];
    let colors = { line: '90, 140, 255', hot: '255, 70, 90', text: '240, 244, 250' };
    let frame = 0;
    let inView = true;
    let start = performance.now();
    const pointer = { x: 0, y: 0 }; // target, -1..1
    const eased = { x: 0, y: 0 };

    const readColors = () => {
      const styles = getComputedStyle(canvas);
      colors = {
        line: styles.getPropertyValue('--globe-line').trim() || colors.line,
        hot: styles.getPropertyValue('--globe-hot').trim() || colors.hot,
        text: styles.getPropertyValue('--globe-text').trim() || colors.text,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = spherePoints(width < 420 ? 420 : 820);
    };

    const draw = (now) => {
      const t = (now - start) / 1000;
      eased.x += (pointer.x - eased.x) * 0.06;
      eased.y += (pointer.y - eased.y) * 0.06;

      const yaw = Math.sin(t * 0.22) * 0.55 + Math.sin(t * 0.09) * 0.18 + eased.x * 0.55;
      const pitch = BASE_PITCH + Math.sin(t * 0.17) * 0.05 + eased.y * 0.3;
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      const cx = width / 2;
      const cy = height / 2;
      const R = Math.min(width, height) * 0.4;

      // Rotate a unit-sphere vector and project it to canvas space: [x, y, depth].
      const project = (v) => {
        const x = v[0] * cosY + v[2] * sinY;
        const z0 = -v[0] * sinY + v[2] * cosY;
        const y = v[1] * cosP - z0 * sinP;
        const z = v[1] * sinP + z0 * cosP;
        return [cx + x * R, cy - y * R, z];
      };
      const rgba = (rgb, alpha) => `rgba(${rgb}, ${alpha})`;

      ctx.clearRect(0, 0, width, height);

      // Atmosphere + shaded body
      const halo = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.24);
      halo.addColorStop(0, rgba(colors.line, 0));
      halo.addColorStop(0.42, rgba(colors.line, 0.2));
      halo.addColorStop(1, rgba(colors.line, 0));
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, width, height);

      const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      body.addColorStop(0, rgba(colors.line, 0.16));
      body.addColorStop(1, rgba(colors.line, 0.02));
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = rgba(colors.line, 0.42);
      ctx.lineWidth = 1;
      ctx.stroke();

      // Wireframe: far side faint, near side brighter (two batched paths)
      const back = new Path2D();
      const front = new Path2D();
      for (const [a, b] of GRATICULE) {
        const pa = project(a);
        const pb = project(b);
        const path = pa[2] + pb[2] > 0 ? front : back;
        path.moveTo(pa[0], pa[1]);
        path.lineTo(pb[0], pb[1]);
      }
      ctx.strokeStyle = rgba(colors.line, 0.07);
      ctx.stroke(back);
      ctx.strokeStyle = rgba(colors.line, 0.26);
      ctx.stroke(front);

      // Surface dots
      for (const dot of dots) {
        const p = project(dot);
        if (p[2] <= 0) continue;
        ctx.fillStyle = rgba(colors.line, 0.12 + p[2] * 0.5);
        ctx.fillRect(p[0] - 0.75, p[1] - 0.75, 1.5, 1.5);
      }

      // Links with travelling pulses
      ctx.lineWidth = 1.25;
      for (const link of ARCS) {
        const rgb = link.hot ? colors.hot : colors.line;
        const projected = link.points.map(project);
        const visible = (p) => p[2] > 0 || Math.hypot(p[0] - cx, p[1] - cy) > R;
        ctx.beginPath();
        let drawing = false;
        for (const p of projected) {
          if (!visible(p)) {
            drawing = false;
          } else if (drawing) {
            ctx.lineTo(p[0], p[1]);
          } else {
            ctx.moveTo(p[0], p[1]);
            drawing = true;
          }
        }
        ctx.strokeStyle = rgba(rgb, link.hot ? 0.95 : 0.5);
        ctx.stroke();

        const progress = (t * 0.22 + link.phase) % 1;
        const pulse = projected[Math.round(progress * (projected.length - 1))];
        if (visible(pulse)) {
          ctx.fillStyle = rgba(rgb, 0.22);
          ctx.beginPath();
          ctx.arc(pulse[0], pulse[1], 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = rgba(link.hot ? colors.hot : colors.text, 1);
          ctx.beginPath();
          ctx.arc(pulse[0], pulse[1], 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Nodes, campus markers and their labels
      const showLabels = labels && wideViewport.matches;
      ctx.font = '500 11px "Geist Mono", ui-monospace, monospace';
      ctx.textBaseline = 'middle';
      NODES.forEach(([, , label], i) => {
        const p = project(NODE_VECS[i]);
        if (p[2] <= 0.05) return;
        if (!label) {
          ctx.fillStyle = rgba(colors.line, 0.9);
          ctx.beginPath();
          ctx.arc(p[0], p[1], 2.2, 0, Math.PI * 2);
          ctx.fill();
          return;
        }
        const ring = (t * 0.6 + i * 0.5) % 1;
        ctx.strokeStyle = rgba(colors.hot, (1 - ring) * 0.8);
        ctx.beginPath();
        ctx.arc(p[0], p[1], 4 + ring * 14, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = rgba(colors.hot, 1);
        ctx.beginPath();
        ctx.arc(p[0], p[1], 4, 0, Math.PI * 2);
        ctx.fill();

        if (!showLabels) return;
        const dir = i === 0 ? -1 : 1; // first label up-left, second down-right
        const ex = p[0] + dir * 34;
        const ey = p[1] + dir * 30;
        ctx.strokeStyle = rgba(colors.text, 0.45);
        ctx.beginPath();
        ctx.moveTo(p[0] + dir * 6, p[1] + dir * 6);
        ctx.lineTo(ex, ey);
        ctx.lineTo(ex + dir * 14, ey);
        ctx.stroke();
        ctx.textAlign = dir < 0 ? 'right' : 'left';
        ctx.fillStyle = rgba(colors.text, 0.92);
        ctx.fillText(label, ex + dir * 20, ey);
      });
    };

    const loop = (now) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    // Animate only while visible; under reduced motion render one static frame.
    const sync = () => {
      const animate = inView && !document.hidden && !reduceMotion.matches;
      if (animate && !frame) {
        frame = requestAnimationFrame(loop);
      } else if (!animate) {
        stop();
        if (reduceMotion.matches) {
          start = performance.now();
          draw(start);
        }
      }
    };

    const onPointerMove = (e) => {
      if (!finePointer.matches) return;
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onResize = () => {
      resize();
      if (!frame) draw(performance.now());
    };
    const onThemeChange = () => {
      readColors();
      if (!frame) draw(performance.now());
    };

    const resizeObserver = new ResizeObserver(onResize);
    const viewObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    const themeObserver = new MutationObserver(onThemeChange);

    readColors();
    resize();
    draw(start);
    resizeObserver.observe(canvas);
    viewObserver.observe(canvas);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    document.addEventListener('visibilitychange', sync);
    reduceMotion.addEventListener('change', sync);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    sync();

    return () => {
      stop();
      resizeObserver.disconnect();
      viewObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reduceMotion.removeEventListener('change', sync);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [labels]);

  return <canvas ref={canvasRef} className={`globe ${className}`.trim()} aria-hidden="true" />;
}
