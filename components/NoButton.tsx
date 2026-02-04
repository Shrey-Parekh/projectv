'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface NoButtonProps {
  onClick: () => void;
  attempts: number;
  text: string;
}

export default function NoButton({ onClick, attempts, text }: NoButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate scale based on attempts (shrinks progressively)
  const scale = Math.max(0.3, 1 - attempts * 0.1);
  
  // Calculate speed multiplier (gets faster with more attempts)
  const speedMultiplier = Math.min(3, 1 + attempts * 0.2);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (buttonRef.current && containerRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;
        
        const distanceX = e.clientX - buttonCenterX;
        const distanceY = e.clientY - buttonCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        // If mouse is close, move button away
        if (distance < 150) {
          const angle = Math.atan2(distanceY, distanceX);
          const moveDistance = (150 - distance) * speedMultiplier;
          
          const newX = position.x + Math.cos(angle) * moveDistance;
          const newY = position.y + Math.sin(angle) * moveDistance;
          
          // Constrain to container bounds
          const maxX = containerRect.width / 2 - buttonRect.width / 2;
          const maxY = containerRect.height / 2 - buttonRect.height / 2;
          
          setPosition({
            x: Math.max(-maxX, Math.min(maxX, newX)),
            y: Math.max(-maxY, Math.min(maxY, newY)),
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [position, speedMultiplier]);

  // Reset position slightly on each attempt
  useEffect(() => {
    if (attempts > 0) {
      const randomX = (Math.random() - 0.5) * 200;
      const randomY = (Math.random() - 0.5) * 200;
      setPosition({ x: randomX, y: randomY });
    }
  }, [attempts]);

  return (
    <div ref={containerRef} className="relative w-64 h-64 md:w-80 md:h-80">
      <motion.button
        ref={buttonRef}
        onClick={onClick}
        className="absolute top-1/2 left-1/2 px-8 py-4 text-xl md:text-2xl font-bold text-lilac-700 rounded-full whitespace-nowrap font-handwriting"
        style={{
          background: 'linear-gradient(135deg, #e8d5ff 0%, #f0e6ff 100%)',
          boxShadow: '0 5px 20px rgba(186, 85, 211, 0.3)',
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
        animate={{
          x: position.x,
          y: position.y,
          rotate: attempts % 2 === 0 ? [-5, 5, -5] : [5, -5, 5],
        }}
        transition={{
          x: { type: 'spring', stiffness: 300, damping: 30 },
          y: { type: 'spring', stiffness: 300, damping: 30 },
          rotate: { duration: 0.3, repeat: Infinity },
        }}
        whileHover={{
          scale: scale * 1.1,
        }}
        whileTap={{
          scale: scale * 0.9,
        }}
      >
        {text}
      </motion.button>
    </div>
  );
}
