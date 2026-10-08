"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useMusic } from "@/context/MusicContext";

export const FloatingMusicControl: React.FC = () => {
  const { isPlaying, isMuted, volume, hasError, togglePlay, toggleMute, setVolume } = useMusic();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  if (hasError) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 select-none touch-manipulation"
    >
      <div className="glass-surface rounded-full px-3 py-1.5 sm:px-3.5 sm:py-2 flex items-center gap-2 shadow-subtle-glass border border-white/10 backdrop-blur-xl">
        {/* Equalizer Visualizer Bars */}
        <div className="flex items-center gap-0.5 h-3 px-0.5">
          {[0.6, 1, 0.4].map((scale, i) => (
            <motion.span
              key={i}
              animate={isPlaying && !isMuted ? { height: ["3px", "12px", "3px"] } : { height: "3px" }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
              className="w-0.5 bg-rose-300 rounded-full"
            />
          ))}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause soundtrack" : "Play soundtrack"}
          className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-rose-400/20 text-rose-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer min-h-[32px]"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
        </button>

        {/* Mute Button & Slider */}
        <div
          className="relative flex items-center"
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
        >
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
            className="w-8 h-8 sm:w-7 sm:h-7 rounded-full text-rose-200/70 hover:text-rose-100 flex items-center justify-center transition-colors cursor-pointer min-h-[32px]"
          >
            {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Hover Volume Slider */}
          <AnimatePresence>
            {showVolumeSlider && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 56 }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden flex items-center px-1 hidden sm:flex"
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-12 h-1 accent-rose-300 bg-white/20 rounded-lg cursor-pointer"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
