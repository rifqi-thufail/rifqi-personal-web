import { useState, useEffect } from 'react';

export default function GradientBackground({ activePage = 'home', theme = 'dark' }) {
  const [stars] = useState(() => Array.from({ length: 65 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // percentage
    y: Math.random() * 85,  // percentage
    size: Math.random() * 2 + 1, // 1px to 3px
    twinkleDuration: Math.random() * 4 + 2, // 2s to 6s
    delay: Math.random() * 5,
  })));
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate dynamic crescent values for scroll overlay effect
  const isHomePage = activePage === 'home';
  const crescentOpacity = isHomePage ? Math.max(0, 1 - scrollY / 320) : 0;
  const crescentTranslateY = scrollY * -0.15; // Rises slightly relative to scrolling
  const crescentScale = 1 + scrollY * 0.0001; // Expands slightly

  // Set star opacity based on theme
  const getStarOpacity = (size) => {
    if (theme === 'light') return (size / 3) * 0.45;
    return (size / 3) * 0.6;
  };

  return (
    <div style={{ ...styles.root, backgroundColor: 'var(--bg-primary)' }} aria-hidden="true">
      {/* 1. Global background gradient blobs - Blue themed */}
      <svg
        style={styles.svg}
        viewBox="0 0 1440 900"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Orb 1 — Blue */}
          <radialGradient id="orb1" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#3b82f6" stopOpacity={theme === 'dark' ? 0.25 : 0.12} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>

          {/* Orb 2 — Cyan */}
          <radialGradient id="orb2" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#38bdf8" stopOpacity={theme === 'dark' ? 0.2 : 0.08} />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>

          {/* Orb 3 — Deep Blue */}
          <radialGradient id="orb3" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#1d4ed8" stopOpacity={theme === 'dark' ? 0.15 : 0.06} />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
          </radialGradient>

          {/* Soft blur filter */}
          <filter id="blur-orb" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="120" />
          </filter>
        </defs>

        {/* Orb 1 — upper left */}
        <ellipse
          cx="200" cy="220"
          rx="520" ry="420"
          fill="url(#orb1)"
          filter="url(#blur-orb)"
        />

        {/* Orb 2 — upper right */}
        <ellipse
          cx="1280" cy="160"
          rx="480" ry="380"
          fill="url(#orb2)"
          filter="url(#blur-orb)"
        />

        {/* Orb 3 — center, lower */}
        <ellipse
          cx="720" cy="680"
          rx="600" ry="360"
          fill="url(#orb3)"
          filter="url(#blur-orb)"
        />
      </svg>

      {/* 2. 3D Perspective Grid */}
      <div style={styles.gridContainer}>
        <div style={{
          ...styles.gridPlane,
          backgroundImage: theme === 'dark'
            ? `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`
            : `linear-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px)`
        }} />
      </div>

      {/* 3. Starfield */}
      <div style={styles.starfield}>
        {stars.map((star) => (
          <div
            key={star.id}
            style={{
              ...styles.star,
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: theme === 'dark' ? '#ffffff' : '#3b82f6',
              boxShadow: theme === 'dark' ? '0 0 4px #ffffff' : '0 0 4px rgba(59, 130, 246, 0.4)',
              opacity: getStarOpacity(star.size),
              animation: `twinkle ${star.twinkleDuration}s infinite ease-in-out ${star.delay}s, drift 35s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      {/* 4. Glowing Planet Crescent / Earth Horizon (Overlaying on scroll) */}
      {isHomePage && (
        <div
          style={{
            ...styles.crescentContainer,
            opacity: crescentOpacity,
            transform: `translateY(${crescentTranslateY}px) scale(${crescentScale})`,
            pointerEvents: 'none',
          }}
          className="planet-crescent-container"
        >
          <svg
            style={styles.crescentSvg}
            viewBox="0 0 1440 300"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Massive Atmospheric Glow Filter */}
              <filter id="massive-glow" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur1" />
                  <feMergeNode in="blur2" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Standard Atmospheric Rim Glow Filter */}
              <filter id="horizon-glow" filterUnits="userSpaceOnUse" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur1" />
                  <feMergeNode in="blur2" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Glowing Atmosphere Gradient - Blue themed */}
              <linearGradient id="horizonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="10%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--bg-primary)" stopOpacity="0" />
              </linearGradient>

              {/* Wide Corona Gradient */}
              <radialGradient id="coronaGrad" cx="50%" cy="100%" r="50%">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.25" />
                <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.08" />
                <stop offset="100%" stopColor="var(--bg-primary)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Large background corona glow for massive spread */}
            <ellipse cx="720" cy="300" rx="900" ry="250" fill="url(#coronaGrad)" filter="url(#massive-glow)" />

            {/* Soft white-blue backing glow to spread light upwards */}
            <path
              d="M -200,300 Q 720,160 1640,300"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="32"
              opacity="0.15"
              filter="url(#massive-glow)"
            />

            {/* Mid-range cyan atmosphere glow */}
            <path
              d="M -200,300 Q 720,160 1640,300"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="14"
              opacity="0.35"
              filter="url(#horizon-glow)"
            />

            {/* Sharp white-blue core rim glow */}
            <path
              d="M -200,300 Q 720,160 1640,300"
              fill="none"
              stroke="url(#horizonGrad)"
              strokeWidth="4.5"
              filter="url(#horizon-glow)"
            />

            {/* Pure white horizon line */}
            <path
              d="M -200,300 Q 720,160 1640,300"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              opacity="0.95"
            />

            {/* Solid body matching background color for occlusion */}
            <path
              d="M -200,300 Q 720,160 1640,300 L 1640,350 L -200,350 Z"
              fill="var(--bg-primary)"
            />
          </svg>
        </div>
      )}

      {/* Subtle overlay elements for vignette and dot grid */}
      <div style={{
        ...styles.dotGrid,
        backgroundImage: theme === 'dark'
          ? `radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)`
          : `radial-gradient(rgba(15,23,42,0.06) 1px, transparent 1px)`
      }} />
      {theme === 'dark' && <div style={styles.vignette} />}

      {/* Twinkle keyframe style */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 1; }
        }
        @keyframes drift {
          0% { transform: translate(0, 0); }
          50% { transform: translate(12px, -8px); }
          100% { transform: translate(0, 0); }
        }
        @media (max-width: 768px) {
          .planet-crescent-container {
            height: 220px !important;
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  root: {
    position: 'fixed',
    inset: 0,
    zIndex: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  svg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  gridContainer: {
    position: 'absolute',
    inset: 0,
    perspective: '450px',
    overflow: 'hidden',
    zIndex: 2,
  },
  gridPlane: {
    position: 'absolute',
    width: '300%',
    height: '200%',
    top: '-50%',
    left: '-100%',
    backgroundSize: '45px 45px',
    transform: 'rotateX(72deg)',
    transformOrigin: 'center bottom',
    maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 80%)',
    WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 80%)',
    opacity: 0.8,
  },
  starfield: {
    position: 'absolute',
    inset: 0,
    zIndex: 3,
  },
  star: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    boxShadow: '0 0 4px #ffffff',
  },
  crescentContainer: {
    position: 'absolute', // Positioned absolutely relative to the page root
    bottom: 0,             // Anchored to the bottom of the viewport
    left: 0,
    width: '100%',
    height: '100svh',      // Exactly the height of the first viewport (hero section)!
    overflow: 'hidden',
    zIndex: 15,            // Higher than hero text to overlay it
    transition: 'opacity 0.1s linear, transform 0.1s linear',
  },
  crescentSvg: {
    position: 'absolute',
    bottom: '-5px',
    left: 0,
    width: '100%',
    height: '100%',
  },
  dotGrid: {
    position: 'absolute',
    inset: 0,
    backgroundSize: '32px 32px',
    maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
    WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
    opacity: 0.35,
    zIndex: 5,
  },
  vignette: {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(ellipse 100% 50% at 50% 0%, transparent 40%, rgba(10,10,10,0.75) 100%),
      radial-gradient(ellipse 70% 40% at 0% 50%, rgba(10,10,10,0.5) 0%, transparent 80%),
      radial-gradient(ellipse 70% 40% at 100% 50%, rgba(10,10,10,0.5) 0%, transparent 80%)
    `,
    zIndex: 6,
  },
};
