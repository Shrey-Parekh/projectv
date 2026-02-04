'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Generate image paths - handles multiple extensions
const generateImagePaths = () => {
  const images: string[] = [];
  // You have 122 images (image 1.png, image 2.jpg through image 122.jpg)
  for (let i = 1; i <= 122; i++) {
    // Image 1 is .png, others are .jpg (public/Images/ folder)
    if (i === 1) {
      images.push(`/Images/image ${i}.png`);
    } else {
      images.push(`/Images/image ${i}.jpg`);
    }
  }
  return images;
};

const imagePaths = generateImagePaths();

interface MemoryTileProps {
  src: string;
  index: number;
  onLoad: () => void;
  answered: boolean;
  position: { row: number; col: number; x: number; y: number };
}

function MemoryTile({ src, index, onLoad, answered, position }: MemoryTileProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth < 768) {
        setScreenSize('mobile');
      } else if (window.innerWidth < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Sizes with spacing in mind (slightly smaller to reduce overlap)
  const size = screenSize === 'mobile' ? 64 : screenSize === 'tablet' ? 82 : 100;
  // Very short stagger so all photos are visible quickly (max ~0.2s)
  const delay = index * 0.0018;
  const rotation = (index % 5 - 2) * 4;

  return (
    <motion.div
      className="absolute pointer-events-auto"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      initial={{ opacity: 0, scale: 0, rotate: rotation }}
      animate={
        answered
          ? {
              opacity: [0, 1, 0.95],
              scale: [0, 1.15, 1],
              rotate: rotation,
            }
          : { opacity: 0, scale: 0 }
      }
      transition={{
        duration: 0.25,
        delay,
        type: 'spring',
        stiffness: 260,
        damping: 22,
      }}
      whileHover={{
        scale: 2.2,
        zIndex: 1000,
        opacity: 1,
        rotate: 0,
        transition: {
          duration: 0.3,
          type: 'spring',
          stiffness: 300,
        },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div
        className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl"
        style={{
          boxShadow: '0 8px 30px rgba(255, 51, 102, 0.5), 0 0 0 2px rgba(255, 182, 211, 0.3)',
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 182, 211, 0.6), rgba(213, 199, 255, 0.6))',
            padding: '3px',
          }}
          animate={{
            background: [
              'linear-gradient(135deg, rgba(255, 182, 211, 0.6), rgba(213, 199, 255, 0.6))',
              'linear-gradient(225deg, rgba(213, 199, 255, 0.6), rgba(255, 182, 211, 0.6))',
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-rose-100 to-lilac-100">
            <Image
              src={src}
              alt={`Memory ${index + 1}`}
              fill
              className="object-cover rounded-lg"
              loading={index < 30 ? 'eager' : 'lazy'}
              priority={index < 15}
              onLoad={() => {
                setIsLoaded(true);
                onLoad();
              }}
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                const currentSrc = img.src;
                const lastDot = currentSrc.lastIndexOf('.');
                const basePath = currentSrc.substring(0, lastDot);
                const ext = (currentSrc.substring(lastDot) || '').toLowerCase();
                // Try alternate extensions so all PNG/JPG load
                if (ext === '.jpg' || ext === '.jpeg') {
                  img.src = `${basePath}.png`;
                } else if (ext === '.png') {
                  img.src = `${basePath}.jpg`;
                }
              }}
            />
          </div>
        </motion.div>

        {/* Heart decoration on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute -top-1 -right-1 text-rose-400"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

interface OrganicMemoriesProps {
  answered: boolean;
  onImageLoad?: () => void;
}

export default function OrganicMemories({ answered, onImageLoad }: OrganicMemoriesProps) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [visibleImages, setVisibleImages] = useState<string[]>([]);
  const [positions, setPositions] = useState<Array<{ row: number; col: number; x: number; y: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate grid positions: middle-heavy layout, better spacing, exactly 122 positions
  useEffect(() => {
    const TOTAL = imagePaths.length; // 122
    const COLS = window.innerWidth < 768 ? 8 : window.innerWidth < 1024 ? 10 : 10;
    const ROWS = Math.ceil(TOTAL / COLS); // e.g. 13 rows

    // Middle band: concentrate in 22%–82% of viewport (less top, more middle)
    const Y_START = 22;
    const Y_END = 82;
    const X_START = 6;
    const X_END = 94;

    const buildPositions = (): Array<{ row: number; col: number; x: number; y: number }> => {
      const positions: Array<{ row: number; col: number; x: number; y: number }> = [];
      for (let i = 0; i < TOTAL; i++) {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const colNorm = COLS > 1 ? col / (COLS - 1) : 0.5;
        const rowNorm = ROWS > 1 ? row / (ROWS - 1) : 0.5;
        const xBase = X_START + colNorm * (X_END - X_START);
        const yBase = Y_START + rowNorm * (Y_END - Y_START);
        // Deterministic small jitter for organic feel (no overlap from random)
        const xJitter = ((i % 7) - 3) * 0.4;
        const yJitter = ((i % 5) - 2) * 0.4;
        positions.push({
          row,
          col,
          x: Math.max(2, Math.min(98, xBase + xJitter)),
          y: Math.max(2, Math.min(98, yBase + yJitter)),
        });
      }
      return positions;
    };

    setPositions(buildPositions());
    const handleResize = () => setPositions(buildPositions());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // When answered, show all 122 images; before that, a small preview batch
  useEffect(() => {
    if (answered) {
      setVisibleImages([...imagePaths]);
    } else {
      setVisibleImages(imagePaths.slice(0, 20));
    }
  }, [answered]);

  const handleImageLoad = () => {
    setLoadedCount((prev) => prev + 1);
    onImageLoad?.();
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{
        background: 'radial-gradient(circle at center, transparent 0%, rgba(255, 182, 211, 0.1) 100%)',
      }}
    >
      {visibleImages.map((src, index) => {
        const position = positions[index];
        if (!position) return null;
        return (
          <MemoryTile
            key={`memory-${index}-${src}`}
            src={src}
            index={index}
            onLoad={handleImageLoad}
            answered={answered}
            position={position}
          />
        );
      })}
    </div>
  );
}
