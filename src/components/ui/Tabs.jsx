import React from "react";
import { motion } from "framer-motion";

export default function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = "pill",
  className = "",
}) {
  return (
    <div
      className={`flex space-x-1 p-1 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-xl ${
        variant === "underline" ? "border-b border-t-0 border-x-0 rounded-none bg-transparent" : ""
      } ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition-colors duration-300 focus:outline-none select-none font-heading ${
              isActive ? "text-white" : "text-muted-text hover:text-white/80"
            } ${variant === "underline" ? "rounded-none" : ""}`}
          >
            {/* Slide active effect */}
            {isActive && variant === "pill" && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-lg -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            
            {isActive && variant === "underline" && (
              <motion.div
                layoutId="active-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}

            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
