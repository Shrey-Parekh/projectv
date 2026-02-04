'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import YesButton from './YesButton';
import NoButton from './NoButton';

interface InteractiveQuestionProps {
  onAnswer: (answer: 'yes' | 'no') => void;
}

const messages = [
  'Are you sure?',
  'Really?',
  'Think again!',
  'Come on...',
  'Please?',
  "I'll be sad",
  'Pretty please?',
  'Last chance!',
  "You're breaking my heart",
  'Fine, I give up...',
];

export default function InteractiveQuestion({ onAnswer }: InteractiveQuestionProps) {
  const [noAttempts, setNoAttempts] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleYes = () => {
    setShowCelebration(true);
    onAnswer('yes');
  };

  const handleNo = () => {
    setNoAttempts((prev) => prev + 1);
    onAnswer('no');
  };

  const getNoButtonText = () => {
    if (noAttempts === 0) return 'No';
    if (noAttempts <= messages.length) return messages[noAttempts - 1];
    return messages[messages.length - 1];
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center"
      >
        {/* Main Question */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 sm:mb-10 md:mb-12 px-4 font-handwriting leading-tight"
          style={{
            background: 'linear-gradient(135deg, #ff3366 0%, #ff6b9d 50%, #c44569 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          animate={{
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          Will you be my Valentine?
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl text-lilac-600 mb-12 sm:mb-14 md:mb-16 px-4 font-handwriting"
        >
          (Pretty please?)
        </motion.p>

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12 px-4">
          <YesButton onClick={handleYes} />
          
          <div className="relative">
            <NoButton
              onClick={handleNo}
              attempts={noAttempts}
              text={getNoButtonText()}
            />
          </div>
        </div>

        {/* Celebration Message */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mt-16"
            >
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-rose-500 font-handwriting px-4"
                animate={{
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Yay! You made me the happiest!
              </motion.h2>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
