// The hero used by every page: one rounded card of open sky, inset from the
// edges of the page, that scrolls away with the rest of the content.
//
// The sky is drawn in the page, with no image request: a gradient, a sun
// bloom, and three layers of cloud generated from fractal noise by SVG
// filters (high wisps, a middle deck, a bank along the bottom). Each layer is
// painted once and then only moved, so the drift on scroll stays on the
// compositor (index.css).

// One cloud layer. `freq` stretches the noise (x, y), `density` is how much of
// the sky it covers, and `shade` tints the undersides for some volume.
const LAYERS = [
  { id: 'wisps', freq: '0.0035 0.016', octaves: 4, seed: 11, alpha: '2.6 -1.5', shade: 0.06 },
  { id: 'back', freq: '0.0055 0.011', octaves: 5, seed: 4, alpha: '3.4 -1.62', shade: 0.16 },
  { id: 'front', freq: '0.004 0.0085', octaves: 6, seed: 23, alpha: '4.6 -1.72', shade: 0.22 },
];

function Clouds({ id, freq, octaves, seed, alpha, shade }) {
  const [gain, offset] = alpha.split(' ');
  const base = (1 - shade).toFixed(2);
  return (
    <svg className={`scenery__clouds scenery__clouds--${id}`} width="100%" height="100%">
      <filter id={`sky-${id}`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves={octaves} seed={seed} />
        {/* White, with cool shadow where the second noise channel dips; alpha from the first. */}
        <feColorMatrix
          values={`0 ${shade * 1.6} 0 0 ${base - 0.1}  0 ${shade * 1.2} 0 0 ${base - 0.04}  0 0 0 0 1  ${gain} 0 0 0 ${offset}`}
        />
      </filter>
      <rect width="100%" height="100%" filter={`url(#sky-${id})`} />
    </svg>
  );
}

export default function HeroShell({ as: Tag = 'section', compact = false, children }) {
  return (
    <Tag className={`hero-wrap${compact ? ' hero-wrap--compact' : ''}`} data-parallax>
      <div className="hero-card">
        <div className="scenery" aria-hidden="true">
          {LAYERS.map((layer) => (
            <Clouds key={layer.id} {...layer} />
          ))}
        </div>
        <div className="hero-card__content">{children}</div>
      </div>
    </Tag>
  );
}
