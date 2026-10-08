"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Music, VolumeX, Heart, Gift, Smile } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { triggerCelebrationConfetti } from "@/lib/animations";
import { useMusic } from "@/context/MusicContext";

export const Navbar: React.FC = () => {
  const { isPlaying, togglePlay, hasError } = useMusic();
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const sections = ["hero", "reveal", "stickers", "memories", "letter", "gift"];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleConfetti = () => {
    triggerCelebrationConfetti();
  };

  const navLinks = [
    { id: "reveal", label: "Reveal", icon: <Sparkles className="w-3 h-3" /> },
    { id: "stickers", label: "Committee", icon: <Smile className="w-3 h-3" /> },
    { id: "memories", label: "Memories", icon: <Heart className="w-3 h-3" /> },
    { id: "letter", label: "Letter", icon: "💌" },
    { id: "gift", label: "Gift", icon: <Gift className="w-3 h-3" /> },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
      className="fixed top-3 sm:top-4 inset-x-0 z-50 px-3 sm:px-8 max-w-5xl mx-auto pointer-events-none"
    >
      <div className="glass-surface rounded-full px-4 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between shadow-subtle-glass pointer-events-auto border border-white/10 backdrop-blur-xl">
        {/* Brand Emblem */}
        <a href="#hero" className="flex items-center gap-2 group min-h-[40px]">
          {/* <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-rose-300 via-rose-200 to-lavender-200 flex items-center justify-center text-night-950 font-bold text-xs shadow-glow-soft group-hover:scale-105 transition-transform duration-300">
            
          </div> */}
          <span className="font-serif font-semibold text-xs sm:text-sm tracking-wide text-cream-100 group-hover:text-rose-200 transition-colors">
            SRIVIGNA THADURI
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.15em] uppercase font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`relative flex items-center gap-1.5 transition-colors py-1 ${isActive ? "text-rose-200 font-semibold" : "text-rose-200/60 hover:text-cream-100"
                  }`}
              >
                <span className="opacity-90">{link.icon}</span>
                <span>{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 inset-x-0 h-0.5 bg-rose-300 rounded-full shadow-glow-rose"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile & Desktop Action Buttons */}
        <div className="flex items-center gap-2">
          {!hasError && (
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause audio soundtrack" : "Play audio soundtrack"}
              className="w-8 h-8 sm:w-8 sm:h-8 min-h-[36px] rounded-full glass-surface flex items-center justify-center text-rose-200 hover:text-cream-100 transition-all cursor-pointer touch-manipulation"
            >
              {isPlaying ? (
                <Music className="w-3.5 h-3.5 text-rose-300 animate-pulse" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-rose-200/60" />
              )}
            </button>
          )}

          <Button
            variant="primary"
            size="sm"
            onClick={handleConfetti}
            className="text-[11px] sm:text-xs px-3 sm:px-3.5 py-1.5 min-h-[36px]"
          >
            <Sparkles className="w-3 h-3 fill-current" />
            <span>Make Wish</span>
          </Button>
        </div>
      </div>
    </motion.header>
  );
};
