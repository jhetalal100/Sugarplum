"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Gift, Sparkles, Heart, RotateCcw, Video, Film } from "lucide-react";
import { Eyebrow } from "@/components/ui/Typography";
import { triggerCelebrationConfetti } from "@/lib/animations";
import { playChime } from "@/lib/utils";

export const GiftSection: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleUnwrap = () => {
    if (!isOpened) {
      playChime(783.99, "sine", 0.7);
      triggerCelebrationConfetti();
    } else {
      playChime(440, "sine", 0.3);
    }
    setIsOpened(!isOpened);
  };

  return (
    <section
      id="gift"
      className="relative min-h-screen py-28 px-4 sm:px-6 flex flex-col justify-between items-center text-center overflow-hidden bg-night-950 select-none z-10"
    >
      {/* Background Lighting Shift */}
      <div
        aria-hidden="true"
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full pointer-events-none blur-[160px] transition-all duration-1000 ${
          isOpened ? "opacity-45 bg-radial-gradient from-rose-400/35 via-lavender-300/20 to-transparent" : "opacity-15 bg-rose-500/10"
        }`}
      />

      {/* Floating Heart Particles Overlay */}
      <AnimatePresence>
        {isOpened && (
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: "100vh",
                  x: `${(i - 6) * 12 + Math.random() * 10}vw`,
                  scale: Math.random() * 0.6 + 0.6,
                }}
                animate={{
                  opacity: [0, 0.7, 0],
                  y: "-10vh",
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeOut",
                }}
                className="absolute text-rose-300/40"
              >
                <Heart className="w-6 h-6 fill-current" />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="h-10" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center my-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Eyebrow className="text-rose-200/70">
            {isOpened ? "Grand Finale Video" : "One Final Secret"}
          </Eyebrow>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="pre-unwrap-text"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="mt-2 text-center"
            >
              <p className="font-serif italic text-2xl sm:text-3xl text-rose-100/70 font-light">
                One final thing.
              </p>
              <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-cream-100">
                I saved something for you.
              </h2>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Interactive Gift Container */}
        <div className="mt-10 w-full flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!isOpened ? (
              <motion.div
                key="gift-box-closed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.06, rotate: 2 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleUnwrap}
                  className="cursor-pointer relative w-56 h-56 sm:w-64 sm:h-64 editorial-card rounded-3xl p-6 flex flex-col items-center justify-center border-rose-300/30 shadow-editorial hover:border-rose-300/60 hover:shadow-subtle-glow transition-all duration-500 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-rose-400/20 via-lavender-300/10 to-transparent rounded-3xl" />

                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : { y: [-6, 6, -6], rotate: [-2, 2, -2] }
                    }
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 text-rose-200 group-hover:scale-110 transition-transform duration-300"
                  >
                    <Gift className="w-24 h-24 sm:w-28 sm:h-28 text-rose-300 drop-shadow-[0_0_20px_rgba(244,172,183,0.4)]" />
                  </motion.div>

                  <span className="relative z-10 mt-4 text-xs font-mono uppercase tracking-[0.2em] text-rose-200/80">
                    Tap to unwrap video
                  </span>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUnwrap}
                  className="mt-8 btn-primary text-xs sm:text-sm font-semibold px-8 py-4 cursor-pointer min-h-[48px] touch-manipulation"
                >
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span>Unwrap Final Surprise</span>
                </motion.button>
              </motion.div>
            ) : (
              /* State 2: Embedded Video Experience */
              <motion.div
                key="gift-box-opened"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 15 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-2xl editorial-card rounded-3xl p-4 sm:p-8 border border-rose-300/40 shadow-editorial flex flex-col items-center text-center"
              >
                {/* Embedded Video Frame */}
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-night-900 border border-white/10 shadow-editorial mb-6 flex items-center justify-center">
                  {!videoError ? (
                    <video
                      controls
                      playsInline
                      preload="auto"
                      onError={() => setVideoError(true)}
                      className="w-full h-full object-cover rounded-2xl"
                    >
                      <source src="/videos/surprise.mp4" type="video/mp4" />
                    </video>
                  ) : (
                    /* Video Asset Placeholder instructions if surprise.mp4 not added yet */
                    <div className="p-8 flex flex-col items-center justify-center text-center">
                      <div className="w-14 h-14 rounded-full bg-rose-400/20 border border-rose-300/30 flex items-center justify-center text-rose-300 mb-3">
                        <Film className="w-7 h-7" />
                      </div>
                      <h4 className="font-serif font-semibold text-xl text-cream-100">
                        Surprise Video Placeholder
                      </h4>
                      <p className="mt-2 text-xs text-rose-200/70 max-w-sm font-mono">
                        Place your video file at <br />
                        <span className="text-amber-300 font-bold">/public/videos/surprise.mp4</span>
                      </p>
                    </div>
                  )}
                </div>

                <motion.h3
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="font-serif font-bold text-2xl sm:text-4xl tracking-tight leading-snug gradient-text-rose"
                >
                  HAPPY BIRTHDAY!
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="mt-2 font-serif italic text-sm sm:text-lg text-cream-100/90 font-light"
                >
                  Here&apos;s to another year of being completely unforgettable.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleUnwrap}
                  className="mt-6 btn-secondary text-xs px-5 py-2.5 flex items-center gap-2 min-h-[44px]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Wrap video again</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Final Small Signoff Message */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
        className="relative z-10 pt-10 text-center"
      >
        <p className="font-serif italic text-sm text-rose-200/70 tracking-wide">
          Made especially for you. ♡
        </p>
      </motion.div>
    </section>
  );
};
