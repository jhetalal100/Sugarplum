"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Sparkles, KeyRound, Lock } from "lucide-react";
import { Eyebrow, SectionHeading } from "@/components/ui/Typography";
import { birthdayLetterContent } from "@/data/letterData";
import { LetterCard } from "./LetterCard";
import { triggerCelebrationConfetti } from "@/lib/animations";
import { playChime } from "@/lib/utils";

export const LetterSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const [pinError, setPinError] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const CORRECT_PIN = "3001";

  const handleUnsealClick = () => {
    if (isOpen) {
      setIsOpen(false);
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

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    const fullPin = newPin.join("");
    if (fullPin.length === 4) {
      if (fullPin === CORRECT_PIN) {
        setIsOpen(true);
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
      id="letter"
      className="relative min-h-screen py-28 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden bg-night-950 select-none z-10"
    >
      {/* Background Soft Backlight Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none blur-[150px] opacity-15 bg-radial-gradient from-rose-400/20 via-lavender-300/10 to-transparent animate-pulse-subtle"
      />

      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center text-center">
        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Eyebrow className="text-rose-200/70">
            For Your Eyes Only
          </Eyebrow>
        </motion.div>

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SectionHeading
            subtitle="A quiet space dedicated to words that were meant to be written down."
          >
            Dear Bestfriend,
          </SectionHeading>
        </motion.div>

        {/* Envelope & Letter Container */}
        <div className="mt-12 w-full flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Sealed Envelope View */
              <motion.div
                key="sealed-envelope"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="editorial-card rounded-3xl p-8 sm:p-12 max-w-lg w-full border border-rose-300/30 hover:border-rose-300/50 shadow-editorial hover:shadow-subtle-glow transition-all duration-300 flex flex-col items-center group relative overflow-hidden"
              >

                {!showPinModal ? (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 4 }}
                      className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-300 via-rose-200 to-lavender-200 flex items-center justify-center text-night-950 shadow-subtle-glow mb-6 cursor-pointer"
                      onClick={handleUnsealClick}
                    >
                      <Mail className="w-9 h-9" />
                    </motion.div>

                    <h3 className="font-serif font-bold text-2xl text-cream-100 group-hover:text-rose-200 transition-colors">
                      {birthdayLetterContent.greeting}
                    </h3>

                    <p className="mt-2 text-xs text-rose-200/60 font-mono tracking-wider uppercase">
                      Enter 4-Digit PIN to unseal letter ✉️
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleUnsealClick}
                      className="mt-6 btn-primary text-xs px-6 py-3 flex items-center gap-2 min-h-[44px] touch-manipulation cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 fill-current" />
                      <span>Unseal Letter</span>
                    </motion.button>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center max-w-sm w-full py-2"
                  >
                    <div className="w-12 h-12 rounded-full bg-amber-400/20 border border-amber-300/30 flex items-center justify-center text-amber-300 mb-4">
                      <KeyRound className="w-6 h-6" />
                    </div>

                    <h3 className="font-serif font-semibold text-xl text-cream-100 mb-1">
                      Hope you remember mine
                    </h3>

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
                        Na date gurthu ledha niku?🥲
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
              /* Opened Warm Cream Letter Card View */
              <motion.div
                key="opened-letter"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-5xl mx-auto flex flex-col items-center relative"
              >
                <LetterCard content={birthdayLetterContent} />

                {/* External Letter Attachment Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 6 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="hidden lg:block absolute -right-24 xl:-right-40 top-32 w-48 h-64 xl:w-56 xl:h-72 border-[8px] border-[#FDFBF7] shadow-2xl rounded-sm overflow-hidden z-20 hover:rotate-0 transition-transform duration-500"
                >
                  <img
                    src="/images/letter_image.png"
                    alt="Letter attachment"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  onClick={handleUnsealClick}
                  className="mt-8 btn-secondary text-xs px-5 py-2.5 flex items-center gap-2 min-h-[44px]"
                >
                  <span>Fold it back ✉️</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
