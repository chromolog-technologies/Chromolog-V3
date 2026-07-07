import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Tooltip({
  children,
  content,
  position = "top",
  className = "",
}) {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const anims = {
    top: { initial: { opacity: 0, y: 4, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 } },
    bottom: { initial: { opacity: 0, y: -4, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 } },
    left: { initial: { opacity: 0, x: 4, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 } },
    right: { initial: { opacity: 0, x: -4, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 } },
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={anims[position].initial}
            animate={anims[position].animate}
            exit={anims[position].initial}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`absolute z-40 ${positions[position]} whitespace-nowrap bg-surface-secondary border border-white/[0.08] text-white text-xs py-1.5 px-3 rounded-lg shadow-xl font-body font-semibold ${className}`}
          >
            {content}
            {/* Small Triangle Indicator */}
            <span
              className={`absolute w-1.5 h-1.5 bg-surface-secondary border-b border-r border-white/[0.08] rotate-45 ${
                position === "top"
                  ? "top-full left-1/2 -translate-x-1/2 -translate-y-1/2 border-t-0 border-l-0"
                  : position === "bottom"
                  ? "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 rotate-[225deg]"
                  : position === "left"
                  ? "left-full top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-[-45deg]"
                  : "right-full top-1/2 -translate-y-1/2 translate-x-1/2 rotate-[135deg]"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
