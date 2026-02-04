'use client';

import { useState } from 'react';
import InteractiveQuestion from '@/components/InteractiveQuestion';
import OrganicMemories from '@/components/OrganicMemories';
import FloatingHearts from '@/components/FloatingHearts';
import CustomCursor from '@/components/CustomCursor';
import AutoMusic from '@/components/AutoMusic';
import LoveMeter from '@/components/LoveMeter';
import ConfettiCelebration from '@/components/ConfettiCelebration';

export default function Home() {
  const [answered, setAnswered] = useState(false);
  const [loadedMemories, setLoadedMemories] = useState(0);

  return (
    <main className="relative min-h-screen overflow-hidden custom-scroll">
      <CustomCursor />
      <FloatingHearts />
      
      {/* Organic Memories - integrated throughout */}
      <OrganicMemories 
        answered={answered}
        onImageLoad={() => setLoadedMemories((prev) => prev + 1)}
      />
      
      <div className="relative z-10">
        {/* Auto-playing background music */}
        <AutoMusic />
        
        {/* Header with Love Meter */}
        <div className="fixed top-6 left-6 z-50">
          <LoveMeter />
        </div>

        {/* Main Question Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20 relative z-20">
          <InteractiveQuestion 
            onAnswer={(answer) => {
              setAnswered(answer === 'yes');
            }}
          />
        </section>

        {/* Confetti Celebration */}
        {answered && <ConfettiCelebration />}

        {/* Scrollable content area for memories to appear */}
        <div className="relative z-10" style={{ minHeight: '300vh' }}>
          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="fixed bottom-20 left-1/2 transform -translate-x-1/2 text-center px-4 z-50"
            >
              <motion.p
                className="text-2xl md:text-3xl font-handwriting text-lilac-700 bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg border-2 border-rose-200"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                Scroll to see our beautiful memories float by...
              </motion.p>
            </motion.div>
          )}
        </div>

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
