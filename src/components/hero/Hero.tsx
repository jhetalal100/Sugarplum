"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Eyebrow } from "@/components/ui/Typography";
import { triggerCelebrationConfetti } from "@/lib/animations";
import { playChime } from "@/lib/utils";
import { useMusic } from "@/context/MusicContext";

const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.35,
      delayChildren: 0.2,
    },
  },
};

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

const titleReveal: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const Hero: React.FC = () => {
  const { startMusic } = useMusic();

  const handleEnterExperience = () => {
    playChime(587.33, "sine", 0.6);
    startMusic();
    triggerCelebrationConfetti();
    const nextSection = document.getElementById("reveal");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center text-center px-4 sm:px-6 py-16 sm:py-20 overflow-hidden bg-night-950 select-none"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/background.jpeg"
          alt="Hero Background"
          fill
          priority
          className="object-cover opacity-30"
        />
      </div>
      {/* Soft Breathing Lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[680px] h-[340px] sm:h-[680px] rounded-full pointer-events-none blur-[100px] sm:blur-[140px] opacity-20 bg-radial-gradient from-rose-400/30 via-lavender-300/15 to-transparent animate-pulse-subtle"
      />

      <div className="h-14 sm:h-16" />

      {/* Main Content Container */}
      <motion.div
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center my-auto w-full"
      >
        <motion.div variants={itemFadeUp} className="mb-3 sm:mb-4">
          <Eyebrow className="text-rose-200/75 font-light tracking-[0.25em] text-[10px] sm:text-xs">
            Oka chinna prayatnam ni kosam.
          </Eyebrow>
        </motion.div>

        <motion.p
          variants={itemFadeUp}
          className="font-serif italic text-xl sm:text-3xl text-rose-100/60 font-light mb-1 sm:mb-2"
        >
          Naa
        </motion.p>

        {/* Art-Directed Intimate Headline */}
        <motion.h1
          variants={titleReveal}
          className="font-serif font-semibold text-4xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[1.08] my-2 px-2"
        >
          <span className="gradient-text-rose drop-shadow-[0_0_30px_rgba(244,172,183,0.25)]">
            Gaajubomma
          </span>
        </motion.h1>

        <motion.div
          variants={itemFadeUp}
          className="mt-4 sm:mt-6 max-w-lg text-xs sm:text-base md:text-lg text-rose-100/75 leading-relaxed font-light px-2 space-y-1"
        >
          <p>Ni birthday roju simple ga wish chesthn ani ela anukunav</p>
          <p className="text-rose-200/90 font-normal">So,here is a small try.</p>
        </motion.div>

        <motion.div variants={itemFadeUp} className="mt-8 sm:mt-12 w-full flex justify-center px-4">
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleEnterExperience}
            className="btn-primary group cursor-pointer text-xs sm:text-sm font-medium tracking-wide flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 w-full sm:w-auto min-h-[48px] touch-manipulation shadow-subtle-glow"
          >
            <span>Ika modhalaudama?</span>
            <span className="text-night-950 font-bold group-hover:translate-x-1.5 transition-transform duration-300">
              →
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="relative z-10 flex flex-col items-center gap-1.5 text-rose-200/40 hover:text-rose-200/70 transition-colors cursor-pointer py-2 touch-manipulation"
        onClick={() => {
          document.getElementById("reveal")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-[0.2em] font-light">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
};
