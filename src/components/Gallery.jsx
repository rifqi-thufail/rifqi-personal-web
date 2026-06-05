import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';

const IMAGES = [
  { src: '/gallery/DSCF0021.webp', title: 'WOW Case Cohort Finalists', desc: 'A gather-up group photo of the Top 12 national finalists and representatives of Jasa Marga and Markplus Inc.' },
  { src: '/gallery/IMG_3437.webp', title: 'JMTC Control Room Tour', desc: 'National finalists visiting the state-of-the-art Jasamarga Traffic Monitoring Center (JMTC) at Jasa Marga HQ.' },
  { src: '/gallery/IMG_8741_v4.webp', title: 'Welcome to JMTC', desc: 'Our team posing on the welcome banner at Jasa Marga Traffic Monitoring Center during the site visit.' },
  { src: '/gallery/IMG_8775_v4.webp', title: 'Team Portrait at Jasa Marga', desc: 'Ready for the final evaluation stage representing Universiti Teknologi PETRONAS & Institut Teknologi Sepuluh Nopember.' },
  { src: '/gallery/IMG_8886_v4.webp', title: 'Philip Kotler Museum of Marketing', desc: 'Visiting the renowned Philip Kotler Museum of Marketing at Markplus Inc. headquarters prior to our final pitch.' },
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
      <div style={styles.split} className="carousel-split-container">
        {/* Left Side: Caption details */}
        <div style={styles.captionCol} className="carousel-caption-side">
          {/* Eyebrow Header */}
          <div style={styles.sectionHeader}>
            <span className="label-mono" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <ImageIcon size={14} style={{ color: '#3b82f6', flexShrink: 0 }} />
              Event Showcase
            </span>
            <h4 style={styles.sectionTitle}>Travoy Jasamarga WOW Case</h4>
          </div>

          <div style={styles.counter}>
            <span style={styles.counterActive}>{String(activeIndex + 1).padStart(2, '0')}</span>
            <span style={styles.counterDivider}>/</span>
            <span style={styles.counterTotal}>{String(IMAGES.length).padStart(2, '0')}</span>
          </div>

          <div style={styles.textContainer}>
            <h3 style={styles.activeTitle}>{IMAGES[activeIndex].title}</h3>
            <p style={styles.activeDesc}>{IMAGES[activeIndex].desc}</p>
          </div>
        </div>

        {/* Right Side: 3D Stacked overlapping cards */}
        <div style={styles.stackCol} className="carousel-stack-side">
          {/* Left Arrow Button */}
          <button
            onClick={prev}
            style={{
              ...styles.carouselBtnLeft,
              opacity: activeIndex === 0 ? 0 : 1,
              pointerEvents: activeIndex === 0 ? 'none' : 'auto',
            }}
            className="carousel-nav-btn left-btn"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>

          {IMAGES.map((img, idx) => {
            const offset = idx - activeIndex;
            
            // Overlapping positions rotation & translations calculations
            let xOffset;
            let scaleVal;
            let rotateVal;
            let zIndexVal;
            let opacityVal;

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

          {/* Right Arrow Button */}
          <button
            onClick={next}
            style={{
              ...styles.carouselBtnRight,
              opacity: activeIndex === IMAGES.length - 1 ? 0 : 1,
              pointerEvents: activeIndex === IMAGES.length - 1 ? 'none' : 'auto',
            }}
            className="carousel-nav-btn right-btn"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
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
          border: 1px solid var(--border);
          background: var(--bg-secondary);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          user-select: none;
          width: 290px;
          height: 360px;
        }
        .gallery-item-card:active {
          cursor: grabbing;
        }
        .gallery-item-card:hover {
          border-color: var(--border-hover);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(59, 130, 246, 0.1) inset;
        }
        .carousel-nav-btn {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .carousel-nav-btn:hover {
          background: var(--glass-bg-hover) !important;
          border-color: var(--border-hover) !important;
          color: var(--text-primary) !important;
          transform: translateY(-50%) scale(1.08) !important;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3) !important;
        }
        .carousel-nav-btn:active {
          transform: translateY(-50%) scale(0.95) !important;
        }

        @media (max-width: 768px) {
          .gallery-item-card {
            width: 240px;
            height: 300px;
          }
          .carousel-nav-btn {
            width: 38px !important;
            height: 38px !important;
          }
          .carousel-nav-btn.left-btn {
            left: -12px !important;
          }
          .carousel-nav-btn.right-btn {
            right: -12px !important;
          }
        }

        .carousel-split-container {
          display: flex;
          gap: 40px;
          align-items: center;
          justify-content: center;
          margin-top: 0;
        }
        .carousel-caption-side {
          flex: 1;
          max-width: 450px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .carousel-stack-side {
          width: 380px;
          height: 390px;
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
            width: 300px !important;
            height: 330px !important;
            order: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    position: 'relative',
  },
  sectionHeader: {
    marginBottom: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  sectionTitle: {
    fontSize: 'var(--font-size-md)',
    fontWeight: 800,
    color: 'var(--text-primary)',
    margin: 0,
    letterSpacing: '-0.02em',
  },
  split: {},
  captionCol: {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  counter: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px',
    fontFamily: 'var(--font-mono)',
  },
  counterActive: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  counterDivider: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--text-muted)',
  },
  counterTotal: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--text-muted)',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  activeTitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: 'var(--text-primary)',
    margin: 0,
    letterSpacing: '-0.02em',
  },
  activeDesc: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--text-secondary)',
    margin: 0,
    lineHeight: 1.6,
  },
  navControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '8px',
  },
  carouselBtnLeft: {
    position: 'absolute',
    left: '-16px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 20,
    background: 'var(--bg-secondary)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid var(--border)',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    outline: 'none',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
  },
  carouselBtnRight: {
    position: 'absolute',
    right: '-16px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 20,
    background: 'var(--bg-secondary)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid var(--border)',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    outline: 'none',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
  },
  stackCol: {},
  stackCard: {
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
    border: '1px solid var(--border)',
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
    background: 'var(--glass-bg)',
    border: '1px solid var(--border)',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255, 255, 255, 0.9)',
    cursor: 'pointer',
    zIndex: 10,
    transition: 'all 0.2s ease',
  },
  navBtnLeft: {
    position: 'absolute',
    left: '24px',
    background: 'var(--glass-bg)',
    border: '1px solid var(--border)',
    borderRadius: '50%',
    width: '54px',
    height: '54px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255, 255, 255, 0.9)',
    cursor: 'pointer',
    zIndex: 10,
    transition: 'all 0.2s ease',
  },
  navBtnRight: {
    position: 'absolute',
    right: '24px',
    background: 'var(--glass-bg)',
    border: '1px solid var(--border)',
    borderRadius: '50%',
    width: '54px',
    height: '54px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255, 255, 255, 0.9)',
    cursor: 'pointer',
    zIndex: 10,
    transition: 'all 0.2s ease',
  },
  modalContent: {
    width: '100%',
    maxWidth: '900px',
    borderRadius: '16px',
    overflow: 'hidden',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border)',
    boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
    display: 'flex',
    flexDirection: 'column',
  },
  lightboxImg: {
    width: '100%',
    maxHeight: '65svh',
    objectFit: 'contain',
    background: 'var(--bg-primary)',
  },
  lightboxCaption: {
    padding: '24px',
    background: 'var(--bg-secondary)',
    borderTop: '1px solid var(--border)',
    position: 'relative',
  },
  captionTitle: {
    fontSize: 'var(--font-size-md)',
    fontWeight: 700,
    color: 'var(--text-primary)',
    margin: '0 0 6px 0',
  },
  captionDesc: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--text-secondary)',
    margin: 0,
    lineHeight: 1.5,
    maxWidth: '85%',
  },
  lightboxCounter: {
    position: 'absolute',
    right: '24px',
    top: '24px',
    fontSize: 'var(--font-size-xs)',
    color: 'var(--text-muted)',
    fontFamily: 'monospace',
  },
};
