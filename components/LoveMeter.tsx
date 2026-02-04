'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Calculate days together (you can customize this date)
const START_DATE = new Date('2025-11-09'); // November 9, 2025

function calculateDaysTogether(): number {
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - START_DATE.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export default function LoveMeter() {
  const [days, setDays] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setDays(calculateDaysTogether());
    setIsVisible(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 shadow-lg border-2 border-rose-200"
    >
      <div className="flex flex-col items-start">
        <motion.div
          className="text-xs sm:text-sm text-lilac-600 font-handwriting mb-1"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Days Together
        </motion.div>
        <motion.div
          className="text-2xl sm:text-3xl font-bold text-rose-500 font-handwriting"
          key={days}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {days.toLocaleString()}
        </motion.div>
      </div>

      {/* Love meter bar */}
      <div className="mt-2 sm:mt-3 w-full h-1.5 sm:h-2 bg-lilac-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </motion.div>
  );
}
