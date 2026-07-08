import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./ui/Button";
import BrandLogo from "./BrandLogo";

const pageItems = new Set(["blog", "careers"]);

export default function Header({ activePage = "home", setActivePage, navigateToSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

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

  useEffect(() => {
    if (activePage !== "home") return undefined;

    const sectionIds = ["home", "about", "projects", "services", "ai", "product", "process", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { threshold: [0.35, 0.55, 0.75], rootMargin: "-18% 0px -35% 0px" }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [activePage]);

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    setIsDrawerOpen(false);
    if (pageItems.has(sectionId)) {
      setActivePage(sectionId);
      window.history.pushState({}, "", sectionId === "blog" ? "/blog" : "/careers");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.history.pushState({}, "", "/");
      navigateToSection(sectionId);
    }
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    setIsDrawerOpen(false);
    setActivePage("home");
    window.history.pushState({}, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const menuItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Services", id: "services" },
    { label: "AI Capabilities", id: "ai" },
    { label: "Products", id: "product" },
    { label: "Process", id: "process" },
    { label: "Knowledge Hub", id: "blog" },
    { label: "Careers", id: "careers" },
    { label: "Contact", id: "contact" },
  ];

  const isActive = (item) => {
    if (item.id === "blog" || item.id === "careers") return activePage === item.id;
    return activePage === "home" && activeSection === item.id;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-bg-dark/80 backdrop-blur-xl border-white/[0.08] py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 lg:gap-5">
          {/* Brand Logo */}
          <a
            className="flex items-center group relative overflow-hidden select-none min-w-0"
            href="#home"
            onClick={handleBrandClick}
            aria-label="Chromolog Home"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-purple-glow/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            <BrandLogo className="h-10 w-auto sm:h-11 lg:h-12 max-w-[156px]" />
          </a>

          {/* Desktop Menu */}
          <nav className="hidden xl:flex items-center justify-center gap-0.5 min-w-0" aria-label="Site sections">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.id === "careers" ? "/careers" : item.id === "blog" ? "/blog" : `#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                aria-current={isActive(item) ? "page" : undefined}
                className={`relative whitespace-nowrap px-2.5 2xl:px-3 py-2 text-[12px] 2xl:text-sm font-heading font-semibold transition-colors duration-300 group ${
                  isActive(item) ? "text-white-text" : "text-muted-text hover:text-white-text"
                }`}
              >
                <span>{item.label}</span>
                {/* Underline hover effect */}
                <span className={`absolute bottom-0.5 left-2.5 right-2.5 h-0.5 bg-gradient-to-r from-primary to-accent transform origin-left transition-transform duration-300 ${
                  isActive(item) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`} />
              </a>
            ))}
          </nav>

          {/* Call to Action Buttons */}
          <div className="hidden xl:flex items-center justify-end gap-3 whitespace-nowrap">
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
          <div className="flex xl:hidden items-center justify-end gap-3">
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
              className="fixed inset-0 top-[77px] bg-black/60 backdrop-blur-md z-30 xl:hidden"
            />
            {/* Slide Down Menu */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 right-0 bg-bg-dark/95 border-b border-white/[0.08] z-30 xl:hidden overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-8 space-y-6 max-h-[80vh] overflow-y-auto">
                <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation">
                  {menuItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.id === "careers" ? "/careers" : item.id === "blog" ? "/blog" : `#${item.id}`}
                      onClick={(e) => handleLinkClick(e, item.id)}
                      aria-current={isActive(item) ? "page" : undefined}
                      className={`flex items-center justify-between text-lg font-heading font-semibold py-2 border-b border-white/[0.04] transition-colors ${
                        isActive(item) ? "text-white-text" : "text-muted-text hover:text-white-text"
                      }`}
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
