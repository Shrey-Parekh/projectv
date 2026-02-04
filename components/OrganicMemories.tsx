'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll } from 'framer-motion';

// Generate image paths
const generateImagePaths = () => {
  const images: string[] = [];
  for (let i = 1; i <= 150; i++) {
    images.push(`/images/image ${i}.jpg`);
  }
  return images;
};

const imagePaths = generateImagePaths();

interface FloatingMemoryProps {
  src: string;
  index: number;
  onLoad: () => void;
  answered: boolean;
  scrollProgress: number;
}

function FloatingMemory({ src, index, onLoad, answered, scrollProgress }: FloatingMemoryProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect screen size
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

  // Create unique floating pattern for each image (responsive)
  useEffect(() => {
    const updatePosition = () => {
      // Distribute images across the viewport in organic patterns
      const angle = (index / imagePaths.length) * Math.PI * 4; // Spiral
      const radius = screenSize === 'mobile'
        ? 100 + (index % 6) * 25  // Tighter on mobile
        : screenSize === 'tablet'
        ? 120 + (index % 7) * 30  // Medium on tablet
        : 150 + (index % 8) * 40; // Full on desktop
      
      // Calculate position as percentage
      const baseX = 50 + Math.cos(angle) * (radius / 10);
      const baseY = 50 + Math.sin(angle) * (radius / 10);
      
      setPosition({
        x: Math.max(screenSize === 'mobile' ? 10 : 8, Math.min(screenSize === 'mobile' ? 90 : 92, baseX)),
        y: Math.max(screenSize === 'mobile' ? 15 : 10, Math.min(screenSize === 'mobile' ? 85 : 90, baseY)),
      });
    };

    updatePosition();
  }, [index, screenSize]);

  // Responsive size varies by index and screen size
  const size = screenSize === 'mobile'
    ? 60 + (index % 4) * 20  // Smaller on mobile
    : screenSize === 'tablet'
    ? 70 + (index % 5) * 25  // Medium on tablet
    : 80 + (index % 5) * 30; // Full size on desktop
  const rotation = (index % 7 - 3) * 8;
  
  // Delay based on index for staggered appearance
  const delay = (index % 20) * 0.15;
  
  // Calculate when this image should appear
  // Show immediately if answered, otherwise show progressively as you scroll
  const scrollThreshold = (index / imagePaths.length) * 0.4;
  const shouldShow = answered || scrollProgress > scrollThreshold;

  return (
    <motion.div
      ref={containerRef}
      className="fixed pointer-events-none z-0"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      initial={{ opacity: 0, scale: 0, y: '100vh' }}
      animate={
        shouldShow && isLoaded
          ? {
              opacity: [0, 0.95, 0.75],
              scale: [0, 1.15, 1],
              y: 0,
              rotate: rotation,
              x: [0, (Math.random() - 0.5) * 40],
            }
          : { opacity: 0, scale: 0 }
      }
      transition={{
        duration: 2.5,
        delay,
        type: 'spring',
        stiffness: 40,
        damping: 15,
      }}
      whileHover={{
        scale: screenSize !== 'mobile' ? 1.3 : 1.1,
        zIndex: 100,
        opacity: 1,
      }}
      className="pointer-events-auto md:pointer-events-none"
    >
      {/* Photo with decorative frame */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: '0 15px 50px rgba(255, 51, 102, 0.4), 0 0 0 3px rgba(255, 182, 211, 0.3)',
        }}
      >
        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 182, 211, 0.6), rgba(213, 199, 255, 0.6))',
            padding: '4px',
          }}
          animate={{
            background: [
              'linear-gradient(135deg, rgba(255, 182, 211, 0.6), rgba(213, 199, 255, 0.6))',
              'linear-gradient(225deg, rgba(213, 199, 255, 0.6), rgba(255, 182, 211, 0.6))',
              'linear-gradient(135deg, rgba(255, 182, 211, 0.6), rgba(213, 199, 255, 0.6))',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-rose-100 to-lilac-100">
            <Image
              src={src}
              alt={`Memory ${index + 1}`}
              fill
              className="object-cover rounded-xl"
              loading="lazy"
              onLoad={() => {
                setIsLoaded(true);
                onLoad();
              }}
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

        {/* Floating heart decoration - responsive size */}
        <motion.div
          className="absolute -top-1 -right-1 md:-top-2 md:-right-2 text-rose-400"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.1,
          }}
        >
          <svg 
            width={screenSize === 'mobile' ? "16" : "20"} 
            height={screenSize === 'mobile' ? "16" : "20"} 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      </div>

      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl blur-xl -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(255, 182, 211, 0.4), transparent)',
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: index * 0.05,
        }}
      />
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Update scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollProgress(latest);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Progressive loading
  useEffect(() => {
    // Start with first batch around the question area
    const initialBatch = imagePaths.slice(0, 40);
    setVisibleImages(initialBatch);

    // Load more as time passes or when answered
    const loadMore = () => {
      setVisibleImages((prev) => {
        if (prev.length < imagePaths.length) {
          const nextBatch = imagePaths.slice(
            prev.length,
            Math.min(prev.length + 25, imagePaths.length)
          );
          return [...prev, ...nextBatch];
        }
        return prev;
      });
    };

    // Load more images progressively every 400ms
    const interval = setInterval(loadMore, 400);
    
    // If answered, load all images immediately for celebration
    if (answered) {
      setTimeout(() => {
        setVisibleImages(imagePaths);
      }, 800);
    }

    return () => clearInterval(interval);
  }, [answered]);

  const handleImageLoad = () => {
    setLoadedCount((prev) => prev + 1);
    onImageLoad?.();
  };

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden">
      {visibleImages.map((src, index) => (
        <FloatingMemory
          key={`memory-${index}`}
          src={src}
          index={index}
          onLoad={handleImageLoad}
          answered={answered}
          scrollProgress={scrollProgress}
        />
      ))}
    </div>
  );
}
