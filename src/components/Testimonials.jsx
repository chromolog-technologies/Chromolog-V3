// ─── Testimonials — Stagger Reveal + Star Fill + Quote Word Reveal ───────────
// Success metrics: stagger reveal on scroll
// Quote: word-group reveal on each slide change
// Stars: fill one-by-one with 60ms delay
// Pause on hover: preserved

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, MessageSquare, ShieldCheck, Pause, Play } from "lucide-react";
import Badge from "./ui/Badge";
import Card from "./ui/Card";
import Counter from "./Counter";
import { easings } from "../motion/easings";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const testimonialData = [
  {
    id: 1,
    name: "Dr. Anish K. Kumar",
    role: "Director of IT Operations",
    company: "Medical College Chest Hospital",
    avatarInitials: "AK",
    avatarColor: "from-secondary to-accent",
    quote: "Chromolog transformed our legacy patient ticketing structure into a modern, real-time queue system. The offline-first Flutter application runs flawlessly, improving the patient experience and letting our staff monitor daily statistics with ease.",
    rating: 5,
    verified: true,
    tag: "Healthcare",
  },
  {
    id: 2,
    name: "Prof. Priya Nair",
    role: "Head of Placements & Admissions",
    company: "AlphaGrew Partner University",
    avatarInitials: "PN",
    avatarColor: "from-primary to-purple-glow",
    quote: "Our university placements dashboard processed over 8,500 profiles last semester. The customized AI Resume Analyzer and eligibility scoring saved hundreds of faculty hours. We could not ask for a more competent AI development partner.",
    rating: 5,
    verified: true,
    tag: "Education",
  },
  {
    id: 3,
    name: "Thomas Joseph",
    role: "Chief Operating Officer",
    company: "YCDC Enterprise Group",
    avatarInitials: "TJ",
    avatarColor: "from-success to-secondary",
    quote: "The business automation pipeline they deployed eliminated hours of manual data entry. We now have role-based controls, full audit logging, and direct SLA communication channels. Their code quality is exceptional.",
    rating: 5,
    verified: true,
    tag: "Enterprise",
  },
];

const successMetrics = [
  { end: 50, suffix: "+", label: "Projects Delivered" },
  { end: 98, suffix: "%", label: "Client Satisfaction" },
  { end: 6, suffix: "x", label: "Average ROI" },
  { end: 12, suffix: "", label: "Industries Served" },
];

// ── Quote word-group reveal ───────────────────────────────────────────────────
function QuoteReveal({ text }) {
  // Split into groups of 3-4 words for a natural reveal rhythm
  const words = text.split(" ");
  const groups = [];
  for (let i = 0; i < words.length; i += 4) {
    groups.push(words.slice(i, i + 4).join(" "));
  }

  return (
    <p className="text-base sm:text-lg text-white font-body italic leading-relaxed">
      &ldquo;
      {groups.map((group, i) => (
        <motion.span
          key={i}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.45, delay: i * 0.065, ease: easings.smooth }}
          style={{ display: "inline" }}
        >
          {group}{" "}
        </motion.span>
      ))}
      &rdquo;
    </p>
  );
}

export default function Testimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef(null);

  const startAutoPlay = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIdx((prev) => (prev + 1) % testimonialData.length);
    }, 5000);
  };

  useEffect(() => {
    if (isPlaying) startAutoPlay();
    else clearInterval(intervalRef.current);
    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  // Pause when tab hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) clearInterval(intervalRef.current);
      else if (isPlaying) startAutoPlay();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isPlaying]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIdx((prev) => (prev + 1) % testimonialData.length);
    if (isPlaying) startAutoPlay();
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIdx((prev) => (prev - 1 + testimonialData.length) % testimonialData.length);
    if (isPlaying) startAutoPlay();
  };

  const handleDot = (idx) => {
    setDirection(idx > currentIdx ? 1 : -1);
    setCurrentIdx(idx);
    if (isPlaying) startAutoPlay();
  };

  const currentTest = testimonialData[currentIdx];

  const slideVariants = {
    enter: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 60 : -60,
      filter: "blur(6px)",
      scale: 0.97,
    }),
    center: { opacity: 1, x: 0, filter: "blur(0px)", scale: 1 },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
      filter: "blur(6px)",
      scale: 0.97,
    }),
  };

  return (
    <section className="relative bg-bg-dark py-16 md:py-24 border-t border-white/[0.05]" id="testimonials">
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-primary/4 blur-[110px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[20%] left-[-10%] w-[300px] h-[300px] bg-secondary/3 blur-[95px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">

        {/* Section Head */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 28, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easings.expo }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Badge variant="ai" className="mb-3 px-3 py-1 text-xs">Client Success Stories</Badge>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mt-2">
            Trusted by the teams we build for.
          </h2>
          <p className="text-muted-text text-sm mt-3 font-body">
            Real outcomes from real clients across healthcare, education, and enterprise sectors.
          </p>
        </motion.div>

        {/* Success Metrics — stagger */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {successMetrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 24, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.09, duration: 0.55, ease: easings.spring }}
              whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.02 }}
              className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 text-center group hover:border-primary/30 hover:bg-white/[0.03] transition-all duration-300 cursor-default"
            >
              <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors" />
              <strong className="block text-2xl md:text-3xl font-heading font-extrabold text-white">
                <Counter end={metric.end} suffix={metric.suffix} />
              </strong>
              <span className="text-[10px] font-bold text-muted-text uppercase tracking-widest font-heading mt-1 block">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Carousel Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div className="min-h-[300px] md:min-h-[260px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIdx}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.42, ease: easings.smooth }}
                className="w-full"
              >
                <Card
                  variant="glass"
                  className="p-8 md:p-10 border-white/[0.08] shadow-2xl backdrop-blur-xl relative text-left"
                >
                  <div className="absolute top-6 right-8 text-white/[0.025] select-none pointer-events-none">
                    <MessageSquare className="w-24 h-24 stroke-[1]" />
                  </div>
                  <div className="absolute top-6 left-8">
                    <span className="text-[9px] font-bold text-accent/70 uppercase tracking-widest font-heading border border-accent/15 bg-accent/5 px-2 py-0.5 rounded">
                      {currentTest.tag}
                    </span>
                  </div>

                  <div className="space-y-6 relative z-10 pt-6">
                    {/* Stars fill one by one */}
                    <div className="flex gap-1">
                      {[...Array(currentTest.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.4 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: i * 0.06,
                            duration: 0.3,
                            ease: easings.spring,
                          }}
                        >
                          <Star className="w-4 h-4 text-warning fill-warning" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote with word-group reveal */}
                    <AnimatePresence mode="wait">
                      <motion.div key={currentIdx + "-quote"}>
                        <QuoteReveal text={currentTest.quote} />
                      </motion.div>
                    </AnimatePresence>

                    {/* Author — stagger in after quote */}
                    <motion.div
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: Math.ceil(currentTest.quote.split(" ").length / 4) * 0.065 + 0.1,
                        duration: 0.4,
                        ease: easings.smooth,
                      }}
                      className="flex items-center gap-4 pt-4 border-t border-white/[0.06]"
                    >
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-tr ${currentTest.avatarColor} font-extrabold text-white text-sm grid place-items-center tracking-wide shrink-0`}
                      >
                        {currentTest.avatarInitials}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-heading font-extrabold text-white">{currentTest.name}</h4>
                          {currentTest.verified && (
                            <ShieldCheck className="w-4 h-4 text-accent fill-accent/20" title="Verified Client Partner" />
                          )}
                        </div>
                        <p className="text-xs text-muted-text mt-0.5 leading-none">
                          {currentTest.role} &bull; <span className="text-white-text/75">{currentTest.company}</span>
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <motion.button
              onClick={handlePrev}
              className="p-3 border border-white/[0.06] rounded-xl bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/15 text-muted-text hover:text-white transition-all select-none"
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex gap-2.5 select-none items-center">
              {testimonialData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDot(idx)}
                  className={`rounded-full transition-all duration-350 ${
                    idx === currentIdx
                      ? "bg-accent w-6 h-2.5"
                      : "bg-white/10 w-2.5 h-2.5 hover:bg-white/25"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={handleNext}
              className="p-3 border border-white/[0.06] rounded-xl bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/15 text-muted-text hover:text-white transition-all select-none"
              aria-label="Next testimonial"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>

            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="p-2.5 border border-white/[0.05] rounded-xl bg-white/[0.01] hover:bg-white/[0.06] text-muted-text/60 hover:text-white transition-all select-none ml-1"
              aria-label={isPlaying ? "Pause auto-play" : "Resume auto-play"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Auto-play progress bar */}
          {isPlaying && (
            <div className="mt-5 w-full max-w-sm mx-auto h-px bg-white/[0.05] rounded-full overflow-hidden">
              <motion.div
                key={currentIdx}
                className="h-full bg-accent/50 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
              />
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
