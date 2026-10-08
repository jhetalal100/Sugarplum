"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { BirthdayLetterContent } from "@/data/letterData";

interface LetterCardProps {
  content: BirthdayLetterContent;
  className?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

export const LetterCard: React.FC<LetterCardProps> = ({ content, className }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`relative bg-[#F8F4E9] text-[#1C1224] rounded-3xl p-8 sm:p-14 border border-[#E8DFD0] shadow-[0_20px_50px_rgba(0,0,0,0.5)] -rotate-1 transition-transform duration-500 hover:rotate-0 max-w-2xl w-full select-text ${className}`}
    >
      {/* Decorative Wax Seal / Stamp Header */}
      <div className="flex items-center justify-between border-b border-[#E2D6C3] pb-6 mb-8">
        <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-[#7A6956]">
          <span>Srivigna Thaduri</span>
        </div>
        {content.date && (
          <span className="text-xs font-serif italic text-[#8C7A67]">
            {content.date}
          </span>
        )}
      </div>

      {/* Main Greeting Heading */}
      <motion.h3
        variants={itemVariants}
        className="font-serif italic font-bold text-3xl sm:text-4xl text-[#1C1224] mb-6"
      >
        {content.greeting}
      </motion.h3>



      {/* Paragraphs Line-by-Line Reveal */}
      <div className="space-y-5 font-sans text-sm sm:text-base text-[#2D1F3B] leading-relaxed font-normal">
        {content.paragraphs.map((paragraph, index) => (
          <motion.p key={index} variants={itemVariants}>
            {paragraph}
          </motion.p>
        ))}
      </div>

      {/* Letter Closing & Signature */}
      <motion.div
        variants={itemVariants}
        className="mt-10 pt-6 border-t border-[#E2D6C3] flex flex-col items-end text-right"
      >
        <p className="font-serif italic text-sm text-[#7A6956]">
          {content.closing}
        </p>
        <p className="font-serif font-bold text-xl sm:text-2xl text-[#1C1224] mt-1 flex items-center gap-1.5">
          <span>{content.signature}</span>
          <Heart className="w-4 h-4 text-rose-600 fill-current inline" />
        </p>
      </motion.div>
    </motion.div>
  );
};
