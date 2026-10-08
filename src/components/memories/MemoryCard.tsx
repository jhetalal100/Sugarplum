"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight, Camera } from "lucide-react";
import { MemoryItem } from "@/data/memoriesData";
import { playChime } from "@/lib/utils";

interface MemoryCardProps {
  memory: MemoryItem;
  onClick: () => void;
  className?: string;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({
  memory,
  onClick,
  className,
}) => {
  const [hasImgError, setHasImgError] = useState(false);

  const handleClick = () => {
    playChime(620, "sine", 0.3);
    onClick();
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label={`View memory: ${memory.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`editorial-card editorial-card-hover rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10 shadow-editorial transition-all duration-500 flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 ${className}`}
    >
      {/* Background Image or Editorial Artwork Fallback */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-night-900">
        {!hasImgError ? (
          <Image
            src={memory.image}
            alt={memory.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => setHasImgError(true)}
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-95"
          />
        ) : (
          /* High-Fashion Fallback Frame Container */
          <div
            className={`w-full h-full bg-gradient-to-tr ${memory.accentColor} flex flex-col items-center justify-center p-6 text-center border-b border-white/5 relative`}
          >
            <div className="w-14 h-14 rounded-full bg-rose-400/10 border border-rose-300/30 flex items-center justify-center text-rose-200 mb-3 group-hover:scale-110 transition-transform shadow-subtle-glow">
              <Camera className="w-6 h-6" />
            </div>
            <span className="font-serif italic text-base text-cream-100/90 font-medium max-w-[80%]">
              {memory.title}
            </span>
            <span className="text-[9px] font-mono text-rose-300/60 mt-1 uppercase tracking-widest">
              vault.0{memory.id.slice(-1)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />
      </div>

      {/* Top Registration Tags */}
      <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between">
        {memory.date ? (
          <span className="glass-surface text-[10px] uppercase font-mono tracking-widest text-rose-200/90 px-3 py-1.5 rounded-full border-rose-300/20">
            {memory.date}
          </span>
        ) : (
          <span />
        )}
        <div className="w-8 h-8 rounded-full glass-surface flex items-center justify-center text-rose-200 group-hover:text-white group-hover:border-rose-300/40 transition-all">
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>

      {/* Bottom Text Content */}
      <div className="relative z-10 p-5 sm:p-6 pt-0">
        <h3 className="font-serif text-lg sm:text-2xl font-bold text-cream-100 group-hover:text-rose-200 transition-colors">
          {memory.title}
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-rose-100/70 font-light leading-relaxed line-clamp-2">
          {memory.description}
        </p>
      </div>
    </motion.article>
  );
};
