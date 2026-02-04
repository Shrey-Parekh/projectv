'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Generate image paths
const generateImagePaths = () => {
  const images: string[] = [];
  for (let i = 1; i <= 150; i++) {
    images.push(`/images/image ${i}.jpg`);
  }
  return images;
};

const imagePaths = generateImagePaths();

interface PhotoBubbleProps {
  src: string;
  index: number;
  onLoad: () => void;
  position: { x: number; y: number; rotation: number };
}

function PhotoBubble({ src, index, onLoad, position }: PhotoBubbleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  // Create organic bubble effect with decorative elements
  const size = 120 + (index % 3) * 40; // Varying sizes
  const delay = (index % 10) * 0.1;

  return (
    <motion.div
      ref={ref}
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      initial={{ opacity: 0, scale: 0, y: 100 }}
      animate={
        isInView
          ? {
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: position.rotation,
            }
          : {}
      }
      transition={{
        duration: 0.8,
        delay,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.15,
        zIndex: 50,
        rotate: position.rotation + (position.rotation > 0 ? 10 : -10),
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Decorative heart around photo */}
      <motion.div
        className="absolute -top-4 -right-4 text-rose-400"
        animate={{
          scale: isHovered ? [1, 1.3, 1] : 1,
          rotate: isHovered ? [0, 15, -15, 0] : 0,
        }}
        transition={{ duration: 0.6 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </motion.div>

      {/* Photo bubble with glow */}
      <div
        className="relative rounded-full overflow-hidden shadow-2xl"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: '0 10px 40px rgba(255, 51, 102, 0.3), 0 0 0 4px rgba(255, 182, 211, 0.2)',
        }}
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 182, 211, 0.5), rgba(213, 199, 255, 0.5))',
            padding: '3px',
          }}
          animate={{
            background: [
              'linear-gradient(135deg, rgba(255, 182, 211, 0.5), rgba(213, 199, 255, 0.5))',
              'linear-gradient(225deg, rgba(213, 199, 255, 0.5), rgba(255, 182, 211, 0.5))',
              'linear-gradient(135deg, rgba(255, 182, 211, 0.5), rgba(213, 199, 255, 0.5))',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-rose-100 to-lilac-100">
            <Image
              src={src}
              alt={`Memory ${index}`}
              fill
              className="object-cover rounded-full"
              loading="lazy"
              onLoad={onLoad}
              onError={(e) => {
                const currentSrc = (e.target as HTMLImageElement).src;
                const basePath = currentSrc.split('.').slice(0, -1).join('.');
                const extensions = ['.jpeg', '.png', '.webp', '.gif'];
                const urlParts = currentSrc.split('/');
                const filename = urlParts[urlParts.length - 1];
                const currentExt = filename.substring(filename.lastIndexOf('.'));
                const extIndex = extensions.indexOf(currentExt);
                if (extIndex < extensions.length - 1) {
                  (e.target as HTMLImageElement).src = `${basePath}${extensions[extIndex + 1]}`;
                } else if (extIndex === -1) {
                  (e.target as HTMLImageElement).src = `${basePath}.jpeg`;
                }
              }}
            />
          </div>
        </motion.div>

        {/* Floating sparkles */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-rose-300 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + (i % 2) * 80}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    y: [-20, -40],
                    x: [-10 + i * 5, -20 + i * 10],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    repeat: Infinity,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Memory number badge */}
      <motion.div
        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-3 py-1 shadow-lg border-2 border-rose-200"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: delay + 0.3 }}
      >
        <span className="text-xs font-bold text-rose-500 font-handwriting">
          #{index}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function PhotoGallery() {
  const [loadedImages, setLoadedImages] = useState(0);
  const [visibleImages, setVisibleImages] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate organic positions (flowing, organic layout)
  const generatePositions = (count: number) => {
    const positions: Array<{ x: number; y: number; rotation: number }> = [];
    
    for (let i = 0; i < count; i++) {
      // Create flowing, organic pattern
      const angle = (i / count) * Math.PI * 4; // Spiral pattern
      const radius = 15 + (i % 8) * 8; // Varying distances
      const x = 50 + Math.cos(angle) * radius + (Math.random() - 0.5) * 10;
      const y = 20 + Math.sin(angle) * radius * 0.6 + (i % 5) * 15 + (Math.random() - 0.5) * 10;
      const rotation = (Math.random() - 0.5) * 20;
      
      positions.push({ x: Math.max(5, Math.min(95, x)), y, rotation });
    }
    
    return positions;
  };

  const [positions] = useState(() => generatePositions(imagePaths.length));

  // Load images progressively
  useEffect(() => {
    const initialBatch = imagePaths.slice(0, 30);
    setVisibleImages(initialBatch);
  }, []);

  // Load more images on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollPosition = window.scrollY + window.innerHeight;
      const containerBottom = containerRef.current.offsetTop + containerRef.current.offsetHeight;
      
      if (scrollPosition > containerBottom - 500 && visibleImages.length < imagePaths.length) {
        const nextBatch = imagePaths.slice(
          visibleImages.length,
          Math.min(visibleImages.length + 30, imagePaths.length)
        );
        setVisibleImages((prev) => [...prev, ...nextBatch]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleImages.length]);

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  return (
    <div ref={containerRef} className="relative py-20 px-4 min-h-screen">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <motion.h2
          className="text-5xl md:text-7xl font-bold font-handwriting mb-6"
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
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          Our Beautiful Memories
        </motion.h2>
        <motion.p
          className="text-2xl text-lilac-600 font-handwriting"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {loadedImages} moments of pure joy captured
        </motion.p>
      </motion.div>

      {/* Organic flowing photo layout */}
      <div className="relative max-w-[95vw] mx-auto" style={{ minHeight: '200vh' }}>
        {visibleImages.map((src, index) => (
          <PhotoBubble
            key={`${src}-${index}`}
            src={src}
            index={index + 1}
            onLoad={handleImageLoad}
            position={positions[index]}
          />
        ))}

        {/* Decorative floating hearts */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-rose-300 opacity-30 pointer-events-none"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${20 + (i * 12) % 80}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 15, -15, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Loading indicator */}
      {visibleImages.length < imagePaths.length && (
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="inline-block w-12 h-12 border-4 border-rose-400 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <p className="mt-4 text-lilac-600 font-handwriting text-lg">
            Loading more beautiful memories...
          </p>
        </motion.div>
      )}
    </div>
  );
}
