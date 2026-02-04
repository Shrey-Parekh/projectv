'use client';

import { motion } from 'framer-motion';

interface YesButtonProps {
  onClick: () => void;
}

export default function YesButton({ onClick }: YesButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative px-12 py-6 text-2xl md:text-3xl font-bold text-white rounded-full overflow-hidden group"
      style={{
        background: 'linear-gradient(135deg, #ff3366 0%, #ff6b9d 50%, #ff8fab 100%)',
        boxShadow: '0 10px 40px rgba(255, 51, 102, 0.4)',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      <span className="relative z-10 font-handwriting">Yes!</span>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl opacity-50"
        style={{
          background: 'linear-gradient(135deg, #ff3366 0%, #ff6b9d 100%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.button>
  );
}
