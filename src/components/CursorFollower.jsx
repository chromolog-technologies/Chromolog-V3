import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInput, setIsInput] = useState(false);

  // Motion values for smooth cursor tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring configuration for smooth drag lag (trailing effect)
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on touch screens/mobile
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Event listeners to handle expand states on buttons and links
    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("clickable") ||
        target.getAttribute("role") === "button";
      
      const isInputField =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("input") ||
        target.closest("textarea");

      setIsHovered(!!isClickable);
      setIsInput(!!isInputField);
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible, cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Sharp Inner Dot */}
      <motion.div
        style={{
          position: "fixed",
          left: cursorX,
          top: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 10000,
        }}
        animate={{
          width: isHovered ? 4 : isInput ? 2 : 8,
          height: isHovered ? 4 : isInput ? 16 : 8,
          backgroundColor: isHovered ? "#00e5ff" : "#f8fafc",
          borderRadius: isInput ? "2px" : "50%",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />

      {/* Trailing Soft Glowing Ring */}
      <motion.div
        style={{
          position: "fixed",
          left: trailX,
          top: trailY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
          borderRadius: "50%",
          mixBlendMode: "screen",
        }}
        animate={{
          width: isHovered ? 56 : isInput ? 32 : 28,
          height: isHovered ? 56 : isInput ? 32 : 28,
          backgroundColor: isHovered ? "rgba(0, 229, 255, 0.12)" : "rgba(79, 70, 229, 0.08)",
          border: isHovered ? "1px solid rgba(0, 229, 255, 0.4)" : "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: isHovered 
            ? "0 0 20px rgba(0, 229, 255, 0.3), inset 0 0 10px rgba(0, 229, 255, 0.2)" 
            : "0 0 12px rgba(79, 70, 229, 0.1)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* Ambient Large Follow Light */}
      <motion.div
        style={{
          position: "fixed",
          left: trailX,
          top: trailY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9998,
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 229, 255, 0.04) 0%, rgba(79, 70, 229, 0.01) 50%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </>
  );
}
