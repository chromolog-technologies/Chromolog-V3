import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import BrandLogo from "./BrandLogo";

export default function PageLoader({ onComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Particle nodes
    const nodes = Array.from({ length: 48 }, (_, i) => {
      const angle = (i / 48) * Math.PI * 2;
      const r = 80 + Math.random() * 140;
      return {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
        tx: cx + r * Math.cos(angle),
        ty: cy + r * Math.sin(angle),
        startX: cx + (Math.random() - 0.5) * canvas.width,
        startY: cy + (Math.random() - 0.5) * canvas.height,
        progress: 0,
        size: 1 + Math.random() * 2,
        alpha: 0,
        color: Math.random() > 0.6 ? "#00e5ff" : Math.random() > 0.5 ? "#4f46e5" : "#7c3aed",
      };
    });

    let frameId;
    let startTime = null;
    const duration = 1800;

    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    function draw(ts) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const t = Math.min(elapsed / duration, 1);
      const progress = easeOut(t);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100 && a.alpha > 0.2) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(79, 70, 229, ${(a.alpha * 0.15) * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        n.alpha = Math.min(1, n.alpha + 0.015);
        n.x = n.startX + (n.tx - n.startX) * progress;
        n.y = n.startY + (n.ty - n.startY) * progress;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = n.color + Math.floor(n.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });

      if (t < 1) {
        frameId = requestAnimationFrame(draw);
      }
    }

    frameId = requestAnimationFrame(draw);

    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2400);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-[#050816] flex items-center justify-center overflow-hidden"
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Center logo area */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Logo glow */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="relative"
        >
          <div className="absolute inset-0 blur-[40px] bg-accent/30 rounded-full scale-125" />
          <BrandLogo className="relative w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-2xl" />
        </motion.div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <p className="text-white font-heading font-extrabold text-xl tracking-wide">Chromolog</p>
          <p className="text-accent/70 font-body text-xs tracking-[0.3em] uppercase mt-0.5">Technologies</p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="w-32 h-px bg-white/[0.06] rounded-full overflow-hidden mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, delay: 0.9, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
