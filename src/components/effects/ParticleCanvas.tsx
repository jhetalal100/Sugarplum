"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  color: string;
  pulseSpeed: number;
}

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Warm, atmospheric colors matching new visual identity
    const colors = [
      "rgba(244, 172, 183, ", // Soft Pink
      "rgba(216, 140, 154, ", // Dusty Rose
      "rgba(224, 170, 255, ", // Lavender
      "rgba(248, 244, 233, ", // Warm Cream
    ];

    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 22000), 50);

    for (let i = 0; i < particleCount; i++) {
      const maxOp = Math.random() * 0.4 + 0.1;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.4,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2 - 0.05,
        opacity: Math.random() * maxOp,
        maxOpacity: maxOp,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.01 + 0.003,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        p.opacity += p.pulseSpeed;
        if (p.opacity > p.maxOpacity || p.opacity < 0.02) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = `${p.color}0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-50"
    />
  );
};
