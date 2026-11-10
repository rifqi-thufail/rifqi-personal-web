import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Image as ImageIcon, X } from 'lucide-react';

const IMAGES = [
  { src: '/gallery/DSCF0021.webp', title: 'WOW Case Cohort Finalists', desc: 'A gather-up group photo of the Top 12 national finalists and representatives of Jasa Marga and Markplus Inc.' },
  { src: '/gallery/IMG_3437.webp', title: 'JMTC Control Room Tour', desc: 'National finalists visiting the state-of-the-art Jasamarga Traffic Monitoring Center (JMTC) at Jasa Marga HQ.' },
  { src: '/gallery/IMG_8741_v4.webp', title: 'Welcome to JMTC', desc: 'Our team posing on the welcome banner at Jasa Marga Traffic Monitoring Center during the site visit.' },
  { src: '/gallery/IMG_8775_v4.webp', title: 'Team Portrait at Jasa Marga', desc: 'Ready for the final evaluation stage representing Universiti Teknologi PETRONAS & Institut Teknologi Sepuluh Nopember.' },
  { src: '/gallery/IMG_8886_v4.webp', title: 'Philip Kotler Museum of Marketing', desc: 'Visiting the renowned Philip Kotler Museum of Marketing at Markplus Inc. headquarters prior to our final pitch.' },
  { src: '/gallery/IRN00501.webp', title: 'National Final Stage Pitch', desc: 'Pitching our R.O.U.T.E. marketing growth strategy to the panel of executive judges from Jasa Marga and Markplus Inc.' },
  { src: '/gallery/IRN00502.webp', title: 'Travoy App Growth Presentation', desc: 'Detailing our customer acquisition roadmap and Innovation Adoption Theory models on the main stage.' },
];

const LAST = IMAGES.length - 1;
const SWIPE_THRESHOLD = 60; // px
const NARROW_QUERY = '(max-width: 820px)';

const pad = (n) => String(n).padStart(2, '0');

// Position of a card in the fanned stack, relative to the active one.
function cardPose(offset, narrow) {
  if (offset === 0) return { x: 0, scale: 1, rotate: 0, zIndex: 10, opacity: 1 };
  if (Math.abs(offset) === 1) {
    const dir = Math.sign(offset);
    return { x: dir * (narrow ? 30 : 45), scale: 0.92, rotate: dir * 6, zIndex: dir > 0 ? 9 : 8, opacity: 0.75 };
  }
  const dir = Math.sign(offset);
  return { x: dir * 120, scale: 0.85, rotate: dir * 12, zIndex: 7, opacity: 0 };
}

function Lightbox({ index, onClose, onStep }) {
  const closeRef = useRef(null);
  const image = IMAGES[index];

  // Focus the close button on open; lock scroll; restore both on close.
  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
      if (previous instanceof HTMLElement) previous.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight') onStep(1);
      else if (e.key === 'ArrowLeft') onStep(-1);
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, onStep]);

  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${image.title} — image ${index + 1} of ${IMAGES.length}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <button ref={closeRef} type="button" className="lightbox__btn lightbox__btn--close" onClick={onClose} aria-label="Close lightbox">
        <X size={22} aria-hidden="true" />
      </button>

      <button
        type="button"
        className="lightbox__btn lightbox__btn--prev"
        onClick={(e) => {
          e.stopPropagation();
          onStep(-1);
        }}
        aria-label="Previous image"
      >
        <ChevronLeft size={24} aria-hidden="true" />
      </button>

      <motion.div
        className="lightbox__panel"
        initial={{ scale: 0.97, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.97, y: 12 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={image.src} alt={image.title} />
        <div className="lightbox__caption">
          <h2>{image.title}</h2>
          <p>{image.desc}</p>
          <span className="lightbox__count">
            {index + 1} / {IMAGES.length}
          </span>
        </div>
      </motion.div>

      <button
        type="button"
        className="lightbox__btn lightbox__btn--next"
        onClick={(e) => {
          e.stopPropagation();
          onStep(1);
        }}
        aria-label="Next image"
      >
        <ChevronRight size={24} aria-hidden="true" />
      </button>
    </motion.div>
  );
}

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [narrow, setNarrow] = useState(() => window.matchMedia(NARROW_QUERY).matches);
  const dragged = useRef(false);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const stepLightbox = useCallback((delta) => {
    setLightboxIndex((i) => (i === null ? i : (i + delta + IMAGES.length) % IMAGES.length));
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(NARROW_QUERY);
    const onChange = (e) => setNarrow(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const prev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const next = () => setActiveIndex((i) => Math.min(LAST, i + 1));

  const onDragEnd = (_event, info) => {
    if (info.offset.x < -SWIPE_THRESHOLD) next();
    else if (info.offset.x > SWIPE_THRESHOLD) prev();
  };

  const active = IMAGES[activeIndex];

  return (
    <div className="gallery">
      <div className="gallery__caption">
        <div>
          <p className="mono-label gallery__label">
            <ImageIcon size={14} aria-hidden="true" />
            Event Showcase
          </p>
          <h2 className="gallery__event">Travoy Jasamarga WOW Case</h2>
        </div>

        <p className="gallery__counter" aria-label={`Image ${activeIndex + 1} of ${IMAGES.length}`}>
          <b>{pad(activeIndex + 1)}</b>
          <span>/</span>
          <span>{pad(IMAGES.length)}</span>
        </p>

        <div aria-live="polite">
          <h3 className="gallery__title">{active.title}</h3>
          <p className="gallery__desc">{active.desc}</p>
        </div>
      </div>

      <div className="gallery__stage">
        <button
          type="button"
          className="gallery__nav gallery__nav--prev"
          onClick={prev}
          disabled={activeIndex === 0}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>

        {IMAGES.map((img, idx) => {
          const isActive = idx === activeIndex;
          const open = () => setLightboxIndex(idx);
          return (
            <motion.div
              key={img.src}
              className="gallery__card"
              role={isActive ? 'button' : undefined}
              tabIndex={isActive ? 0 : undefined}
              aria-hidden={isActive ? undefined : true}
              aria-label={isActive ? `Zoom image: ${img.title}` : undefined}
              drag={isActive ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragStart={() => {
                dragged.current = true;
              }}
              onDragEnd={onDragEnd}
              initial={false}
              animate={cardPose(idx - activeIndex, narrow)}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              style={{ pointerEvents: isActive ? 'auto' : 'none' }}
              onClick={() => {
                // A drag also ends in a click; only a real click should zoom.
                if (dragged.current) {
                  dragged.current = false;
                  return;
                }
                if (isActive) open();
              }}
              onKeyDown={(e) => {
                if (isActive && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  open();
                }
              }}
            >
              <img src={img.src} alt={img.title} draggable={false} />
              {isActive && <span className="gallery__hint">Click to Zoom</span>}
            </motion.div>
          );
        })}

        <button
          type="button"
          className="gallery__nav gallery__nav--next"
          onClick={next}
          disabled={activeIndex === LAST}
          aria-label="Next slide"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      {createPortal(
        <AnimatePresence>
          {lightboxIndex !== null && (
            <Lightbox
              key="lightbox"
              index={lightboxIndex}
              onClose={closeLightbox}
              onStep={stepLightbox}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}
