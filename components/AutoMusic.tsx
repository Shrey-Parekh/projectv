'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AutoMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasStartedRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);

  // Start music on first user interaction (to bypass browser autoplay restrictions)
  useEffect(() => {
    const startMusic = () => {
      if (audioRef.current && !hasStartedRef.current) {
        audioRef.current.volume = 0.7;
        audioRef.current.play().catch((err) => {
          // Silently fail - browser may block autoplay
          console.log('Music autoplay blocked:', err);
        });
        hasStartedRef.current = true;
      }
    };

    // Try to start on any user interaction
    const events = ['click', 'touchstart', 'keydown', 'mousemove'];
    
    events.forEach((event) => {
      document.addEventListener(event, startMusic, { once: true });
    });

    // Also try to start immediately (may work in some browsers)
    const timer = setTimeout(() => {
      if (audioRef.current && !hasStartedRef.current) {
        audioRef.current.volume = 0.7;
        audioRef.current.play().catch(() => {
          // Will be triggered by user interaction instead
        });
        hasStartedRef.current = true;
      }
    }, 500);

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, startMusic);
      });
      clearTimeout(timer);
    };
  }, []);

  // Handle mute/unmute
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0.7;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        className="hidden"
        autoPlay
      >
        <source src="/music/romantic-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Mute Button - Responsive */}
      <motion.button
        onClick={toggleMute}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors border-2 border-rose-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {isMuted ? (
            <motion.svg
              key="muted"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              width="20"
              height="20"
              className="text-rose-500 sm:w-6 sm:h-6"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
                fill="currentColor"
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="unmuted"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              width="20"
              height="20"
              className="text-rose-500 sm:w-6 sm:h-6"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
                fill="currentColor"
              />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Ripple effect when not muted */}
        {!isMuted && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-rose-400"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </motion.button>
    </>
  );
}
