"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles, RotateCcw, Lock, Unlock, KeyRound, Check } from "lucide-react";
import { Eyebrow } from "@/components/ui/Typography";
import { triggerCelebrationConfetti } from "@/lib/animations";
import { playChime } from "@/lib/utils";

export const RevealSection: React.FC = () => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [pinError, setPinError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const shouldReduceMotion = useReducedMotion();

  const CORRECT_PIN = "1910";

  const handleOpenClick = () => {
    if (isUnlocked) {
      setIsUnlocked(false);
      setShowPinModal(false);
      setPin(["", "", "", ""]);
      playChime(440, "sine", 0.3);
      return;
    }
    setShowPinModal(true);
    playChime(523.25, "sine", 0.4);
    setTimeout(() => inputRefs[0].current?.focus(), 100);
  };

  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setPinError(false);

    // Auto-advance input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // Auto-check when all 4 digits entered
    const fullPin = newPin.join("");
    if (fullPin.length === 4) {
      if (fullPin === CORRECT_PIN) {
        setIsUnlocked(true);
        setShowPinModal(false);
        playChime(659.25, "sine", 0.6);
        triggerCelebrationConfetti();
      } else {
        setPinError(true);
        playChime(220, "sawtooth", 0.4);
        setTimeout(() => {
          setPin(["", "", "", ""]);
          inputRefs[0].current?.focus();
        }, 500);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <section
      id="reveal"
      className="relative min-h-[90vh] py-28 px-4 sm:px-6 flex flex-col justify-center items-center text-center overflow-hidden bg-night-950 z-10 select-none"
    >
      {/* Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[650px] h-[480px] sm:h-[650px] rounded-full pointer-events-none blur-[140px] transition-opacity duration-1000 ${isUnlocked ? "opacity-35 bg-rose-400/25" : "opacity-15 bg-lavender-400/15"
          }`}
      />

      <div className="relative z-10 max-w-3xl mx-auto w-full flex flex-col items-center">
        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Eyebrow className="text-rose-200/70">
            {isUnlocked ? "Secret Unlocked" : "Protected Secret"}
          </Eyebrow>
        </motion.div>

        {/* Initial Header Text */}
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="unrevealed-text"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="mt-2"
            >
              <p className="font-serif italic text-2xl sm:text-3xl text-rose-100/70 font-light">
                Okay...
              </p>
              <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-cream-100">
                There&apos;s something waiting for you.
              </h2>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Main Card Container */}
        <motion.div
          layout
          transition={
            shouldReduceMotion
              ? { duration: 0.2 }
              : { type: "spring", stiffness: 180, damping: 22 }
          }
          className={`mt-10 w-full editorial-card rounded-3xl p-8 sm:p-12 relative overflow-hidden transition-all duration-700 ${isUnlocked
            ? "border-rose-300/40 shadow-subtle-glow bg-night-850/90"
            : "border-white/10 shadow-editorial hover:border-rose-300/30"
            }`}
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            {!isUnlocked ? (
              <motion.div
                key="box-closed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center py-4"
              >
                {!showPinModal ? (
                  /* Initial Lock View */
                  <>
                    <motion.div
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : { y: [-6, 6, -6], rotate: [-2, 2, -2] }
                      }
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-rose-400/20 via-rose-300/10 to-lavender-300/20 border border-rose-300/30 flex items-center justify-center text-rose-200 shadow-subtle-glow mb-8 group cursor-pointer"
                      onClick={handleOpenClick}
                    >
                      <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-rose-200 group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleOpenClick}
                      className="btn-primary group text-xs sm:text-sm font-semibold px-8 py-4 cursor-pointer min-h-[48px] touch-manipulation"
                    >
                      <Sparkles className="w-4 h-4 fill-current" />
                      <span>Open it</span>
                    </motion.button>
                  </>
                ) : (
                  /* 4-Digit PIN Input Form (PIN: 1910) */
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center max-w-sm w-full"
                  >
                    <div className="w-12 h-12 rounded-full bg-rose-400/20 border border-rose-300/30 flex items-center justify-center text-rose-300 mb-4">
                      <KeyRound className="w-6 h-6" />
                    </div>

                    <h3 className="font-serif font-semibold text-xl text-cream-100 mb-1">
                      Enter 4-Digit PIN
                    </h3>
                    <p className="text-xs text-rose-200/60 mb-6 font-mono">
                      PIN required to unlock message
                    </p>

                    {/* PIN Boxes */}
                    <div className="flex gap-3 mb-4">
                      {pin.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={inputRefs[idx]}
                          type="password"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handlePinChange(idx, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(idx, e)}
                          className={`w-12 h-14 text-center font-mono font-bold text-2xl rounded-xl bg-night-950 border transition-all duration-300 text-cream-100 focus:outline-none focus:ring-2 ${pinError
                            ? "border-red-500/80 focus:ring-red-500 animate-bounce"
                            : "border-white/15 focus:border-rose-300 focus:ring-rose-300/40"
                            }`}
                        />
                      ))}
                    </div>

                    {pinError && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-red-400 font-medium mb-3"
                      >
                        Incorrect PIN. Try again!
                      </motion.span>
                    )}

                    <button
                      onClick={() => setShowPinModal(false)}
                      className="text-xs text-rose-300/60 hover:text-rose-200 mt-2 font-mono"
                    >
                      Cancel
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              /* State 2: Unlocked Message View */
              <motion.div
                key="box-opened"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center py-4"
              >
                <div className="w-14 h-14 rounded-full bg-rose-400/20 border border-rose-300/40 flex items-center justify-center text-rose-200 mb-6 shadow-subtle-glow">
                  <Unlock className="w-6 h-6 text-rose-300" />
                </div>

                <motion.h3
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="font-serif font-bold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none gradient-text-rose drop-shadow-[0_0_25px_rgba(244,172,183,0.3)]"
                >
                  HAPPY BIRTHDAY MADAM!
                </motion.h3>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="mt-6 max-w-lg text-sm sm:text-base md:text-lg text-rose-100/80 font-light leading-relaxed space-y-2"
                >
                  <p className="font-serif italic text-rose-200/90 text-lg sm:text-xl">
                    And yes...
                  </p>
                  <p className="text-cream-100 font-normal">
                    this entire website is made only for you because you&apos;re worth it.
                  </p>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleOpenClick}
                  className="mt-8 btn-secondary text-xs px-5 py-2.5 flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Lock again</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
