'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const generateImagePaths = () => {
  const images: string[] = [];
  for (let i = 1; i <= 122; i++) {
    if (i === 1) {
      images.push(`/Images/image ${i}.png`);
    } else {
      images.push(`/Images/image ${i}.jpg`);
    }
  }
  return images;
};

const imagePaths = generateImagePaths();

const MESSAGES = [
  'Every moment with you is my favourite.',
  'You make my heart skip a beat.',
  'Forever isn’t long enough with you.',
  'My favourite place is next to you.',
  'You’re the best thing that ever happened to me.',
  'I fall for you more every day.',
  'Thank you for being you.',
  'You’re my sunshine.',
  'I love our story.',
  'Together is my favourite place to be.',
  'You’re the one I was waiting for.',
  'My heart belongs to you.',
  'Lucky to have you.',
  'You make ordinary moments magical.',
  'I’ll choose you every time.',
  'You’re my favourite hello.',
  'Here’s to many more memories.',
  'You’re simply the best.',
  'I love us.',
  'You’re my happy place.',
  'Every photo is a little "I love you".',
  'You make life beautiful.',
  'My favourite adventure is you.',
  'I’ll never get enough of you.',
  'You’re my dream come true.',
  'Thank you for every smile.',
  'You’re the love of my life.',
  'I’m so grateful for you.',
  'You’re my person.',
  'I love you more than words.',
  'You’re my favourite view.',
  'Here’s to us.',
  'You light up my world.',
  'My heart is full because of you.',
  'You’re my always.',
  'I love doing life with you.',
  'You’re the best part of my day.',
  'Forever and always, you.',
  'You’re my favourite memory.',
  'I love you to the moon and back.',
];

export default function MemoryPresentation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = imagePaths.length;
  const src = imagePaths[currentIndex];
  const message = MESSAGES[currentIndex % MESSAGES.length];

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(goNext, 5000);
    return () => clearInterval(t);
  }, [isPaused, goNext]);

  if (total === 0) return null;

  return (
    <div
      className="fixed inset-0 z-30 flex flex-col items-center justify-center px-4 py-8 sm:py-10 overflow-y-auto pointer-events-auto"
      style={{
        background: 'radial-gradient(ellipse 80% 70% at 50% 40%, rgba(255, 228, 235, 0.98) 0%, rgba(255, 240, 245, 0.95) 40%, rgba(253, 242, 248, 0.98) 100%)',
        boxShadow: 'inset 0 0 120px rgba(255, 182, 211, 0.15)',
      }}
    >
      {/* Floating decorative hearts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute top-[12%] left-[8%] text-3xl opacity-20 animate-pulse" style={{ animationDuration: '3s' }}>♥</span>
        <span className="absolute top-[18%] right-[12%] text-2xl opacity-15" style={{ animationDelay: '0.5s' }}>♥</span>
        <span className="absolute bottom-[35%] left-[5%] text-xl opacity-20">♥</span>
        <span className="absolute bottom-[28%] right-[8%] text-2xl opacity-15">♥</span>
      </div>

      {/* Memory counter - badge style */}
      <motion.div
        className="font-handwriting text-rose-500 text-sm sm:text-base mb-3 sm:mb-4 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-rose-200/80 shadow-sm"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Memory {currentIndex + 1} of {total}
      </motion.div>

      {/* Big polaroid-style frame */}
      <motion.div
        className="relative w-full max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div
          className="relative rounded-lg overflow-hidden bg-white p-2.5 sm:p-3 md:p-4"
          style={{
            boxShadow: '0 4px 6px rgba(0,0,0,0.07), 0 25px 50px -12px rgba(255, 51, 102, 0.35), 0 0 0 1px rgba(255, 182, 211, 0.4)',
            transform: 'rotate(-0.5deg)',
          }}
        >
          {/* Image area - much bigger */}
          <div className="relative w-full aspect-[4/3] max-h-[42vh] sm:max-h-[48vh] rounded-md overflow-hidden bg-gradient-to-br from-rose-100 to-lilac-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <Image
                  src={src}
                  alt={`Memory ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  loading="eager"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    const base = img.src.replace(/\.(jpg|jpeg|png)$/i, '');
                    const ext = (img.src.match(/\.(jpg|jpeg|png)$/i) || [])[1]?.toLowerCase();
                    if (ext === '.jpg' || ext === '.jpeg') img.src = `${base}.png`;
                    else if (ext === '.png') img.src = `${base}.jpg`;
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Corner accents */}
            <div className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-rose-400/90 text-xl" aria-hidden>♥</div>
            <div className="absolute bottom-2 left-2 w-8 h-8 flex items-center justify-center text-rose-400/90 text-xl" aria-hidden>♥</div>
          </div>

          {/* Polaroid caption strip */}
          <div className="pt-3 sm:pt-4 pb-1 text-center">
            <span className="font-handwriting text-rose-400 text-base sm:text-lg">
              Memory #{currentIndex + 1}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Big, creative message card */}
      <motion.div
        key={`msg-${currentIndex}`}
        className="w-full max-w-xl mx-auto mt-6 sm:mt-8 px-4 sm:px-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
      >
        <div
          className="relative py-6 sm:py-8 px-6 sm:px-10 rounded-2xl border-2 border-rose-200/60 bg-white/80 backdrop-blur-sm"
          style={{
            boxShadow: '0 8px 32px rgba(255, 51, 102, 0.12), 0 0 0 1px rgba(255, 182, 211, 0.3)',
          }}
        >
          <p className="font-handwriting text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl text-rose-700 leading-snug">
            &ldquo;{message}&rdquo;
          </p>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-rose-300/70 text-3xl" aria-hidden>♥</div>
        </div>
      </motion.div>

      {/* Bigger controls */}
      <div className="flex items-center gap-8 sm:gap-10 mt-10 sm:mt-12">
        <button
          type="button"
          onClick={goPrev}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-lg border-2 border-rose-200 flex items-center justify-center text-rose-500 hover:bg-rose-50 hover:scale-110 hover:border-rose-300 active:scale-95 transition-all duration-200"
          aria-label="Previous memory"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => setIsPaused((p) => !p)}
          className="font-handwriting text-base sm:text-lg text-rose-500 hover:text-rose-600 min-w-[80px]"
          aria-label={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
        >
          {isPaused ? '▶ Play' : '⏸ Pause'}
        </button>

        <button
          type="button"
          onClick={goNext}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-lg border-2 border-rose-200 flex items-center justify-center text-rose-500 hover:bg-rose-50 hover:scale-110 hover:border-rose-300 active:scale-95 transition-all duration-200"
          aria-label="Next memory"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Progress dots - slightly bigger */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-xl mt-8 px-4">
        {Array.from({ length: 20 }).map((_, i) => {
          const slideForDot = total <= 1 ? 0 : Math.round((i / 19) * (total - 1));
          const active = total <= 1 ? i === 0 : Math.round((currentIndex / (total - 1)) * 19) === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(slideForDot)}
              className={`rounded-full transition-all duration-200 ${
                active ? 'bg-rose-500 scale-125 w-3 h-3 sm:w-3.5 sm:h-3.5' : 'bg-rose-200 hover:bg-rose-300 w-2.5 h-2.5 sm:w-3 sm:h-3'
              }`}
              aria-label={`Go to memory ${slideForDot + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
