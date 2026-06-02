import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';

const IMAGES = [
  { src: '/gallery/DSCF0021.webp', title: 'WOW Case Cohort Finalists', desc: 'A gather-up group photo of the Top 12 national finalists and representatives of Jasa Marga and Markplus Inc.' },
  { src: '/gallery/IMG_3437.webp', title: 'JMTC Control Room Tour', desc: 'National finalists visiting the state-of-the-art Jasamarga Traffic Monitoring Center (JMTC) at Jasa Marga HQ.' },
  { src: '/gallery/IMG_8741.webp', title: 'Welcome to JMTC', desc: 'Our team posing on the welcome banner at Jasa Marga Traffic Monitoring Center during the site visit.' },
  { src: '/gallery/IMG_8775.webp', title: 'Team Portrait at Jasa Marga', desc: 'Ready for the final evaluation stage representing Universiti Teknologi PETRONAS & Institut Teknologi Sepuluh Nopember.' },
  { src: '/gallery/IMG_8886.webp', title: 'Philip Kotler Museum of Marketing', desc: 'Visiting the renowned Philip Kotler Museum of Marketing at Markplus Inc. headquarters prior to our final pitch.' },
  { src: '/gallery/IRN00501.webp', title: 'National Final Stage Pitch', desc: 'Pitching our R.O.U.T.E. marketing growth strategy to the panel of executive judges from Jasa Marga and Markplus Inc.' },
  { src: '/gallery/IRN00502.webp', title: 'Travoy App Growth Presentation', desc: 'Detailing our customer acquisition roadmap and Innovation Adoption Theory models on the main stage.' },
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIdx, setActiveIdx] = useState(null); // for lightbox
  const [isMobile, setIsMobile] = useState(false);

  // Monitor responsive state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const next = () => {
    if (activeIndex < IMAGES.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const prev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeIdx === null) return;
      if (e.key === 'ArrowRight') {
        setActiveIdx((prevIdx) => (prevIdx + 1) % IMAGES.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveIdx((prevIdx) => (prevIdx - 1 + IMAGES.length) % IMAGES.length);
      } else if (e.key === 'Escape') {
        setActiveIdx(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx]);

  // Drag handler for active card
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 60; // drag distance in pixels
    if (info.offset.x < -swipeThreshold && activeIndex < IMAGES.length - 1) {
      next();
    } else if (info.offset.x > swipeThreshold && activeIndex > 0) {
      prev();
    }
  };

  return (
    <div style={styles.container}>
      {/* Eyebrow Header */}
      <div style={styles.sectionHeader}>
        <div style={styles.titleRow}>
          <ImageIcon size={18} style={{ color: 'rgba(167,139,250,0.8)' }} />
          <h4 style={styles.sectionTitle}>Event Showcase: Travoy Jasamarga WOW Case</h4>
        </div>
      </div>

      <div style={styles.split} className="carousel-split-container">
        {/* Left Side: Caption details */}
        <div style={styles.captionCol} className="carousel-caption-side">
          <div style={styles.counter}>
            <span style={styles.counterActive}>{String(activeIndex + 1).padStart(2, '0')}</span>
            <span style={styles.counterDivider}>/</span>
            <span style={styles.counterTotal}>{String(IMAGES.length).padStart(2, '0')}</span>
          </div>

          <div style={styles.textContainer}>
            <h3 style={styles.activeTitle}>{IMAGES[activeIndex].title}</h3>
            <p style={styles.activeDesc}>{IMAGES[activeIndex].desc}</p>
          </div>

          {/* Navigation Controls */}
          <div style={styles.navControls}>
            <button
              onClick={prev}
              disabled={activeIndex === 0}
              style={{ ...styles.carouselBtn, opacity: activeIndex === 0 ? 0.35 : 1 }}
              className="carousel-nav-btn"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              disabled={activeIndex === IMAGES.length - 1}
              style={{ ...styles.carouselBtn, opacity: activeIndex === IMAGES.length - 1 ? 0.35 : 1 }}
              className="carousel-nav-btn"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Right Side: 3D Stacked overlapping cards */}
        <div style={styles.stackCol} className="carousel-stack-side">
          {IMAGES.map((img, idx) => {
            const offset = idx - activeIndex;
            const isVisible = Math.abs(offset) <= 2; // Keep neighboring cards mounted for transition smooth rendering
            
            // Overlapping positions rotation & translations calculations
            let xOffset = 0;
            let scaleVal = 1;
            let rotateVal = 0;
            let zIndexVal = 10;
            let opacityVal = 1;

            if (offset === 0) {
              xOffset = 0;
              scaleVal = 1;
              rotateVal = 0;
              zIndexVal = 10;
              opacityVal = 1;
            } else if (offset === 1) {
              xOffset = isMobile ? 30 : 45;
              scaleVal = 0.92;
              rotateVal = 6;
              zIndexVal = 9;
              opacityVal = 0.75;
            } else if (offset === -1) {
              xOffset = isMobile ? -30 : -45;
              scaleVal = 0.92;
              rotateVal = -6;
              zIndexVal = 8;
              opacityVal = 0.75;
            } else {
              // Invisible cards positioned offstage
              xOffset = offset > 0 ? 120 : -120;
              scaleVal = 0.85;
              rotateVal = offset > 0 ? 12 : -12;
              zIndexVal = 7;
              opacityVal = 0;
            }

            return (
              <motion.div
                key={img.src}
                className="gallery-item-card"
                drag={offset === 0 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={handleDragEnd}
                animate={{
                  x: xOffset,
                  scale: scaleVal,
                  rotate: rotateVal,
                  zIndex: zIndexVal,
                  opacity: opacityVal,
                }}
                transition={{
                  type: 'spring',
                  damping: 26,
                  stiffness: 220,
                }}
                style={{
                  ...styles.stackCard,
                  pointerEvents: offset === 0 ? 'auto' : 'none',
                }}
                onClick={() => offset === 0 && setActiveIdx(idx)}
              >
                <img src={img.src} alt={img.title} style={styles.cardImg} />
                {offset === 0 && (
                  <div style={styles.cardLabelGlow}>
                    <span>Click to Zoom</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIdx(null)}
            style={styles.lightboxOverlay}
          >
            {/* Close Button */}
            <button onClick={() => setActiveIdx(null)} style={styles.closeBtn} aria-label="Close lightbox">
              <X size={24} />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => { e.stopPropagation(); setActiveIdx((prevIdx) => (prevIdx - 1 + IMAGES.length) % IMAGES.length); }}
              style={styles.navBtnLeft}
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
              style={styles.modalContent}
            >
              <img src={IMAGES[activeIdx].src} alt={IMAGES[activeIdx].title} style={styles.lightboxImg} />
              <div style={styles.lightboxCaption}>
                <h5 style={styles.captionTitle}>{IMAGES[activeIdx].title}</h5>
                <p style={styles.captionDesc}>{IMAGES[activeIdx].desc}</p>
                <div style={styles.lightboxCounter}>
                  {activeIdx + 1} / {IMAGES.length}
                </div>
              </div>
            </motion.div>

            {/* Next Button */}
            <button
              onClick={(e) => { e.stopPropagation(); setActiveIdx((prevIdx) => (prevIdx + 1) % IMAGES.length); }}
              style={styles.navBtnRight}
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .gallery-item-card {
          position: absolute;
          cursor: grab;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: #111111;
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.7);
          overflow: hidden;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          user-select: none;
        }
        .gallery-item-card:active {
          cursor: grabbing;
        }
        .gallery-item-card:hover {
          border-color: rgba(255, 255, 255, 0.18);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(124, 58, 237, 0.1) inset;
        }
        .carousel-nav-btn {
          transition: all 0.2s ease;
        }
        .carousel-nav-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(255, 255, 255, 0.18) !important;
          color: #ffffff !important;
        }

        .carousel-split-container {
          display: flex;
          gap: 48px;
          align-items: center;
          justify-content: space-between;
          margin-top: 32px;
        }
        .carousel-caption-side {
          flex: 1;
          max-width: 450px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .carousel-stack-side {
          width: 410px;
          height: 440px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        @media (max-width: 768px) {
          .carousel-split-container {
            flex-direction: column !important;
            gap: 40px !important;
            align-items: center !important;
          }
          .carousel-caption-side {
            max-width: 100% !important;
            align-items: center !important;
            text-align: center !important;
            order: 2 !important;
            gap: 16px !important;
          }
          .carousel-stack-side {
            width: 320px !important;
            height: 380px !important;
            order: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    marginTop: '48px',
    width: '100%',
    position: 'relative',
  },
  sectionHeader: {
    marginBottom: '8px',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  sectionTitle: {
    fontSize: 'var(--font-size-md)',
    fontWeight: 700,
    color: '#ffffff',
    margin: 0,
  },
  split: {},
  captionCol: {},
  counter: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px',
    fontFamily: 'var(--font-mono)',
  },
  counterActive: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: '#ffffff',
  },
  counterDivider: {
    fontSize: 'var(--font-size-sm)',
    color: 'rgba(255, 255, 255, 0.25)',
  },
  counterTotal: {
    fontSize: 'var(--font-size-sm)',
    color: 'rgba(255, 255, 255, 0.4)',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  activeTitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: '#ffffff',
    margin: 0,
    letterSpacing: '-0.02em',
  },
  activeDesc: {
    fontSize: 'var(--font-size-sm)',
    color: 'rgba(255, 255, 255, 0.5)',
    margin: 0,
    lineHeight: 1.6,
  },
  navControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '8px',
  },
  carouselBtn: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255, 255, 255, 0.65)',
    cursor: 'pointer',
    outline: 'none',
  },
  stackCol: {},
  stackCard: {
    width: '80%',
    height: '90%',
    borderRadius: '20px',
    overflow: 'hidden',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    pointerEvents: 'none',
  },
  cardLabelGlow: {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '100px',
    padding: '6px 14px',
    fontSize: '0.7rem',
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.85)',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    pointerEvents: 'none',
  },
  lightboxOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(5, 5, 5, 0.92)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    zIndex: 99999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  closeBtn: {
    position: 'absolute',
    top: '24px',
    right: '24px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    cursor: 'pointer',
    zIndex: 10,
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.15)',
    },
  },
  navBtnLeft: {
    position: 'absolute',
    left: '24px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    width: '54px',
    height: '54px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    cursor: 'pointer',
    zIndex: 10,
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.15)',
    },
  },
  navBtnRight: {
    position: 'absolute',
    right: '24px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    width: '54px',
    height: '54px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    cursor: 'pointer',
    zIndex: 10,
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.15)',
    },
  },
  modalContent: {
    width: '100%',
    maxWidth: '900px',
    borderRadius: '16px',
    overflow: 'hidden',
    background: '#0c0c0c',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
    display: 'flex',
    flexDirection: 'column',
  },
  lightboxImg: {
    width: '100%',
    maxHeight: '65svh',
    objectFit: 'contain',
    background: '#070707',
  },
  lightboxCaption: {
    padding: '24px',
    background: '#0e0e0e',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    position: 'relative',
  },
  captionTitle: {
    fontSize: 'var(--font-size-md)',
    fontWeight: 700,
    color: '#ffffff',
    margin: '0 0 6px 0',
  },
  captionDesc: {
    fontSize: 'var(--font-size-sm)',
    color: 'rgba(255, 255, 255, 0.5)',
    margin: 0,
    lineHeight: 1.5,
    maxWidth: '85%',
  },
  lightboxCounter: {
    position: 'absolute',
    right: '24px',
    top: '24px',
    fontSize: 'var(--font-size-xs)',
    color: 'rgba(255, 255, 255, 0.3)',
    fontFamily: 'monospace',
  },
};
