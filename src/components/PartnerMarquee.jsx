import { useEffect, useRef } from 'react';

const PARTNERS = [
  { name: 'Indonesia Blockchain Center', logo: '/partners/indonesia-blockchain-center.png' },
  { name: 'Universiti Teknologi PETRONAS', logo: '/partners/universiti-teknologi-petronas.png' },
  { name: 'Institut Teknologi Sepuluh Nopember', logo: '/partners/institut-teknologi-sepuluh-nopember.svg' },
  { name: 'PT. United Tractors', logo: '/partners/pt-united-tractors.svg' },
  { name: 'Jasa Marga', logo: '/partners/jasa-marga.png' },
  { name: 'Travoy', logo: '/partners/travoy.png' },
  { name: 'Telkomsel', logo: '/partners/telkomsel.png' },
  { name: 'MarkPlus Inc', logo: '/partners/markplus-inc.png' },
];

// Logos drawn in white for dark backgrounds disappear on this light page.
// Sample the opaque pixels once the image loads; if they're mostly light, mark
// the logo so CSS flips it. Works for any logo added to PARTNERS later.
function flagLightLogo(img) {
  if (img.dataset.invert || !img.complete || !img.naturalWidth) return;
  try {
    const size = 48;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, size, size);
    const { data } = ctx.getImageData(0, 0, size, size);
    let weight = 0;
    let light = 0;
    for (let i = 0; i < data.length; i += 4) {
      const a = data[i + 3] / 255;
      if (a < 0.1) continue;
      const lum = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
      weight += a;
      light += a * lum;
    }
    if (weight > 0 && light / weight > 0.8) img.dataset.invert = 'true';
  } catch {
    // Cross-origin image without CORS: leave it as is.
  }
}

// Seconds for one full loop of the strip when left alone.
const LOOP_SECONDS = 36;

// Endless logo strip. It drifts left on its own, pauses under the pointer, and
// the mouse wheel (or a trackpad swipe) scrubs it sideways. Driven from JS
// rather than a CSS animation so wheel input and the drift share one offset.
export default function PartnerMarquee() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const first = trackRef.current;
    if (!root || !first) return undefined;
    // Prerendered images may finish loading before onLoad is attached.
    root.querySelectorAll('.marquee__logo').forEach(flagLightLogo);
    // Reduced motion gets a static, wrapped row from CSS instead.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const tracks = [...root.querySelectorAll('.marquee__track')];
    let offset = 0;
    let hovered = false;
    let last = performance.now();
    let frame = 0;

    const apply = () => {
      const width = first.offsetWidth;
      if (width > 0) offset = ((offset % width) + width) % width;
      const transform = `translate3d(${-offset}px, 0, 0)`;
      tracks.forEach((t) => {
        t.style.transform = transform;
      });
    };

    const tick = (now) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      if (!hovered) offset += (first.offsetWidth / LOOP_SECONDS) * dt;
      apply();
      frame = requestAnimationFrame(tick);
    };

    const onWheel = (e) => {
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? root.clientWidth : 1;
      const delta = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * unit;
      if (!delta) return;
      e.preventDefault();
      offset += delta;
      apply();
    };

    const onEnter = () => {
      hovered = true;
    };
    const onLeave = () => {
      hovered = false;
    };

    root.addEventListener('wheel', onWheel, { passive: false });
    root.addEventListener('pointerenter', onEnter);
    root.addEventListener('pointerleave', onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener('wheel', onWheel);
      root.removeEventListener('pointerenter', onEnter);
      root.removeEventListener('pointerleave', onLeave);
      tracks.forEach((t) => {
        t.style.transform = '';
      });
    };
  }, []);

  return (
    <div className="marquee" ref={rootRef}>
      <div className="marquee__track" ref={trackRef}>
        {PARTNERS.map((p) => (
          <img
            key={p.name}
            className="marquee__logo"
            src={p.logo}
            onLoad={(e) => flagLightLogo(e.currentTarget)}
            alt={p.name}
            title={p.name}
          />
        ))}
      </div>
      <div className="marquee__track" aria-hidden="true">
        {PARTNERS.map((p) => (
          <img
            key={p.name}
            className="marquee__logo"
            src={p.logo}
            onLoad={(e) => flagLightLogo(e.currentTarget)}
            alt=""
          />
        ))}
      </div>
    </div>
  );
}
