"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { MemoryItem } from "@/data/memoriesData";
import { playChime } from "@/lib/utils";

interface MemoryLightboxProps {
  items: MemoryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const MemoryLightbox: React.FC<MemoryLightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const [imgError, setImgError] = useState(false);

  const activeItem = currentIndex !== null ? items[currentIndex] : null;

  useEffect(() => {
    setImgError(false);
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        const prev = (currentIndex - 1 + items.length) % items.length;
        playChime(450, "sine", 0.2);
        onNavigate(prev);
      } else if (e.key === "ArrowRight") {
        const next = (currentIndex + 1) % items.length;
        playChime(550, "sine", 0.2);
        onNavigate(next);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [currentIndex, items.length, onClose, onNavigate]);

  if (currentIndex === null || !activeItem) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prev = (currentIndex - 1 + items.length) % items.length;
    playChime(450, "sine", 0.2);
    onNavigate(prev);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = (currentIndex + 1) % items.length;
    playChime(550, "sine", 0.2);
    onNavigate(next);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-8 bg-night-950/92 backdrop-blur-2xl select-none touch-manipulation"
        onClick={onClose}
      >
        {/* Top Control Bar */}
        <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-6 z-30 flex items-center justify-between text-rose-200">
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-rose-300/70 glass-surface px-3 py-1.5 rounded-full">
            {currentIndex + 1} / {items.length}
          </span>

          <button
            onClick={onClose}
            aria-label="Close lightbox"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass-surface flex items-center justify-center text-rose-200 hover:text-white transition-all cursor-pointer min-h-[36px]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prev/Next Buttons */}
        <button
          onClick={handlePrev}
          aria-label="Previous image"
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-surface flex items-center justify-center text-rose-200 hover:text-white transition-all cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next image"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-surface flex items-center justify-center text-rose-200 hover:text-white transition-all cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.7}
          onDragEnd={(e, { offset, velocity }) => {
            if (offset.x < -50 || velocity.x < -500) {
              const next = (currentIndex + 1) % items.length;
              playChime(550, "sine", 0.2);
              onNavigate(next);
            } else if (offset.x > 50 || velocity.x > 500) {
              const prev = (currentIndex - 1 + items.length) % items.length;
              playChime(450, "sine", 0.2);
              onNavigate(prev);
            }
          }}
          className="relative max-w-4xl w-full max-h-[88vh] editorial-card rounded-2xl overflow-hidden border border-rose-300/30 shadow-editorial flex flex-col my-auto"
        >
          {/* Image Display Area */}
          <div className="relative w-full h-[50vh] sm:h-[70vh] md:h-[85vh] bg-night-900 flex items-center justify-center overflow-hidden">
            {!imgError ? (
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                sizes="100vw"
                onError={() => setImgError(true)}
                className="object-cover"
              />
            ) : (
              <div
                className={`w-full h-full bg-gradient-to-tr ${activeItem.accentColor} flex flex-col items-center justify-center p-6 text-center border-white/5`}
              >
                <div className="w-12 h-12 rounded-full bg-rose-400/10 border border-rose-300/30 flex items-center justify-center text-rose-300 mb-2">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="font-serif italic text-base text-rose-100/90 font-medium">
                  {activeItem.title}
                </span>
                <span className="text-[9px] font-mono text-rose-300/50 mt-1 uppercase">
                  {activeItem.image}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
