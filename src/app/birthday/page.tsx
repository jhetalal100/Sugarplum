import React from "react";
import { Hero } from "@/components/hero/Hero";
import { RevealSection } from "@/components/reveal/RevealSection";
import { StickerBoard } from "@/components/stickers/StickerBoard";
import { MemoriesSection } from "@/components/memories/MemoriesSection";
import { LetterSection } from "@/components/letter/LetterSection";
import { GiftSection } from "@/components/gift/GiftSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-night-950">
      <Hero />
      <div className="hairline-divider" />
      <RevealSection />
      <div className="hairline-divider" />
      <StickerBoard />
      <div className="hairline-divider" />
      <MemoriesSection />
      <div className="hairline-divider" />
      <LetterSection />
      <div className="hairline-divider" />
      <GiftSection />
    </div>
  );
}
