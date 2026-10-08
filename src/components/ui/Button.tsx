"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn, playChime } from "@/lib/utils";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "glass" | "ghost";
  size?: "sm" | "md" | "lg";
  playSound?: boolean;
  soundFreq?: number;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  playSound = true,
  soundFreq = 587.33,
  className,
  type = "button",
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (playSound) {
      playChime(soundFreq, "sine", 0.35);
    }
    if (onClick) {
      onClick(e);
    }
  };

  const baseStyles = "relative inline-flex items-center justify-center font-sans tracking-wide transition-all duration-300 rounded-full select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-night-950";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs gap-1.5 font-medium min-h-[36px]",
    md: "px-6 py-3 text-xs sm:text-sm gap-2 font-semibold min-h-[44px]",
    lg: "px-8 py-3.5 text-sm sm:text-base gap-2.5 font-semibold min-h-[48px]",
  };

  const variantStyles = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    glass: "glass-surface text-rose-100 hover:text-white rounded-full px-6 py-3 text-xs font-medium border-white/10",
    ghost: "text-rose-200/80 hover:text-white hover:bg-white/5 text-xs font-medium rounded-full px-4 py-2",
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};
