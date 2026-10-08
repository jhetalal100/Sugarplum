"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  glowOnHover?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  glowOnHover = true,
  className,
  ...props
}) => {
  return (
    <motion.div
      whileHover={glowOnHover ? { y: -3, transition: { duration: 0.3 } } : undefined}
      className={cn(
        "glass-surface rounded-2xl p-6 relative overflow-hidden transition-all duration-300",
        glowOnHover && "glass-surface-hover",
        className
      )}
      {...props}
    >
      {/* Soft atmospheric ambient glow inside card */}
      <div className="absolute -top-24 -right-24 w-44 h-44 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-44 h-44 bg-lavender-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
