"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eyebrow, SectionHeading } from "@/components/ui/Typography";
import { catStickersData } from "@/data/stickersData";
import { Sticker } from "./Sticker";

export const StickerBoard: React.FC = () => {
  return (
    <section
      id="stickers"
      className="relative min-h-[90vh] py-28 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden bg-night-950 select-none z-10"
    >
      {/* Ambient Radial Backlight Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full pointer-events-none blur-[140px] opacity-15 bg-radial-gradient from-rose-400/20 via-lavender-300/10 to-transparent animate-pulse-subtle"
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Eyebrow className="text-rose-200/70">
            Special Guests
          </Eyebrow>
        </motion.div>

        {/* Central Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SectionHeading
            subtitle="Tap any sticker to hear what the committee has to say."
          >
            The birthday committee has arrived.
          </SectionHeading>
        </motion.div>

        {/* Desktop Asymmetrical Floating Sticker Board (Non-overlapping container) */}
        <div className="relative mt-16 h-[900px] max-w-5xl mx-auto w-full hidden lg:block">
          {catStickersData.map((stk) => (
            <Sticker
              key={stk.id}
              src={stk.src}
              alt={stk.alt}
              initialMessage={stk.initialMessage}
              position={stk.position}
              rotation={stk.rotation}
              scale={stk.scale}
              animation={stk.animationType}
              delay={stk.delay}
              speechBubblePosition={stk.speechBubblePosition}
            />
          ))}
        </div>

        {/* Mobile & Tablet Clean Responsive Grid Composition (No overlap) */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-y-16 gap-x-6 lg:hidden w-full px-2">
          {catStickersData.map((stk, idx) => (
            <div key={stk.id} className="flex justify-center items-center py-2">
              <Sticker
                src={stk.src}
                alt={stk.alt}
                initialMessage={stk.initialMessage}
                rotation={stk.rotation}
                scale={0.95}
                animation={stk.animationType}
                delay={idx * 0.08}
                speechBubblePosition="top"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
