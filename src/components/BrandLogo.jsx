import { useState } from "react";
import logoSrc from "../../images/chromologlogo.webp";

export default function BrandLogo({ className = "h-12 w-auto", compact = false }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white font-heading font-extrabold shadow-lg shadow-primary/20 ${compact ? "h-10 w-10 text-sm" : "h-12 w-12 text-base"} ${className.includes("h-") ? "" : className}`}
        aria-label="Chromolog Technologies logo"
      >
        CT
      </span>
    );
  }

  return (
    <img
      className={`${className} object-contain shrink-0 transition-transform duration-500 group-hover:scale-103 rounded-lg`}
      src={logoSrc}
      alt="Chromolog Technologies logo"
      width={compact ? 40 : 48}
      height={compact ? 40 : 48}
      loading={compact ? "lazy" : "eager"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
