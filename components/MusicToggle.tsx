'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Set volume to 70% for pleasant listening
        audioRef.current.volume = 0.7;
        audioRef.current.play().catch((err) => {
          console.log('Audio play failed:', err);
          setIsPlaying(false);
        });
        setIsPlaying(true);
      }
    }
  };

  // Handle audio events for better state management
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="relative">
      {/* Hidden audio element - user needs to add their own music file */}
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        className="hidden"
      >
        <source src="/music/romantic-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <motion.button
        onClick={toggleMusic}
        className="relative w-14 h-14 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.svg
              key="pause"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-rose-500"
            >
              <rect x="6" y="4" width="4" height="16" fill="currentColor" />
              <rect x="14" y="4" width="4" height="16" fill="currentColor" />
            </motion.svg>
          ) : (
            <motion.svg
              key="play"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-rose-500"
            >
              <path
                d="M8 5v14l11-7z"
                fill="currentColor"
              />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Ripple effect when playing */}
        {isPlaying && (
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
    </div>
  );
}
