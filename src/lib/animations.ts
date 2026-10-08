import confetti from "canvas-confetti";
import type { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/**
 * Mobile-Optimized Celebration Confetti Effect
 */
export function triggerCelebrationConfetti() {
  if (typeof window === "undefined") return;

  const isMobile = window.innerWidth < 640;
  const count = isMobile ? 80 : 180; // Performance cap for mobile devices

  const defaults = {
    origin: { y: 0.7 },
    colors: ["#F2BAC3", "#E8B4B8", "#C4B5FD", "#FFFBF7", "#D48B96"],
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      disableForReducedMotion: true,
    });
  }

  fire(0.3, {
    spread: isMobile ? 35 : 55,
    startVelocity: isMobile ? 35 : 50,
  });
  fire(0.25, {
    spread: isMobile ? 50 : 80,
  });
  fire(0.25, {
    spread: isMobile ? 70 : 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.2, {
    spread: isMobile ? 80 : 110,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1,
  });
}

/**
 * Mobile-Optimized Sparkle Burst
 */
export function triggerSparkleBurst(x: number, y: number) {
  if (typeof window === "undefined") return;

  const isMobile = window.innerWidth < 640;

  confetti({
    particleCount: isMobile ? 16 : 28,
    spread: isMobile ? 35 : 50,
    origin: { x: x / window.innerWidth, y: y / window.innerHeight },
    colors: ["#FFFBF7", "#E8B4B8", "#C4B5FD"],
    ticks: isMobile ? 120 : 180,
    gravity: 0.8,
    scalar: isMobile ? 0.6 : 0.75,
    disableForReducedMotion: true,
  });
}
