import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./ui/Button";

export default function Header({ setActivePage, navigateToSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    setIsDrawerOpen(false);
    if (sectionId === "blog") {
      setActivePage("blog");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigateToSection(sectionId);
    }
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    setIsDrawerOpen(false);
    setActivePage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const menuItems = [
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Services", id: "services" },
    { label: "AI Capabilities", id: "ai" },
    { label: "Product", id: "product" },
    { label: "Process", id: "process" },
    { label: "Knowledge Hub", id: "blog" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-bg-dark/80 backdrop-blur-xl border-white/[0.08] py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            className="flex items-center group relative overflow-hidden select-none"
            href="#home"
            onClick={handleBrandClick}
            aria-label="Chromolog Home"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-purple-glow/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            <img
              className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-103 rounded-lg"
              src="images/chromologlogo.webp"
              alt="Chromolog Technologies logo"
            />
          </a>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Site sections">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className="relative px-4 py-2 text-sm font-heading font-semibold text-muted-text hover:text-white-text transition-colors duration-300 group"
              >
                <span>{item.label}</span>
                {/* Underline hover effect */}
                <span className="absolute bottom-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-primary to-accent transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          {/* Call to Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="#projects"
              onClick={(e) => handleLinkClick(e, "projects")}
              className="text-sm font-heading font-semibold text-white-text hover:text-accent transition-colors duration-300"
            >
              View Work
            </a>
            <Button
              variant="gradient"
              size="sm"
              onClick={(e) => handleLinkClick(e, "contact")}
            >
              Start a Project
            </Button>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex lg:hidden items-center space-x-4">
            <Button
              variant="gradient"
              size="sm"
              onClick={(e) => handleLinkClick(e, "contact")}
            >
              Start
            </Button>
            <button
              className="p-2 border border-white/10 hover:border-white/20 rounded-xl bg-white/[0.02] text-white hover:bg-white/[0.08] transition-all"
              aria-label="Toggle menu"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              {isDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 top-[77px] bg-black/60 backdrop-blur-md z-30 lg:hidden"
            />
            {/* Slide Down Menu */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 right-0 bg-bg-dark/95 border-b border-white/[0.08] z-30 lg:hidden overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-8 space-y-6 max-h-[80vh] overflow-y-auto">
                <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation">
                  {menuItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => handleLinkClick(e, item.id)}
                      className="flex items-center justify-between text-lg font-heading font-semibold text-muted-text hover:text-white-text py-2 border-b border-white/[0.04] transition-colors"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-4 h-4 text-muted-text/40" />
                    </a>
                  ))}
                </nav>
                <div className="flex flex-col space-y-3 pt-4">
                  <a
                    href="#projects"
                    onClick={(e) => handleLinkClick(e, "projects")}
                    className="w-full text-center py-3 text-base font-heading font-semibold border border-white/10 hover:border-white/20 rounded-xl hover:bg-white/[0.04] transition-all text-white"
                  >
                    View Work
                  </a>
                  <Button
                    variant="gradient"
                    size="md"
                    className="w-full"
                    onClick={(e) => handleLinkClick(e, "contact")}
                  >
                    Start a Project
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
