"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "rose" | "gold" | "purple";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  icon,
  variant = "rose",
  className,
}) => {
  const variantStyles = {
    rose: "bg-rose-500/10 text-rose-200 border-rose-300/20 shadow-subtle-glow",
    gold: "bg-amber-500/10 text-amber-200 border-amber-300/20 shadow-subtle-glow",
    purple: "bg-lavender-400/10 text-lavender-200 border-lavender-300/20 shadow-subtle-glow",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      {icon && <span className="text-current opacity-90">{icon}</span>}
      <span>{children}</span>
    </div>
  );
};
