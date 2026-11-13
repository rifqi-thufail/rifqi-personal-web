// Pointer-driven polish, delegated from the document so pages need no wiring:
//  - `.card`            → --mx / --my (px) for the spotlight border and glow
//  - `.tilt`            → --rx / --ry (-1..1) for the perspective tilt (cards, bento tiles)
//  - `[data-parallax]`  → --px / --py (-1..1) for backdrop depth layers
// Disabled on touch / coarse pointers and under prefers-reduced-motion.
export function initPointerFx() {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let frame = 0;
  let last = null;
  let activeCard = null;

  const releaseCard = () => {
    if (!activeCard) return;
    activeCard.style.removeProperty('--rx');
    activeCard.style.removeProperty('--ry');
    activeCard = null;
  };

  const apply = () => {
    frame = 0;
    if (!last) return;
    const { x, y, target } = last;

    const card = target instanceof Element ? target.closest('.card, .tile') : null;
    if (card !== activeCard) releaseCard();
    if (card) {
      activeCard = card;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${(x - rect.left).toFixed(1)}px`);
      card.style.setProperty('--my', `${(y - rect.top).toFixed(1)}px`);
      if (card.classList.contains('tilt')) {
        card.style.setProperty('--rx', (((x - rect.left) / rect.width) * 2 - 1).toFixed(3));
        card.style.setProperty('--ry', (((y - rect.top) / rect.height) * 2 - 1).toFixed(3));
      }
    }

    const backdrop = document.querySelector('[data-parallax]');
    if (backdrop && backdrop.getBoundingClientRect().bottom > 0) {
      backdrop.style.setProperty('--px', ((x / window.innerWidth) * 2 - 1).toFixed(3));
      backdrop.style.setProperty('--py', ((y / window.innerHeight) * 2 - 1).toFixed(3));
    }
  };

  const onPointerMove = (e) => {
    if (!finePointer.matches || reduceMotion.matches) return;
    last = { x: e.clientX, y: e.clientY, target: e.target };
    if (!frame) frame = requestAnimationFrame(apply);
  };

  const onPointerLeave = () => {
    last = null;
    releaseCard();
  };

  document.addEventListener('pointermove', onPointerMove, { passive: true });
  document.documentElement.addEventListener('pointerleave', onPointerLeave);

  return () => {
    cancelAnimationFrame(frame);
    releaseCard();
    document.removeEventListener('pointermove', onPointerMove);
    document.documentElement.removeEventListener('pointerleave', onPointerLeave);
  };
}
