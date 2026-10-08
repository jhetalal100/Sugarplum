"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn, playChime } from "@/lib/utils";
import { getRandomCatMessage } from "@/data/stickersData";
import { triggerSparkleBurst } from "@/lib/animations";

export interface StickerProps {
  src: string;
  alt: string;
  initialMessage?: string;
  position?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  rotation?: number;
  scale?: number;
  animation?: "float" | "bounce" | "wiggle" | "pulse";
  delay?: number;
  speechBubblePosition?: "top" | "bottom" | "left" | "right";
  name?: string;
  className?: string;
}

export const Sticker: React.FC<StickerProps> = ({
  src,
  alt,
  initialMessage = "pspspspsps 🐾",
  position,
  rotation = 0,
  scale = 1,
  animation = "float",
  delay = 0,
  speechBubblePosition = "top",
  name = "SRIVIGNA",
  className,
}) => {
  const [hasImageError, setHasImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const floatVariants: Variants = {
    animate: {
      y: [-5, 5, -5],
      rotate: [rotation - 1.5, rotation + 1.5, rotation - 1.5],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      },
    },
  };

  const bounceVariants: Variants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      },
    },
  };

  const wiggleVariants: Variants = {
    animate: {
      rotate: [rotation - 3, rotation + 3, rotation - 3],
      transition: {
        duration: 3.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      },
    },
  };

  const pulseVariants: Variants = {
    animate: {
      scale: [scale, scale * 1.04, scale],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      },
    },
  };

  const selectedAnimation =
    animation === "bounce"
      ? bounceVariants
      : animation === "wiggle"
        ? wiggleVariants
        : animation === "pulse"
          ? pulseVariants
          : floatVariants;

  const handleStickerClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();

    playChime(550 + Math.random() * 300, "sine", 0.35);

    if ("clientX" in e) {
      triggerSparkleBurst(e.clientX, e.clientY);
    } else {
      triggerSparkleBurst(window.innerWidth / 2, window.innerHeight / 2);
    }
  };

  const bubblePositions = {
    top: "-top-12 left-1/2 -translate-x-1/2",
    bottom: "-bottom-12 left-1/2 -translate-x-1/2",
    left: "top-1/2 -left-36 -translate-y-1/2",
    right: "top-1/2 -right-36 -translate-y-1/2",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: position ? "absolute" : "relative",
        top: position?.top,
        bottom: position?.bottom,
        left: position?.left,
        right: position?.right,
        transform: `rotate(${rotation}deg)`,
      }}
      tabIndex={0}
      role="button"
      aria-label={`Interactive sticker: ${alt}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleStickerClick(e);
        }
      }}
      className={cn("z-20 cursor-pointer select-none group touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 rounded-2xl", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleStickerClick}
    >
      <motion.div
        variants={selectedAnimation}
        animate="animate"
        whileHover={{
          scale: 1.12,
          rotate: [rotation, rotation - 6, rotation + 6, rotation - 3, rotation],
          transition: { duration: 0.4 },
        }}
        whileTap={{ scale: 0.94 }}
        className="relative flex flex-col items-center"
      >
        {/* Animated Speech Bubble */}
        <AnimatePresence mode="wait">
          {isHovered && (
            <motion.div
              key={initialMessage}
              initial={{ opacity: 0, scale: 0.85, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -4 }}
              transition={{ duration: 0.25 }}
              className={cn(
                "absolute z-30 whitespace-nowrap editorial-card border-rose-300/30 px-3.5 py-1.5 rounded-xl shadow-editorial text-cream-100 text-[11px] font-medium tracking-wide flex items-center gap-1 pointer-events-none transition-all duration-300",
                bubblePositions[speechBubblePosition]
              )}
            >
              <span>{initialMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Polaroid Style Sticker Frame */}
        <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl editorial-card p-3 flex flex-col items-center justify-between border-white/[0.08] group-hover:border-rose-300/40 group-hover:shadow-subtle-glow transition-all duration-300">
          <div className="w-full h-4/5 overflow-hidden rounded-lg bg-night-900/60 flex items-center justify-center p-2">
            {!hasImageError ? (
              <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                onError={() => setHasImageError(true)}
                className="w-full h-full object-contain drop-shadow-sm"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-rose-300">
                <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14 drop-shadow-sm">
                  <path
                    d="M12 28L18 10L30 22H34L46 10L52 28C54 36 50 48 32 48C14 48 10 36 12 28Z"
                    fill="url(#catGradArt2)"
                    stroke="rgba(242, 186, 195, 0.6)"
                    strokeWidth="2"
                  />
                  <circle cx="23" cy="32" r="3" fill="#FFFBF7" />
                  <circle cx="41" cy="32" r="3" fill="#FFFBF7" />
                  <circle cx="23" cy="32" r="1.5" fill="#070409" />
                  <circle cx="41" cy="32" r="1.5" fill="#070409" />
                  <polygon points="32,36 30,39 34,39" fill="#F2BAC3" />
                  <path
                    d="M16 35H8M16 38H10M48 35H56M48 38H54"
                    stroke="rgba(242,186,195,0.5)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="catGradArt2" x1="12" y1="10" x2="52" y2="48" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#20172B" />
                      <stop offset="1" stopColor="#100B16" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
