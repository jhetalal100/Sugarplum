"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export const Eyebrow: React.FC<EyebrowProps> = ({ children, className }) => {
  return (
    <span className={cn("eyebrow-text block mb-2", className)}>
      {children}
    </span>
  );
};

interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  children,
  subtitle,
  className,
  align = "center",
}) => {
  const alignment = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <div className={cn("flex flex-col max-w-2xl mx-auto", alignment[align], className)}>
      <h2 className="section-heading tracking-tight">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-rose-200/70 font-light leading-relaxed max-w-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
};
