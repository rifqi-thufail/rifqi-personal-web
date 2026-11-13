// Decorative glass cubes drawn with CSS 3D transforms — a nod to blocks on a
// chain. They float in the foreground, above the page content, and never take
// pointer events. Pure markup, so it prerenders and costs no JavaScript.
// The hero / header stage turns with the pointer via --px / --py (pointerFx.js).
const CLUSTER = [
  { x: '34%', y: '26%', z: '0px', size: '112px', spin: '38s', float: '7s', delay: '0s' },
  { x: '70%', y: '8%', z: '-90px', size: '64px', spin: '26s', float: '6s', delay: '-2s', tone: 'red' },
  { x: '6%', y: '10%', z: '60px', size: '48px', spin: '22s', float: '5s', delay: '-1s' },
  { x: '76%', y: '58%', z: '70px', size: '56px', spin: '30s', float: '8s', delay: '-4s' },
  { x: '12%', y: '64%', z: '-60px', size: '36px', spin: '18s', float: '6.5s', delay: '-3s', tone: 'red' },
];

// A smaller group that drifts past the edge of a section as it scrolls.
const PAIR = [
  { x: '20%', y: '8%', z: '0px', size: '72px', spin: '30s', float: '7s', delay: '-1s' },
  { x: '58%', y: '56%', z: '60px', size: '40px', spin: '20s', float: '5.5s', delay: '-3s', tone: 'red' },
];

const FACES = ['front', 'back', 'right', 'left', 'top', 'bottom'];

export default function Blocks3D({ variant = 'cluster', className = '' }) {
  const cubes = variant === 'pair' ? PAIR : CLUSTER;
  return (
    <div className={`blocks ${className}`.trim()} aria-hidden="true">
      <div className="blocks__stage">
        {cubes.map((c) => (
          <div
            key={c.x + c.y}
            className={`cube${c.tone ? ` cube--${c.tone}` : ''}`}
            style={{
              '--x': c.x,
              '--y': c.y,
              '--z': c.z,
              '--s': c.size,
              '--spin': c.spin,
              '--float': c.float,
              '--delay': c.delay,
            }}
          >
            <div className="cube__spin">
              {FACES.map((f) => (
                <span key={f} className={`cube__face cube__face--${f}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
