'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function ConfettiCelebration() {
  useEffect(() => {
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Launch confetti from left
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff3366', '#ff6b9d', '#ff8fab', '#d5c7ff', '#ffbfd3'],
      });

      // Launch confetti from right
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff3366', '#ff6b9d', '#ff8fab', '#d5c7ff', '#ffbfd3'],
      });
    }, 250);

    // Big burst in the center
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff3366', '#ff6b9d', '#ff8fab', '#d5c7ff', '#ffbfd3'],
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return null;
}
