import React from "react";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs({ items, className = "" }) {
  return (
    <nav className={`flex items-center space-x-2 text-sm text-muted-text select-none font-heading ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1.5 md:space-x-2">
        <li className="inline-flex items-center">
          <a
            href="#"
            className="inline-flex items-center text-muted-text hover:text-white transition-colors duration-300 gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </a>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="inline-flex items-center">
              <ChevronRight className="w-4 h-4 text-white/20 mx-1" aria-hidden="true" />
              {isLast ? (
                <span className="text-white font-semibold" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href || "#"}
                  className="text-muted-text hover:text-white transition-colors duration-300"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
