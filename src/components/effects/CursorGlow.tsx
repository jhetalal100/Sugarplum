"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CursorGlow: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only initialize desktop cursor glow
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updateMousePosition);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed pointer-events-none z-30 w-[420px] h-[420px] rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-25 transition-opacity duration-700 hidden md:block"
      style={{
        background: "radial-gradient(circle, rgba(244, 172, 183, 0.25) 0%, rgba(224, 170, 255, 0.12) 40%, rgba(10, 7, 13, 0) 70%)",
        left: mousePosition.x,
        top: mousePosition.y,
      }}
      animate={{
        scale: [1, 1.04, 1],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};
