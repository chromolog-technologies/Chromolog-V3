import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Accordion({ items, allowMultiple = false, className = "" }) {
  const [openIndexes, setOpenIndexes] = useState([]);

  const handleToggle = (index) => {
    if (allowMultiple) {
      if (openIndexes.includes(index)) {
        setOpenIndexes(openIndexes.filter((i) => i !== index));
      } else {
        setOpenIndexes([...openIndexes, index]);
      }
    } else {
      setOpenIndexes(openIndexes.includes(index) ? [] : [index]);
    }
  };

  return (
    <div className={`space-y-3 w-full ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div
            key={index}
            className="border border-white/[0.06] rounded-xl overflow-hidden bg-white/[0.02] backdrop-blur-md transition-all duration-300 hover:border-white/[0.12]"
          >
            <button
              onClick={() => handleToggle(index)}
              className="w-full flex items-center justify-between p-5 text-left font-heading font-semibold text-white/90 hover:text-white transition-colors duration-300 focus:outline-none"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={`w-5 h-5 text-muted-text transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-white" : ""
                }`}
              />
            </button>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="p-5 pt-0 text-muted-text text-sm leading-relaxed border-t border-white/[0.04]">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
