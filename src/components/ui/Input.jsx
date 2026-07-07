import React from "react";

// Standard Form Input
export function Input({ label, error, className = "", ...props }) {
  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label className="block text-xs font-semibold text-muted-text font-heading uppercase tracking-wide">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] text-white rounded-xl px-4 py-3 text-sm transition-all placeholder:text-muted-text/50 focus:border-primary/50 focus:bg-white/[0.04] focus:ring-2 focus:ring-primary/10 ${
          error ? "border-error/50 focus:border-error/50 focus:ring-error/10" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-error font-semibold mt-1">{error}</p>}
    </div>
  );
}

// Form Textarea
export function Textarea({ label, error, className = "", rows = 4, ...props }) {
  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label className="block text-xs font-semibold text-muted-text font-heading uppercase tracking-wide">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={`w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] text-white rounded-xl px-4 py-3 text-sm transition-all placeholder:text-muted-text/50 focus:border-primary/50 focus:bg-white/[0.04] focus:ring-2 focus:ring-primary/10 ${
          error ? "border-error/50 focus:border-error/50 focus:ring-error/10" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-error font-semibold mt-1">{error}</p>}
    </div>
  );
}

// Custom Select Dropdown
export function Select({ label, options = [], error, className = "", ...props }) {
  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label className="block text-xs font-semibold text-muted-text font-heading uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={`w-full appearance-none bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] text-white rounded-xl px-4 py-3 text-sm transition-all focus:border-primary/50 focus:bg-surface-secondary focus:ring-2 focus:ring-primary/10 ${
            error ? "border-error/50 focus:border-error/50 focus:ring-error/10" : ""
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-surface text-white">
              {opt.label}
            </option>
          ))}
        </select>
        {/* Dropdown arrow icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-text">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
      {error && <p className="text-xs text-error font-semibold mt-1">{error}</p>}
    </div>
  );
}

// Custom Toggle Switch
export function Toggle({ label, checked, onChange, className = "", ...props }) {
  return (
    <label className={`flex items-center space-x-3 cursor-pointer select-none ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
          {...props}
        />
        <div className={`w-10 h-6 bg-white/[0.06] rounded-full transition-all border border-white/[0.08] ${checked ? "bg-primary" : ""}`} />
        <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all transform ${checked ? "translate-x-4 bg-white-text" : ""}`} />
      </div>
      {label && <span className="text-sm font-semibold text-white/90">{label}</span>}
    </label>
  );
}
