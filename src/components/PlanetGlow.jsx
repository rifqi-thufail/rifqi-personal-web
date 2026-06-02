import React, { useState, useEffect } from 'react';

/**
 * GradientBackground — NeuroNest & Stripe-inspired background.
 * Renders:
 * 1. Background radial gradient blobs (defining general color space).
 * 2. 3D perspective grid lines that converge at the horizon.
 * 3. An animated starfield containing twinkling/drifting stars.
 * 4. A gorgeous glowing planet crescent horizon at the bottom of the screen.
 */
export default function GradientBackground() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate star coordinates & properties
    const generatedStars = Array.from({ length: 65 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 85,  // percentage (keep stars mostly above the planet crescent horizon)
      size: Math.random() * 2 + 1, // 1px to 3px
      twinkleDuration: Math.random() * 4 + 2, // 2s to 6s
      delay: Math.random() * 5, // 0s to 5s
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div style={styles.root} aria-hidden="true">
      {/* 1. Global background gradient blobs */}
      <svg
        style={styles.svg}
        viewBox="0 0 1440 900"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Orb 1 — purple, top-left */}
          <radialGradient id="orb1" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#7c3aed" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"    />
          </radialGradient>

          {/* Orb 2 — blue, top-right */}
          <radialGradient id="orb2" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"    />
          </radialGradient>

          {/* Orb 3 — violet, center-bottom */}
          <radialGradient id="orb3" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#6d28d9" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#6d28d9" stopOpacity="0"    />
          </radialGradient>

          {/* Soft blur filter for blobs */}
          <filter id="blur-orb" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="80" />
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
        <div style={styles.gridPlane} />
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
              animation: `twinkle ${star.twinkleDuration}s infinite ease-in-out ${star.delay}s, drift 35s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      {/* 4. Glowing Planet Crescent / Earth Horizon (Fixed to viewport) */}
      <div style={styles.crescentContainer}>
        <svg
          style={styles.crescentSvg}
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Massive Atmospheric Glow Filter */}
            <filter id="massive-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Standard Atmospheric Rim Glow Filter */}
            <filter id="horizon-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Glowing Atmosphere Gradient */}
            <linearGradient id="horizonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="10%" stopColor="#60a5fa" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#7c3aed" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
            </linearGradient>

            {/* Wide Corona Gradient */}
            <radialGradient id="coronaGrad" cx="50%" cy="100%" r="50%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Large background corona glow for massive spread */}
          <ellipse cx="720" cy="300" rx="900" ry="250" fill="url(#coronaGrad)" filter="url(#massive-glow)" />

          {/* Soft white-blue backing glow to spread light upwards */}
          <path
            d="M -100,300 Q 720,70 1540,300"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="32"
            opacity="0.15"
            filter="url(#massive-glow)"
          />

          {/* Mid-range cyan atmosphere glow */}
          <path
            d="M -100,300 Q 720,70 1540,300"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="14"
            opacity="0.35"
            filter="url(#horizon-glow)"
          />

          {/* Sharp white-blue core rim glow */}
          <path
            d="M -100,300 Q 720,70 1540,300"
            fill="none"
            stroke="url(#horizonGrad)"
            strokeWidth="4.5"
            filter="url(#horizon-glow)"
          />

          {/* Pure white horizon line (brightest peak) */}
          <path
            d="M -100,300 Q 720,70 1540,300"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            opacity="0.95"
          />

          {/* Solid dark body below the horizon */}
          <path
            d="M -100,300 Q 720,70 1540,300 L 1540,350 L -100,350 Z"
            fill="#0a0a0a"
          />
        </svg>
      </div>

      {/* Subtle overlay elements for vignette and dot grid */}
      <div style={styles.dotGrid} />
      <div style={styles.vignette} />

      {/* Global CSS declarations for background animations */}
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
      `}</style>
    </div>
  );
}

const styles = {
  root: {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    backgroundColor: '#0a0a0a',
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
    backgroundImage: `
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
    `,
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
    opacity: 0.5,
    boxShadow: '0 0 4px #ffffff',
  },
  crescentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '320px',
    overflow: 'hidden',
    zIndex: 4,
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
    backgroundImage: `radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)`,
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
