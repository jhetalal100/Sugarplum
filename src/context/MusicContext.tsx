"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface MusicContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  hasError: boolean;
  startMusic: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (val: number) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.4);
  const [hasError, setHasError] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Create single HTMLAudioElement instance safely
    const audio = new Audio("/music/birthday.mp3");
    audio.loop = true;
    audio.volume = volume;

    const handleCanPlay = () => {
      setHasError(false);
    };

    const handleError = () => {
      // Gracefully catch missing audio asset without throwing uncaught exceptions
      setHasError(true);
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);

    audioRef.current = audio;

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const startMusic = () => {
    if (!audioRef.current || hasError) return;

    audioRef.current.volume = volume;
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsInitialized(true);
        setHasError(false);
      })
      .catch((err) => {
        console.log("Audio play failed or file missing:", err);
        setHasError(true);
        setIsPlaying(false);
      });
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = volume;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsInitialized(true);
          setHasError(false);
        })
        .catch(() => {
          setHasError(true);
          setIsPlaying(false);
        });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuteState = !isMuted;
    audioRef.current.muted = newMuteState;
    setIsMuted(newMuteState);
  };

  const setVolume = (val: number) => {
    if (!audioRef.current) return;
    const clamped = Math.max(0, Math.min(1, val));
    audioRef.current.volume = clamped;
    setVolumeState(clamped);
    if (clamped === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        hasError,
        startMusic,
        togglePlay,
        toggleMute,
        setVolume,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
