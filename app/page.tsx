'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveQuestion from '@/components/InteractiveQuestion';
import MemoryPresentation from '@/components/MemoryPresentation';
import FloatingHearts from '@/components/FloatingHearts';
import CustomCursor from '@/components/CustomCursor';
import AutoMusic from '@/components/AutoMusic';
import LoveMeter from '@/components/LoveMeter';
import ConfettiCelebration from '@/components/ConfettiCelebration';

export default function Home() {
  const [answered, setAnswered] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden custom-scroll">
      <CustomCursor />
      <FloatingHearts />

      <div className="relative z-10">
        <AutoMusic />

        <div className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50">
          <LoveMeter />
        </div>

        <AnimatePresence>
          {!answered && (
            <motion.section
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen flex items-center justify-center px-4 py-20 relative z-20"
            >
              <InteractiveQuestion
                onAnswer={(answer) => {
                  setAnswered(answer === 'yes');
                }}
              />
            </motion.section>
          )}
        </AnimatePresence>

        {answered && <ConfettiCelebration />}

        <AnimatePresence>
          {answered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MemoryPresentation />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden Easter Egg Area */}
        <div className="fixed bottom-4 right-4 opacity-0 hover:opacity-100 transition-opacity duration-1000 z-50">
          <div className="text-xs text-lilac-400 font-handwriting">
            Made with love
          </div>
        </div>
      </div>
    </main>
  );
}
