import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind class names safely
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates remaining time until target birthday date
 */
export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
}

export function calculateTimeLeft(targetDateStr?: string): TimeLeft {
  // Default to a celebratory date if not specified
  const now = new Date();
  const currentYear = now.getFullYear();
  
  // Set target date (e.g. October 15th or customizable)
  const target = targetDateStr 
    ? new Date(targetDateStr)
    : new Date(currentYear, 9, 15); // Month is 0-indexed, 9 = Oct

  // If birthday already passed this year, point to next year
  if (now > target && target.toDateString() !== now.toDateString()) {
    target.setFullYear(currentYear + 1);
  }

  const diff = target.getTime() - now.getTime();
  const isToday = now.toDateString() === target.toDateString();

  if (diff <= 0 || isToday) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isToday: false,
  };
}

/**
 * Plays a soft chime effect using Web Audio API (no external asset needed)
 */
export function playChime(freq: number = 523.25, type: OscillatorType = "sine", duration: number = 0.8) {
  if (typeof window === "undefined") return;

  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Soft envelope
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.error("Audio playback error:", e);
  }
}

/**
 * Generates random number within range
 */
export function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
