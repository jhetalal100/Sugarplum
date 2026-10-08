"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eyebrow, SectionHeading } from "@/components/ui/Typography";
import { memoriesData } from "@/data/memoriesData";
import { MemoryCard } from "./MemoryCard";
import { MemoryLightbox } from "./MemoryLightbox";

export const MemoriesSection: React.FC = () => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const handleOpenLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setActiveLightboxIndex(null);
  };

  return (
    <section
      id="memories"
      className="relative min-h-screen py-28 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden bg-night-950 select-none z-10"
    >
      {/* Subtle Atmospheric Light */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none blur-[150px] opacity-15 bg-radial-gradient from-rose-500/20 via-lavender-400/10 to-transparent animate-pulse-subtle"
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Eyebrow className="text-rose-200/70">
            Happy space
          </Eyebrow>
        </motion.div>

        {/* Section Heading & Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SectionHeading
            subtitle="Some memories deserve their own little corner."
          >
            Little moments.
          </SectionHeading>
        </motion.div>

        {/* Desktop Asymmetrical Editorial Composition (Hidden on Mobile) */}
        <div className="mt-16 hidden md:grid grid-cols-12 gap-6 w-full">
          {/* Card 1: Tall item (Left column, span 4) */}
          <div className="col-span-4 h-[440px]">
            <MemoryCard
              memory={memoriesData[0]}
              onClick={() => handleOpenLightbox(0)}
              className="h-full"
            />
          </div>

          {/* Center Column (span 5): Stacked Square & Wide */}
          <div className="col-span-5 flex flex-col gap-6 h-[440px]">
            <div className="h-[205px]">
              <MemoryCard
                memory={memoriesData[1]}
                onClick={() => handleOpenLightbox(1)}
                className="h-full"
              />
            </div>
            <div className="h-[210px]">
              <MemoryCard
                memory={memoriesData[2]}
                onClick={() => handleOpenLightbox(2)}
                className="h-full"
              />
            </div>
          </div>

          {/* Right Column (span 3): Stacked Square & Tall */}
          <div className="col-span-3 flex flex-col gap-6 h-[440px]">
            <div className="h-[180px]">
              <MemoryCard
                memory={memoriesData[3]}
                onClick={() => handleOpenLightbox(3)}
                className="h-full"
              />
            </div>
            <div className="h-[235px]">
              <MemoryCard
                memory={memoriesData[4]}
                onClick={() => handleOpenLightbox(4)}
                className="h-full"
              />
            </div>
          </div>
        </div>

        {/* Mobile Clean Vertical Stacked Layout */}
        <div className="mt-12 flex flex-col gap-6 md:hidden w-full">
          {memoriesData.map((mem, idx) => (
            <div key={mem.id} className="h-72 w-full">
              <MemoryCard
                memory={mem}
                onClick={() => handleOpenLightbox(idx)}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Interactive Lightbox Experience */}
      <MemoryLightbox
        items={memoriesData}
        currentIndex={activeLightboxIndex}
        onClose={handleCloseLightbox}
        onNavigate={(idx) => setActiveLightboxIndex(idx)}
      />
    </section>
  );
};
