import React from "react";
import { motion } from "framer-motion";

export default function Timeline({ items, className = "" }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={`relative border-l border-white/[0.08] ml-4 md:ml-6 space-y-8 py-2 ${className}`}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="relative pl-8 md:pl-10"
        >
          {/* Marker Dot */}
          <div className="absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full bg-bg-dark border-2 border-primary flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          </div>

          {/* Time/Step Badge */}
          {item.badge && (
            <span className="inline-block px-2.5 py-0.5 mb-2 text-[10px] font-bold tracking-wider uppercase bg-primary/10 border border-primary/20 text-primary rounded-full font-heading">
              {item.badge}
            </span>
          )}

          {/* Content Card */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-colors duration-300 shadow-lg">
            <h4 className="text-base font-heading font-bold text-white mb-1.5">{item.title}</h4>
            <p className="text-muted-text text-sm leading-relaxed">{item.description}</p>
            {item.details && (
              <div className="mt-3 text-xs text-muted-text/80">{item.details}</div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
