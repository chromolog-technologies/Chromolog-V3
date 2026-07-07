import { useState, useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Services from "./components/Services";
import AIShowcase from "./components/AIShowcase";
import ProductMockup from "./components/ProductMockup";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CursorFollower from "./components/CursorFollower";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import TechOrbit from "./components/TechOrbit";
import IndustryExplorer from "./components/IndustryExplorer";
import Blog from "./pages/Blog";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    // Hide page loader with premium fade transition
    const timer = setTimeout(() => {
      const loader = document.getElementById("pageLoader");
      if (loader) loader.classList.add("is-hidden");
      document.body.classList.remove("is-loading");
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Sync Lenis scroll events with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Bind Lenis animation frame loop to GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Initialize ScrollTrigger reveal animations for elements with '.reveal' class
    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 35, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Scroll to saved section if returning to home
    if (activePage === "home") {
      const target = sessionStorage.getItem("scrollTarget");
      if (target) {
        sessionStorage.removeItem("scrollTarget");
        setTimeout(() => {
          const el = document.getElementById(target);
          if (el) {
            lenis.scrollTo(el, { offset: -80, duration: 1.2 });
          }
        }, 150);
      }
    }

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [activePage]);

  const navigateToSection = (sectionId) => {
    if (activePage !== "home") {
      setActivePage("home");
      sessionStorage.setItem("scrollTarget", sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-bg-dark text-white-text overflow-hidden font-body selection:bg-primary/30 selection:text-white">
      {/* Background Neural Grid and Noise overlays */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none z-0" />
      <div className="absolute inset-0 noise-overlay opacity-[0.012] pointer-events-none z-0" />

      {/* Ambient Floating Glowing Lights */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0 animate-orb-float" />
      <div className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-secondary/8 blur-[100px] pointer-events-none z-0 animate-orb-float-slow" />
      <div className="absolute bottom-[10%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-purple-glow/6 blur-[110px] pointer-events-none z-0 animate-orb-float" />

      {/* Custom Cursor Blur Glow Trail */}
      <CursorFollower />

      {/* Initial Loader View */}
      <div className="page-loader" id="pageLoader" role="status" aria-live="polite">
        <div className="loader-shell">
          <div className="loader-mark-wrap" aria-hidden="true">
            <span className="loader-ring"></span>
            <img
              className="loader-mark"
              src="images/chromologlogo.webp"
              alt="Chromolog Technologies"
              width="800"
              height="800"
            />
          </div>
        </div>
      </div>

      {/* Sticky Header Navigation */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        navigateToSection={navigateToSection}
      />

      {/* Main Content Area */}
      <main className="relative z-10 pt-20">
        {activePage === "home" && (
          <>
            <Hero navigateToSection={navigateToSection} />
            <About navigateToSection={navigateToSection} />
            <IndustryExplorer />
            <Projects />
            <Services />
            <TechOrbit />
            <AIShowcase />
            <ProductMockup navigateToSection={navigateToSection} />
            <Process />
            <Testimonials />
            <Contact />
          </>
        )}

        {activePage === "privacy" && <Privacy />}
        {activePage === "terms" && <Terms />}
        {activePage === "blog" && <Blog />}
      </main>

      {/* Enterprise Footer */}
      <Footer
        setActivePage={setActivePage}
        navigateToSection={navigateToSection}
      />

      {/* WhatsApp Floating FAB */}
      <a
        className="whatsapp-fab group"
        href="https://wa.me/+919400230723"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 0C7.164 0 0 7.164 0 16c0 2.82.736 5.46 2.02 7.748L0 32l8.494-2.224A15.93 15.93 0 0016 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.333a13.267 13.267 0 01-6.77-1.854l-.486-.29-5.04 1.32 1.344-4.904-.318-.504A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.94c-.398-.2-2.356-1.162-2.72-1.294-.366-.133-.632-.2-.898.2-.266.398-1.03 1.294-1.264 1.56-.232.266-.465.3-.863.1-.398-.2-1.68-.62-3.2-1.977-1.183-1.056-1.98-2.36-2.213-2.758-.232-.398-.024-.613.175-.812.18-.178.398-.465.598-.697.2-.232.266-.398.398-.664.133-.266.067-.498-.033-.697-.1-.2-.898-2.164-1.23-2.96-.323-.777-.65-.672-.898-.684l-.764-.013c-.266 0-.697.1-1.063.498-.365.398-1.394 1.362-1.394 3.323s1.427 3.854 1.627 4.12c.2.266 2.81 4.29 6.808 6.016.951.41 1.693.655 2.272.838.954.303 1.823.26 2.51.158.766-.114 2.356-.963 2.688-1.894.332-.93.332-1.727.232-1.894-.1-.166-.366-.266-.764-.465z" />
        </svg>
        <span className="hidden md:inline">Chat with us</span>
      </a>
    </div>
  );
}
