'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  mouseRef.current = mousePosition;

  // Smooth lagging trail that follows the cursor (single loop, reads latest position from ref)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let raf = 0;
    const lerp = 0.12;
    const update = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      setTrail((prev) => ({
        x: prev.x + (mx - prev.x) * lerp,
        y: prev.y + (my - prev.y) * lerp,
      }));
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Only show cursor on client and when not a touch device
  useEffect(() => {
    const isTouch = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);
    setShowCursor(!isTouch);
  }, []);

  if (!showCursor) return null;

  const size = 28;
  const heartPath = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';

  return (
    <>
      {/* Trailing sparkle dot */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{ left: trail?.x ?? 0, top: trail?.y ?? 0 }}
        animate={{
          x: -6,
          y: -6,
          opacity: isVisible ? 0.9 : 0,
          scale: [1, 1.2, 1],
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div
          className="w-3 h-3 rounded-full border-2 border-rose-300 bg-pink-200"
          style={{ boxShadow: '0 0 12px rgba(251, 113, 133, 0.6)' }}
        />
      </motion.div>

      {/* Main heart cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          x: -size / 2,
          y: -size / 2,
          opacity: isVisible ? 1 : 0,
          rotate: [0, -5, 5, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          rotate: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className="drop-shadow-lg"
        >
          <defs>
            <filter id="heart-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="heart-fill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="50%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#e879f9" />
            </linearGradient>
          </defs>
          <path
            d={heartPath}
            fill="url(#heart-fill)"
            filter="url(#heart-glow)"
            stroke="white"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </>
  );
}
