'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [screenHeight, setScreenHeight] = useState(1000);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set initial screen height and detect mobile
    const updateScreen = () => {
      const mobile = window.innerWidth < 768;
      setScreenHeight(window.innerHeight);
      setIsMobile(mobile);
      return mobile;
    };
    
    const mobile = updateScreen();

    // Create initial hearts (fewer on mobile for performance)
    const heartCount = mobile ? 8 : 15;
    const initialHearts: Heart[] = Array.from({ length: heartCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: mobile ? Math.random() * 15 + 10 : Math.random() * 20 + 15,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));

    setHearts(initialHearts);

    // Handle window resize
    const handleResize = () => {
      updateScreen();
    };
    window.addEventListener('resize', handleResize);

    // Add new hearts periodically (less frequent on mobile)
    const interval = setInterval(() => {
      setHearts((prev) => {
        const currentMobile = window.innerWidth < 768;
        const newHeart: Heart = {
          id: Date.now(),
          x: Math.random() * 100,
          y: 100,
          size: currentMobile ? Math.random() * 15 + 10 : Math.random() * 20 + 15,
          duration: Math.random() * 10 + 15,
          delay: 0,
        };
        const maxHearts = currentMobile ? 7 : 14;
        return [...prev.slice(-maxHearts), newHeart];
      });
    }, mobile ? 4000 : 3000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-rose-400 opacity-60"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            fontSize: `${heart.size}px`,
          }}
          animate={{
            y: -screenHeight - 100,
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, 15, -15, 0],
            opacity: [0.6, 0.8, 0.4, 0],
            scale: [1, 1.2, 0.8],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-lg"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
