import React from "react";

export default function Badge({
  children,
  variant = "status",
  color = "primary",
  glow = true,
  className = "",
  ...props
}) {
  const baseBadge = "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full select-none font-heading tracking-wide border";
  
  const variants = {
    status: {
      primary: "bg-primary/10 border-primary/20 text-primary shadow-[0_0_8px_rgba(79,70,229,0.1)]",
      secondary: "bg-secondary/10 border-secondary/20 text-secondary shadow-[0_0_8px_rgba(6,182,212,0.1)]",
      success: "bg-success/10 border-success/20 text-success shadow-[0_0_8px_rgba(34,197,94,0.1)]",
      warning: "bg-warning/10 border-warning/20 text-warning shadow-[0_0_8px_rgba(245,158,11,0.1)]",
      error: "bg-error/10 border-error/20 text-error shadow-[0_0_8px_rgba(239,68,68,0.1)]",
    },
    new: "bg-accent/10 border-accent/25 text-accent animate-pulse",
    ai: "bg-gradient-to-r from-primary/10 to-purple-glow/10 border-purple-glow/30 text-purple-glow shadow-[0_0_12px_rgba(124,58,237,0.15)]",
    enterprise: "bg-white/5 border-white/10 text-white-text/80 hover:text-white-text hover:border-white/20 transition-all",
  };

  const getStyle = () => {
    if (variant === "status") {
      return variants.status[color] || variants.status.primary;
    }
    return variants[variant] || variants.status.primary;
  };

  return (
    <span
      className={`${baseBadge} ${getStyle()} ${className}`}
      {...props}
    >
      {/* Decorative dot indicator for status badges */}
      {variant === "status" && (
        <span className={`w-1.5 h-1.5 rounded-full bg-current ${glow ? 'animate-pulse' : ''}`} />
      )}
      
      {variant === "ai" && (
        <span className="text-[10px] uppercase font-bold tracking-wider mr-0.5">AI</span>
      )}

      {children}
    </span>
  );
}
