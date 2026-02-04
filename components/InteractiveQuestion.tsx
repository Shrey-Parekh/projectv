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
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-12 font-handwriting"
          style={{
            background: 'linear-gradient(135deg, #ff3366 0%, #ff6b9d 50%, #c44569 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
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
          className="text-xl md:text-2xl text-lilac-600 mb-16 font-handwriting"
        >
          (Pretty please?)
        </motion.p>

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12">
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
                className="text-4xl md:text-6xl font-bold text-rose-500 font-handwriting"
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
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-lilac-600 mt-4 font-handwriting"
              >
                Scroll down to see our memories together...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
