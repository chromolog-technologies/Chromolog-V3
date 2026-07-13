// ─── Wedding Invitation SaaS — Premium Product Page ─────────────────────────
// Chromolog Technologies flagship SaaS product landing page
// All 14 sections: Hero → Features → Templates → Dashboard → CTA → FAQ

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  Heart, Sparkles, Star, Check, X, ChevronDown, ChevronUp, ArrowRight,
  Globe, Music, QrCode, MapPin, Camera, Users, Bell, BarChart3,
  Palette, Smartphone, Monitor, Tablet, Play, ExternalLink,
  Infinity, Clock, Share2, Mail, Zap, Shield, Cloud, Download,
  ChevronLeft, ChevronRight, MessageSquare, Instagram, Layers,
  LayoutDashboard, CreditCard, Image, FileText, BookOpen,
} from "lucide-react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { easings } from "../motion/easings";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ── Color tokens (rose/gold wedding palette) ──────────────────────────────────
const R = {
  rose: "#f43f5e",
  roseLight: "rgba(244, 63, 94, 0.15)",
  roseDim: "rgba(244, 63, 94, 0.06)",
  gold: "#f59e0b",
  goldLight: "rgba(245, 158, 11, 0.15)",
  goldDim: "rgba(245, 158, 11, 0.06)",
  mauve: "#c084fc",
  mauveLight: "rgba(192, 132, 252, 0.12)",
  ivory: "rgba(255, 248, 240, 0.06)",
};

// ── Word splitter (reuse pattern from Hero) ───────────────────────────────────
function SplitWords({ text, className, baseDelay = 0, color }) {
  const words = text.split(" ");
  return (
    <span className={className} style={{ display: "inline" }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.28em" }}>
          <motion.span
            style={{ display: "inline-block", color: color || "inherit" }}
            initial={prefersReducedMotion ? {} : { y: "110%", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.65, delay: baseDelay + i * 0.055, ease: easings.expo }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ── Reveal helper ─────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, variant = "up", className = "" }) {
  const variants = {
    up: { hidden: { opacity: 0, y: 32, filter: "blur(6px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } },
    left: { hidden: { opacity: 0, x: -36, filter: "blur(5px)" }, visible: { opacity: 1, x: 0, filter: "blur(0px)" } },
    right: { hidden: { opacity: 0, x: 36, filter: "blur(5px)" }, visible: { opacity: 1, x: 0, filter: "blur(0px)" } },
    scale: { hidden: { opacity: 0, scale: 0.88, filter: "blur(8px)" }, visible: { opacity: 1, scale: 1, filter: "blur(0px)" } },
    fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  };
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      variants={prefersReducedMotion ? {} : variants[variant]}
      transition={{ duration: 0.65, delay, ease: easings.expo }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1: HERO
// ─────────────────────────────────────────────────────────────────────────────
function HeroSection() {
  const canvasRef = useRef(null);
  const [demoOpen, setDemoOpen] = useState(false);

  // Floating petal particles canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;
    const ctx = canvas.getContext("2d");

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const count = 28;
    const petals = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 3 + Math.random() * 6,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -0.3 - Math.random() * 0.5,
      alpha: 0.1 + Math.random() * 0.35,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015,
      color: Math.random() > 0.5 ? R.rose : R.gold,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rot += p.rotSpeed;
        if (p.y < -20) { p.y = canvas.height + 20; p.x = Math.random() * canvas.width; }
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha;
        // Draw petal shape
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16" style={{ background: "#050816" }}>
      {/* Aurora gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-15%] w-[70vw] h-[70vw] rounded-full opacity-30 blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(244,63,94,0.18) 0%, transparent 65%)" }} />
        <div className="absolute top-[10%] right-[-15%] w-[55vw] h-[55vw] rounded-full opacity-25 blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.14) 0%, transparent 65%)" }} />
        <div className="absolute bottom-[10%] left-[20%] w-[50vw] h-[50vw] rounded-full opacity-20 blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(192,132,252,0.12) 0%, transparent 65%)" }} />
      </div>

      {/* Petal particles canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1, ease: easings.spring }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold font-heading tracking-wide"
            style={{ background: R.roseDim, borderColor: `${R.rose}40`, color: R.rose }}>
            <Heart className="w-3.5 h-3.5 fill-current" />
            Wedding Invitation SaaS — Now Available
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading text-white leading-tight mb-6 max-w-5xl mx-auto">
          <SplitWords text="Create Beautiful Wedding" baseDelay={0.18} />
          <br />
          <SplitWords text="Invitations That" baseDelay={0.42} />
          <br />
          <span className="inline-block overflow-hidden" style={{ verticalAlign: "bottom" }}>
            <motion.span
              className="inline-block"
              initial={prefersReducedMotion ? {} : { y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.72, ease: easings.expo }}
              style={{ background: `linear-gradient(135deg, ${R.rose}, ${R.gold}, ${R.mauve})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              Everyone Will Remember
            </motion.span>
          </span>
        </h1>

        {/* Subtitle */}
        <Reveal delay={0.85} className="max-w-2xl mx-auto mb-10">
          <p className="text-lg md:text-xl text-muted-text leading-relaxed font-body">
            Design elegant, animated wedding invitation websites in minutes with our modern SaaS platform. No coding required — just pure magic.
          </p>
        </Reveal>

        {/* CTA Buttons */}
        <Reveal delay={1.0} className="flex flex-wrap justify-center gap-4 mb-16">
          <motion.a
            href="https://weddinginvite.chromologtechnologies.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-heading font-bold text-sm text-white shadow-xl"
            style={{ background: `linear-gradient(135deg, ${R.rose}, #c0392b)`, boxShadow: `0 0 30px ${R.rose}40` }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.04, y: -2, boxShadow: `0 0 50px ${R.rose}60` }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <ExternalLink className="w-4 h-4" />
            View Live Demo
          </motion.a>

          <motion.button
            onClick={() => document.getElementById("wedding-demo-modal")?.showModal?.() || setDemoOpen(true)}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-heading font-bold text-sm text-white border"
            style={{ background: R.goldLight, borderColor: `${R.gold}40`, color: R.gold }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <Heart className="w-4 h-4" />
            Book a Demo
          </motion.button>

          <motion.button
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-heading font-bold text-sm text-muted-text border border-white/10 hover:border-white/20 hover:text-white transition-all"
            whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -1 }}
            transition={{ duration: 0.2 }}
          >
            <Play className="w-4 h-4" />
            Watch Video
          </motion.button>
        </Reveal>

        {/* Floating Device Mockup */}
        <Reveal delay={1.1} variant="scale" className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Desktop mockup frame */}
            <div className="relative rounded-2xl border overflow-hidden shadow-2xl"
              style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(10,15,30,0.95)", boxShadow: `0 40px 120px rgba(0,0,0,0.6), 0 0 60px ${R.rose}15` }}>
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(5,8,22,0.8)" }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: R.rose }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: R.gold }} />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 mx-3 h-6 rounded-lg flex items-center px-3 text-[10px] text-muted-text font-mono"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  weddinginvite.chromologtechnologies.com
                </div>
              </div>
              {/* Wedding invitation preview */}
              <WeddingInvitationMockupUI />
            </div>

            {/* Floating phone mockup */}
            <motion.div
              className="absolute -right-8 -bottom-8 w-32 md:w-40 hidden md:block"
              animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="rounded-2xl border overflow-hidden shadow-2xl"
                style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(10,15,30,0.98)", aspectRatio: "9/19.5" }}>
                <div className="h-full overflow-hidden">
                  <WeddingInvitationMockupUI mobile />
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Mini Wedding Invitation UI Mockup (used in hero + device preview) ─────────
function WeddingInvitationMockupUI({ mobile = false, template = "luxury" }) {
  const themes = {
    luxury: { from: "#1a0a12", accent: R.rose, gold: R.gold, name: "Arjun & Priya" },
    minimal: { from: "#0d0d0d", accent: "#e2c9a0", gold: "#c9a96e", name: "Rahul & Sneha" },
    royal: { from: "#0a0a1a", accent: "#7c3aed", gold: "#f59e0b", name: "Vikram & Kavitha" },
    modern: { from: "#0a1628", accent: "#06b6d4", gold: "#00e5ff", name: "Arun & Divya" },
    christian: { from: "#0a1a12", accent: "#16a34a", gold: "#86efac", name: "Thomas & Mary" },
    hindu: { from: "#1a0a00", accent: "#ea580c", gold: "#f97316", name: "Rajan & Meera" },
    muslim: { from: "#001a0a", accent: "#059669", gold: "#34d399", name: "Ibrahim & Ayesha" },
    destination: { from: "#001a1a", accent: "#0891b2", gold: "#22d3ee", name: "Sam & Lisa" },
  };
  const t = themes[template] || themes.luxury;

  return (
    <div className="w-full h-full flex flex-col items-center justify-start overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${t.from} 0%, #050816 100%)`, minHeight: mobile ? "300px" : "400px" }}>
      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-48 h-48 md:w-72 md:h-72 rounded-full border opacity-10"
          style={{ borderColor: t.accent }} />
        <div className="absolute w-36 h-36 md:w-56 md:h-56 rounded-full border opacity-10"
          style={{ borderColor: t.gold }} />
      </div>

      <div className="relative z-10 text-center px-4 pt-8 pb-4 w-full">
        <div className="text-[10px] font-heading tracking-[0.3em] uppercase mb-2" style={{ color: t.gold }}>
          Wedding Invitation
        </div>
        <div className="w-16 h-px mx-auto mb-3" style={{ background: `linear-gradient(to right, transparent, ${t.gold}, transparent)` }} />
        <h2 className={`font-heading font-bold text-white leading-tight mb-1 ${mobile ? "text-sm" : "text-xl md:text-2xl"}`}>
          {t.name}
        </h2>
        <div className="text-[10px] font-body text-white/50 mb-3">Request the Honour of Your Presence</div>

        <div className={`font-heading font-bold mb-1 ${mobile ? "text-xs" : "text-sm"}`} style={{ color: t.accent }}>
          14 February 2026
        </div>
        <div className="text-[9px] text-white/40">Saturday · 7:00 PM Onwards</div>

        {!mobile && (
          <>
            <div className="w-24 h-px mx-auto my-3" style={{ background: `linear-gradient(to right, transparent, ${t.gold}60, transparent)` }} />
            <div className="text-[9px] text-white/40 mb-1">Grand Palace Convention Centre</div>
            <div className="text-[9px] text-white/30 mb-4">Kochi, Kerala</div>

            {/* RSVP Button */}
            <button className="px-5 py-2 rounded-lg text-[10px] font-heading font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.gold})`, boxShadow: `0 0 20px ${t.accent}40` }}>
              RSVP Now
            </button>
          </>
        )}

        {/* Countdown */}
        {!mobile && (
          <div className="flex justify-center gap-3 mt-4">
            {[{ v: "08", l: "Months" }, { v: "14", l: "Days" }, { v: "06", l: "Hours" }].map((item) => (
              <div key={item.l} className="text-center">
                <div className="text-base font-heading font-bold text-white">{item.v}</div>
                <div className="text-[8px] text-white/30">{item.l}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2: SOCIAL PROOF STRIP
// ─────────────────────────────────────────────────────────────────────────────
function SocialProofSection() {
  const stats = [
    { value: "2,400+", label: "Happy Couples", icon: Heart },
    { value: "340+", label: "Wedding Studios", icon: Camera },
    { value: "98%", label: "Satisfaction Rate", icon: Star },
    { value: "12+", label: "Premium Templates", icon: Palette },
    { value: "50K+", label: "Guests Invited", icon: Users },
  ];

  return (
    <section className="py-10 border-y" style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(5,8,22,0.7)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.07} variant="up" className="text-center">
              <s.icon className="w-5 h-5 mx-auto mb-2" style={{ color: i % 2 === 0 ? R.rose : R.gold }} />
              <div className="text-2xl md:text-3xl font-heading font-extrabold text-white">{s.value}</div>
              <div className="text-xs text-muted-text font-heading uppercase tracking-wider mt-0.5">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3: PRODUCT OVERVIEW
// ─────────────────────────────────────────────────────────────────────────────
function ProductOverviewSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: "Live Invitation",
      icon: Heart,
      heading: "Stunning Live Invitation Websites",
      desc: "Create fully animated, interactive wedding invitation websites that guests can experience on any device. Built with modern web technology — fast, beautiful, and unforgettable.",
      features: ["Animated opening sequences", "Music player integration", "Mobile-first responsive design", "Instant QR code sharing"],
    },
    {
      label: "RSVP Dashboard",
      icon: LayoutDashboard,
      heading: "Smart RSVP Management",
      desc: "Track RSVPs in real time from your dedicated dashboard. Know exactly who's coming, manage dietary preferences, and send automated reminders — all in one place.",
      features: ["Real-time guest tracking", "Dietary preference collection", "WhatsApp RSVP integration", "Automated reminder system"],
    },
    {
      label: "Guest Analytics",
      icon: BarChart3,
      heading: "Powerful Guest Analytics",
      desc: "Understand how guests interact with your invitation. See open rates, location data, device stats, and RSVP trends to plan your wedding day perfectly.",
      features: ["Invitation open tracking", "Location heat maps", "Device analytics", "RSVP trend charts"],
    },
    {
      label: "QR & Sharing",
      icon: Share2,
      heading: "Instant Sharing & QR Codes",
      desc: "Generate branded QR codes for print materials. Share via WhatsApp, Instagram, or any platform in one click. Track every share to measure reach.",
      features: ["Custom branded QR codes", "One-click WhatsApp sharing", "Instagram story card export", "Link tracking & analytics"],
    },
  ];

  const active = tabs[activeTab];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: `radial-gradient(circle, ${R.roseDim} 0%, transparent 70%)` }} />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold font-heading mb-3"
            style={{ borderColor: `${R.rose}30`, background: R.roseDim, color: R.rose }}>
            <Sparkles className="w-3.5 h-3.5" /> Product Overview
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mt-2">
            Everything you need for a<br />
            <span style={{ background: `linear-gradient(135deg, ${R.rose}, ${R.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              perfect digital invitation.
            </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Tab Buttons */}
          <div className="lg:col-span-4 flex flex-col space-y-3">
            {tabs.map((tab, i) => {
              const TabIcon = tab.icon;
              const isActive = i === activeTab;
              return (
                <motion.button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: easings.expo }}
                  className="relative flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-300"
                  style={{
                    background: isActive ? R.roseDim : "rgba(255,255,255,0.01)",
                    borderColor: isActive ? `${R.rose}40` : "rgba(255,255,255,0.06)",
                  }}
                >
                  {isActive && (
                    <motion.div layoutId="overview-active"
                      className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full"
                      style={{ background: `linear-gradient(to bottom, ${R.rose}, ${R.gold})` }}
                      transition={{ duration: 0.35, ease: easings.smooth }}
                    />
                  )}
                  <div className="p-2.5 rounded-xl border transition-all duration-300"
                    style={{
                      background: isActive ? `${R.rose}20` : "rgba(255,255,255,0.02)",
                      borderColor: isActive ? `${R.rose}30` : "rgba(255,255,255,0.06)",
                      color: isActive ? R.rose : "#6b7280",
                    }}>
                    <TabIcon className="w-5 h-5" />
                  </div>
                  <span className={`text-sm font-heading font-bold transition-colors ${isActive ? "text-white" : "text-muted-text"}`}>
                    {tab.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Right Content Panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -24, filter: "blur(6px)" }}
                transition={{ duration: 0.35, ease: easings.snappy }}
              >
                <div className="rounded-2xl border h-full p-8 flex flex-col gap-6"
                  style={{ background: "rgba(10,5,20,0.7)", borderColor: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white mb-3">{active.heading}</h3>
                    <p className="text-muted-text text-sm leading-relaxed font-body">{active.desc}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {active.features.map((f, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.06, duration: 0.35, ease: easings.smooth }}
                        className="flex items-center gap-2.5 text-sm font-body"
                      >
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: `${R.rose}20`, border: `1px solid ${R.rose}30` }}>
                          <Check className="w-3 h-3" style={{ color: R.rose }} />
                        </div>
                        <span className="text-white/80">{f}</span>
                      </motion.div>
                    ))}
                  </div>
                  {/* Preview mockup strip */}
                  <div className="mt-auto rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)", minHeight: "120px" }}>
                    <WeddingInvitationMockupUI />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4: DEVICE PREVIEW
// ─────────────────────────────────────────────────────────────────────────────
function DevicePreviewSection() {
  const [activeDevice, setActiveDevice] = useState("desktop");

  const devices = [
    { id: "desktop", label: "Desktop", icon: Monitor },
    { id: "tablet", label: "Tablet", icon: Tablet },
    { id: "mobile", label: "Mobile", icon: Smartphone },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "rgba(5,8,22,0.6)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold font-heading mb-3"
            style={{ borderColor: `${R.gold}30`, background: R.goldDim, color: R.gold }}>
            <Monitor className="w-3.5 h-3.5" /> Interactive Preview
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mt-2">
            Beautiful on every screen.
          </h2>
          <p className="text-muted-text text-base mt-3 font-body">Experience your invitation exactly how your guests will see it.</p>
        </Reveal>

        {/* Device Switcher */}
        <Reveal className="flex justify-center gap-3 mb-10">
          {devices.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveDevice(id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border font-heading font-semibold text-sm transition-all duration-300"
              style={{
                background: activeDevice === id ? R.roseDim : "rgba(255,255,255,0.02)",
                borderColor: activeDevice === id ? `${R.rose}40` : "rgba(255,255,255,0.08)",
                color: activeDevice === id ? R.rose : "#6b7280",
              }}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </Reveal>

        {/* Device Frame */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDevice}
            initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: easings.snappy }}
            className="flex justify-center"
          >
            {activeDevice === "desktop" && (
              <div className="w-full max-w-4xl rounded-2xl border overflow-hidden shadow-2xl"
                style={{ borderColor: "rgba(255,255,255,0.08)", boxShadow: `0 40px 100px rgba(0,0,0,0.5), 0 0 50px ${R.rose}12` }}>
                <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ background: "rgba(8,10,25,0.95)", borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="flex gap-1.5">
                    {[R.rose, R.gold, "#22c55e"].map((c, i) => <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}
                  </div>
                  <div className="flex-1 mx-3 h-5 rounded flex items-center px-3 text-[9px] text-muted-text font-mono"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    invitation.link/arjun-priya-2026
                  </div>
                  <a href="https://weddinginvite.chromologtechnologies.com" target="_blank" rel="noopener noreferrer"
                    className="text-[9px] font-heading text-muted-text hover:text-white transition-colors flex items-center gap-1">
                    <ExternalLink className="w-2.5 h-2.5" /> Preview in New Tab
                  </a>
                </div>
                <div style={{ height: "500px", overflow: "hidden" }}>
                  <WeddingInvitationMockupUI />
                </div>
              </div>
            )}

            {activeDevice === "tablet" && (
              <div className="w-[580px] rounded-3xl border-4 overflow-hidden shadow-2xl"
                style={{ borderColor: "rgba(255,255,255,0.08)", boxShadow: `0 40px 100px rgba(0,0,0,0.5), 0 0 50px ${R.gold}12` }}>
                <div style={{ height: "400px", overflow: "hidden" }}>
                  <WeddingInvitationMockupUI />
                </div>
              </div>
            )}

            {activeDevice === "mobile" && (
              <div className="w-[280px] rounded-[2.5rem] border-4 overflow-hidden shadow-2xl"
                style={{ borderColor: "rgba(255,255,255,0.1)", boxShadow: `0 40px 100px rgba(0,0,0,0.5), 0 0 50px ${R.mauve}20` }}>
                <div className="h-5 flex items-center justify-center" style={{ background: "rgba(8,10,25,0.95)" }}>
                  <div className="w-16 h-1.5 rounded-full bg-white/10" />
                </div>
                <div style={{ height: "420px", overflow: "hidden" }}>
                  <WeddingInvitationMockupUI mobile />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5: FEATURES GRID
// ─────────────────────────────────────────────────────────────────────────────
const features = [
  { icon: Globe, title: "Unlimited Wedding Sites", desc: "Create unlimited invitation websites per account with no restrictions.", color: R.rose, cat: "Invitation" },
  { icon: Palette, title: "Beautiful Themes", desc: "12+ premium templates designed for every wedding style and tradition.", color: R.gold, cat: "Invitation" },
  { icon: Clock, title: "Countdown Timer", desc: "Animated countdown timer showing days, hours, minutes to the wedding.", color: R.mauve, cat: "Invitation" },
  { icon: MapPin, title: "Google Maps", desc: "Interactive venue maps with directions, parking info, and street view.", color: R.rose, cat: "Invitation" },
  { icon: Users, title: "RSVP Form", desc: "Smart RSVP collection with meal preferences and plus-one management.", color: R.gold, cat: "RSVP" },
  { icon: Heart, title: "Couple Story", desc: "Beautiful timeline to share your love story with photos and milestones.", color: R.rose, cat: "Invitation" },
  { icon: Camera, title: "Photo Gallery", desc: "Elegant masonry gallery for pre-wedding and engagement photos.", color: R.mauve, cat: "Invitation" },
  { icon: Music, title: "Background Music", desc: "Upload and play romantic background music on invitation open.", color: R.gold, cat: "Invitation" },
  { icon: QrCode, title: "QR Code", desc: "Branded QR codes for print cards, brochures and social sharing.", color: R.rose, cat: "Sharing" },
  { icon: Share2, title: "WhatsApp Sharing", desc: "One-tap WhatsApp sharing with personalized invitation messages.", color: "#25d366", cat: "Sharing" },
  { icon: Globe, title: "Custom Domain", desc: "Connect your own domain like couplename.com for a premium touch.", color: R.gold, cat: "Admin" },
  { icon: Image, title: "Photo Albums", desc: "Multiple photo albums for pre-wedding, mehndi, and ceremony moments.", color: R.mauve, cat: "Invitation" },
  { icon: Play, title: "Video Integration", desc: "Embed pre-wedding films, proposal videos and cinematic trailers.", color: R.rose, cat: "Invitation" },
  { icon: Instagram, title: "Instagram Integration", desc: "Display your Instagram feed and enable story card export.", color: "#e1306c", cat: "Sharing" },
  { icon: BookOpen, title: "Guest Book", desc: "Digital guest book for guests to leave messages and memories.", color: R.gold, cat: "RSVP" },
  { icon: LayoutDashboard, title: "Admin Dashboard", desc: "Powerful dashboard to manage guests, RSVPs, media, and analytics.", color: R.rose, cat: "Admin" },
  { icon: BarChart3, title: "Analytics", desc: "Real-time analytics: opens, clicks, RSVP rates, and device stats.", color: R.mauve, cat: "Admin" },
  { icon: Users, title: "Guest Management", desc: "Full guest list with RSVP status, categories, and export to CSV.", color: R.gold, cat: "Admin" },
  { icon: Globe, title: "Multi-language", desc: "Support for English, Hindi, Malayalam, Arabic, Tamil and more.", color: R.rose, cat: "Admin" },
  { icon: Bell, title: "RSVP Reminders", desc: "Automated WhatsApp and email reminders for pending RSVPs.", color: R.gold, cat: "RSVP" },
  { icon: Cloud, title: "Cloud Hosting", desc: "Globally distributed hosting via Cloudflare — 99.99% uptime guaranteed.", color: R.mauve, cat: "Admin" },
  { icon: Layers, title: "Dark / Light Theme", desc: "Every template supports elegant dark and light mode variants.", color: R.rose, cat: "Invitation" },
];

function FeaturesSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Invitation", "RSVP", "Sharing", "Admin"];
  const filtered = activeFilter === "All" ? features : features.filter(f => f.cat === activeFilter);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: `radial-gradient(circle, ${R.roseDim} 0%, transparent 70%)` }} />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold font-heading mb-3"
            style={{ borderColor: `${R.rose}30`, background: R.roseDim, color: R.rose }}>
            <Zap className="w-3.5 h-3.5" /> Platform Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mt-2">
            22+ features. One beautiful platform.
          </h2>
          <p className="text-muted-text text-base mt-3 font-body max-w-xl mx-auto">
            Everything needed to create, share, and manage a stunning wedding invitation — from couple story to guest analytics.
          </p>
        </Reveal>

        {/* Filter Pills */}
        <Reveal className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className="px-4 py-1.5 rounded-full border font-heading font-semibold text-xs transition-all duration-300"
              style={{
                background: activeFilter === f ? R.roseDim : "rgba(255,255,255,0.02)",
                borderColor: activeFilter === f ? `${R.rose}40` : "rgba(255,255,255,0.08)",
                color: activeFilter === f ? R.rose : "#6b7280",
              }}>
              {f}
            </button>
          ))}
        </Reveal>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 28, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-6% 0px" }}
                transition={{ duration: 0.55, delay: (idx % 4) * 0.07, ease: easings.expo }}
                whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.02 }}
                className="group relative rounded-2xl border p-5 cursor-default overflow-hidden"
                style={{ background: "rgba(10,5,20,0.5)", borderColor: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
              >
                {/* Gradient border glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1px ${feat.color}35, 0 0 30px ${feat.color}15` }} />

                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${feat.color}15`, border: `1px solid ${feat.color}25` }}
                  whileHover={prefersReducedMotion ? {} : { rotate: [0, -8, 8, 0], scale: 1.12 }}
                  transition={{ duration: 0.4, ease: easings.snappy }}
                >
                  <Icon className="w-5 h-5" style={{ color: feat.color }} />
                </motion.div>

                <h3 className="text-sm font-heading font-bold text-white mb-2 group-hover:text-rose-300 transition-colors duration-300">
                  {feat.title}
                </h3>
                <p className="text-xs text-muted-text leading-relaxed font-body">{feat.desc}</p>

                {/* Bottom accent line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `linear-gradient(to right, transparent, ${feat.color}50, transparent)` }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 6: TEMPLATE SHOWCASE
// ─────────────────────────────────────────────────────────────────────────────
const templates = [
  { id: "hindu", name: "Traditional Hindu", style: "Vedic Elegance", colors: ["#ea580c", "#f97316", "#1a0a00"], badge: "Popular" },
  { id: "christian", name: "Traditional Christian", style: "Sacred Grace", colors: ["#16a34a", "#86efac", "#0a1a12"], badge: null },
  { id: "muslim", name: "Traditional Muslim", style: "Islamic Heritage", colors: ["#059669", "#34d399", "#001a0a"], badge: null },
  { id: "luxury", name: "Luxury Wedding", style: "Pure Opulence", colors: [R.rose, R.gold, "#1a0a12"], badge: "Bestseller" },
  { id: "minimal", name: "Minimal Wedding", style: "Less is More", colors: ["#e2c9a0", "#c9a96e", "#0d0d0d"], badge: null },
  { id: "royal", name: "Royal Wedding", style: "Regal Grandeur", colors: ["#7c3aed", "#f59e0b", "#0a0a1a"], badge: "New" },
  { id: "modern", name: "Modern Wedding", style: "Contemporary Love", colors: ["#06b6d4", "#00e5ff", "#0a1628"], badge: null },
  { id: "destination", name: "Destination Wedding", style: "Love Everywhere", colors: ["#0891b2", "#22d3ee", "#001a1a"], badge: null },
];

function TemplateShowcaseSection() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const marqueeItems = [...templates, ...templates];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "rgba(5,8,22,0.8)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-12">
        <Reveal className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold font-heading mb-3"
            style={{ borderColor: `${R.mauve}30`, background: R.mauveLight, color: R.mauve }}>
            <Layers className="w-3.5 h-3.5" /> Template Library
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mt-2">
            8 premium templates. Zero compromise.
          </h2>
          <p className="text-muted-text text-base mt-3 font-body">Each template crafted for a specific cultural tradition and aesthetic vision.</p>
        </Reveal>
      </div>

      {/* Horizontal scrolling marquee */}
      <div className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
        <div className="flex gap-5 py-4"
          style={{ width: "max-content", animation: "marquee-scroll 36s linear infinite", animationPlayState: isPaused ? "paused" : "running" }}>
          {marqueeItems.map((tmpl, idx) => (
            <motion.div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.03 }}
              transition={{ duration: 0.28, ease: easings.snappy }}
              className="relative shrink-0 w-64 rounded-2xl overflow-hidden cursor-pointer group"
              style={{ border: `1px solid ${tmpl.colors[0]}30`, background: `linear-gradient(160deg, ${tmpl.colors[2]} 0%, #050816 100%)` }}
            >
              {/* Template preview */}
              <div className="h-48 relative">
                <WeddingInvitationMockupUI template={tmpl.id} />
              </div>

              {/* Hover overlay */}
              <AnimatePresence>
                {hoveredIdx === idx && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                    style={{ background: "rgba(5,8,22,0.85)", backdropFilter: "blur(8px)" }}
                  >
                    <motion.a
                      href="https://weddinginvite.chromologtechnologies.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.05 }}
                      className="px-5 py-2 rounded-lg font-heading font-bold text-xs text-white"
                      style={{ background: `linear-gradient(135deg, ${tmpl.colors[0]}, ${tmpl.colors[1]})` }}
                    >
                      View Demo
                    </motion.a>
                    <motion.button
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="px-5 py-2 rounded-lg font-heading font-semibold text-xs border"
                      style={{ borderColor: `${tmpl.colors[0]}40`, color: tmpl.colors[0] }}
                    >
                      Quick Preview
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Badge */}
              {tmpl.badge && (
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[9px] font-bold font-heading"
                  style={{ background: `${tmpl.colors[0]}30`, color: tmpl.colors[0], border: `1px solid ${tmpl.colors[0]}40` }}>
                  {tmpl.badge}
                </div>
              )}

              {/* Info */}
              <div className="p-4 border-t" style={{ borderColor: `${tmpl.colors[0]}15` }}>
                <div className="text-sm font-heading font-bold text-white">{tmpl.name}</div>
                <div className="text-xs text-muted-text mt-0.5">{tmpl.style}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 7: ADMIN DASHBOARD PREVIEW
// ─────────────────────────────────────────────────────────────────────────────
function AdminDashboardSection() {
  const [activeTab, setActiveTab] = useState(0);

  const dashTabs = [
    { label: "Invitations", icon: Heart },
    { label: "Guests", icon: Users },
    { label: "Analytics", icon: BarChart3 },
    { label: "Payments", icon: CreditCard },
    { label: "QR Code", icon: QrCode },
  ];

  const DashPreview = () => {
    if (activeTab === 0) return (
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-white font-heading font-bold text-sm">My Invitations</div>
            <div className="text-xs text-muted-text">3 active invitations</div>
          </div>
          <button className="px-3 py-1.5 rounded-lg text-xs font-heading font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${R.rose}, #c0392b)` }}>
            + New Invitation
          </button>
        </div>
        {[
          { name: "Arjun & Priya Wedding", date: "Feb 14, 2026", rsvp: "142 / 200", status: "Active" },
          { name: "Rahul & Sneha Wedding", date: "Mar 5, 2026", rsvp: "89 / 150", status: "Active" },
          { name: "Sample Template", date: "—", rsvp: "—", status: "Draft" },
        ].map((inv, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: R.roseDim }}>
                <Heart className="w-4 h-4" style={{ color: R.rose }} />
              </div>
              <div>
                <div className="text-xs font-heading font-bold text-white">{inv.name}</div>
                <div className="text-[10px] text-muted-text">{inv.date}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-muted-text">{inv.rsvp}</div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: inv.status === "Active" ? "rgba(34,197,94,0.15)" : "rgba(107,114,128,0.15)", color: inv.status === "Active" ? "#22c55e" : "#6b7280" }}>
                {inv.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    );

    if (activeTab === 1) return (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[{ v: "142", l: "Total Guests", c: R.rose }, { v: "108", l: "RSVP Yes", c: "#22c55e" }, { v: "34", l: "Pending", c: R.gold }].map((s, i) => (
            <div key={i} className="rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="text-xl font-heading font-bold" style={{ color: s.c }}>{s.v}</div>
              <div className="text-[9px] text-muted-text mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
        {["Sharma Family — 4 guests — ✅ Confirmed", "Krishnan & Party — 6 guests — ✅ Confirmed", "Patel Family — 3 guests — ⏳ Pending", "College Friends — 8 guests — ✅ Confirmed"].map((g, i) => (
          <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-xl"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
            <div className="text-xs text-white/70 font-body">{g}</div>
          </div>
        ))}
      </div>
    );

    if (activeTab === 2) return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {[{ v: "1,842", l: "Total Opens" }, { v: "456", l: "Unique Visitors" }, { v: "78%", l: "RSVP Rate" }, { v: "342", l: "Shares" }].map((s, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="text-xl font-heading font-bold text-white">{s.v}</div>
              <div className="text-[9px] text-muted-text mt-0.5 uppercase tracking-wider">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="text-xs font-heading font-bold text-white mb-3">Daily Opens (Last 7 days)</div>
          <div className="flex items-end gap-2 h-16">
            {[40, 65, 45, 80, 92, 72, 88].map((h, i) => (
              <motion.div key={i}
                initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: easings.expo }}
                className="flex-1 rounded-sm origin-bottom"
                style={{ height: `${h}%`, background: `linear-gradient(to top, ${R.rose}, ${R.gold})`, opacity: 0.8 }} />
            ))}
          </div>
        </div>
      </div>
    );

    if (activeTab === 3) return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3 mb-2">
          {[{ v: "₹24,500", l: "Revenue", c: "#22c55e" }, { v: "18", l: "Orders", c: R.gold }].map((s, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="text-xl font-heading font-bold" style={{ color: s.c }}>{s.v}</div>
              <div className="text-[9px] text-muted-text mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
        {[["INV-001", "Luxury Wedding", "₹1,999", "Paid"], ["INV-002", "Royal Wedding", "₹2,499", "Paid"], ["INV-003", "Minimal Wedding", "₹999", "Pending"]].map(([id, pkg, amt, status], i) => (
          <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-xl"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
            <div className="text-[10px] font-mono text-muted-text">{id}</div>
            <div className="text-xs text-white font-heading">{pkg}</div>
            <div className="text-xs text-white font-bold">{amt}</div>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: status === "Paid" ? "rgba(34,197,94,0.15)" : R.goldDim, color: status === "Paid" ? "#22c55e" : R.gold }}>
              {status}
            </span>
          </div>
        ))}
      </div>
    );

    if (activeTab === 4) return (
      <div className="flex flex-col items-center gap-5 py-4">
        <div className="w-36 h-36 rounded-2xl border-2 flex items-center justify-center"
          style={{ borderColor: `${R.rose}40`, background: R.roseDim }}>
          <div className="grid grid-cols-5 gap-0.5">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-sm"
                style={{ background: Math.random() > 0.5 ? R.rose : "rgba(255,255,255,0.06)" }} />
            ))}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm font-heading font-bold text-white mb-1">Wedding Invitation QR</div>
          <div className="text-xs text-muted-text mb-3">Scan to open Arjun & Priya's invitation</div>
          <button className="px-4 py-2 rounded-lg text-xs font-heading font-bold text-white flex items-center gap-2 mx-auto"
            style={{ background: `linear-gradient(135deg, ${R.rose}, ${R.gold})` }}>
            <Download className="w-3.5 h-3.5" /> Download QR Code
          </button>
        </div>
      </div>
    );

    return null;
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: `radial-gradient(circle, ${R.goldDim} 0%, transparent 70%)` }} />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold font-heading mb-3"
            style={{ borderColor: `${R.gold}30`, background: R.goldDim, color: R.gold }}>
            <LayoutDashboard className="w-3.5 h-3.5" /> Admin Dashboard
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mt-2">
            Manage everything from one<br />
            <span style={{ background: `linear-gradient(135deg, ${R.gold}, ${R.rose})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              powerful dashboard.
            </span>
          </h2>
        </Reveal>

        <Reveal variant="scale">
          <div className="rounded-2xl border overflow-hidden shadow-2xl max-w-3xl mx-auto"
            style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(8,5,20,0.95)", boxShadow: `0 40px 100px rgba(0,0,0,0.5), 0 0 60px ${R.gold}10` }}>
            {/* Browser chrome */}
            <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ background: "rgba(5,3,15,0.9)", borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="flex gap-1.5">
                {[R.rose, R.gold, "#22c55e"].map((c, i) => <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}
              </div>
              <div className="text-[10px] text-muted-text font-mono">admin.weddinginvite.chromologtechnologies.com</div>
            </div>

            {/* Dashboard layout */}
            <div className="flex h-[420px]">
              {/* Sidebar */}
              <div className="w-12 md:w-48 border-r flex-shrink-0 flex flex-col gap-1 p-3" style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(5,3,15,0.5)" }}>
                {dashTabs.map((tab, i) => {
                  const Icon = tab.icon;
                  return (
                    <button key={i} onClick={() => setActiveTab(i)}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-all text-left"
                      style={{
                        background: activeTab === i ? R.roseDim : "transparent",
                        color: activeTab === i ? R.rose : "#6b7280",
                      }}>
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="text-xs font-heading font-semibold hidden md:block">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Main content */}
              <div className="flex-1 p-5 overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: easings.snappy }}
                  >
                    <DashPreview />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 8: COMPARISON TABLE
// ─────────────────────────────────────────────────────────────────────────────
function ComparisonSection() {
  const rows = [
    { label: "Cost", traditional: "₹5,000–₹30,000 for print", saas: "Starting at ₹999/month" },
    { label: "Delivery Time", traditional: "3–7 days printing", saas: "Ready in minutes" },
    { label: "Customization", traditional: "Limited by template", saas: "Full visual customization" },
    { label: "Reach", traditional: "Physical delivery only", saas: "Instant global sharing" },
    { label: "Guest Tracking", traditional: "Manual phone calls", saas: "Real-time RSVP dashboard" },
    { label: "RSVP Collection", traditional: "Phone, paper, guesswork", saas: "Smart digital form" },
    { label: "Maps & Directions", traditional: "Not available", saas: "Interactive Google Maps" },
    { label: "Changes & Updates", traditional: "Reprint required", saas: "Edit anytime, instantly" },
    { label: "Sharing", traditional: "WhatsApp photo only", saas: "QR, link, social, email" },
    { label: "Environment", traditional: "Paper waste", saas: "100% paperless & eco" },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "rgba(5,8,22,0.7)" }}>
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold font-heading mb-3"
            style={{ borderColor: `${R.rose}30`, background: R.roseDim, color: R.rose }}>
            <Check className="w-3.5 h-3.5" /> Why Go Digital?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mt-2">
            Traditional invitation vs.<br />
            <span style={{ background: `linear-gradient(135deg, ${R.rose}, ${R.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Wedding Invitation SaaS
            </span>
          </h2>
        </Reveal>

        <Reveal variant="scale">
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            {/* Header */}
            <div className="grid grid-cols-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="p-4 text-xs font-heading font-bold text-muted-text uppercase tracking-wider">Feature</div>
              <div className="p-4 border-x text-center text-xs font-heading font-bold text-muted-text uppercase tracking-wider" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                📜 Traditional
              </div>
              <div className="p-4 text-center text-xs font-heading font-bold uppercase tracking-wider" style={{ color: R.rose }}>
                💻 Wedding SaaS ✨
              </div>
            </div>

            {rows.map((row, i) => (
              <motion.div
                key={i}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4, ease: easings.expo }}
                className="grid grid-cols-3 border-b last:border-b-0 group hover:bg-white/[0.02] transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.04)" }}
              >
                <div className="p-4 text-sm font-heading font-semibold text-white/70">{row.label}</div>
                <div className="p-4 border-x flex items-center gap-2 text-xs text-muted-text" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                  <X className="w-3.5 h-3.5 shrink-0 text-red-400/60" />
                  {row.traditional}
                </div>
                <div className="p-4 flex items-center gap-2 text-xs font-semibold" style={{ color: "#a3e635" }}>
                  <Check className="w-3.5 h-3.5 shrink-0" style={{ color: "#22c55e" }} />
                  {row.saas}
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 9: WORKFLOW
// ─────────────────────────────────────────────────────────────────────────────
function WorkflowSection() {
  const steps = [
    { num: "01", title: "Choose Template", desc: "Browse 12+ premium templates and pick the one that matches your wedding vision and traditions.", icon: Palette, color: R.rose },
    { num: "02", title: "Customize Design", desc: "Personalize colors, fonts, photos, and text using our visual editor — no coding needed.", icon: Layers, color: R.gold },
    { num: "03", title: "Upload Photos", desc: "Add your engagement, pre-wedding, or couple photos to create a stunning visual story.", icon: Camera, color: R.mauve },
    { num: "04", title: "Add Music", desc: "Upload your favorite song to play when guests open your invitation for an immersive experience.", icon: Music, color: R.rose },
    { num: "05", title: "Share Invitation", desc: "Generate your unique link and QR code. Share via WhatsApp, Instagram, email, or print.", icon: Share2, color: R.gold },
    { num: "06", title: "Receive RSVPs", desc: "Watch RSVPs roll in through your real-time dashboard. Know who's confirmed instantly.", icon: Bell, color: R.rose },
    { num: "07", title: "Manage Guests", desc: "Organize your guest list, track meal preferences, and export to Excel for your caterer.", icon: Users, color: R.mauve },
    { num: "08", title: "Wedding Day 💍", desc: "Arrive at your perfect wedding day, knowing every guest is informed, confirmed, and excited.", icon: Heart, color: R.rose },
  ];

  const lineRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion || !lineRef.current || !timelineRef.current) return;
    const { gsap, ScrollTrigger } = window._gsap_instance || {};
    if (!gsap || !ScrollTrigger) return;
    gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top center" });
    const trigger = ScrollTrigger.create({
      trigger: timelineRef.current,
      start: "top 80%",
      end: "bottom 20%",
      scrub: 0.8,
      onUpdate: (self) => gsap.set(lineRef.current, { scaleY: self.progress }),
    });
    return () => trigger.kill();
  }, []);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold font-heading mb-3"
            style={{ borderColor: `${R.gold}30`, background: R.goldDim, color: R.gold }}>
            <ArrowRight className="w-3.5 h-3.5" /> How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mt-2">
            From idea to invitation<br />in 8 simple steps.
          </h2>
        </Reveal>

        <div ref={timelineRef} className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/[0.05]" />
          <div ref={lineRef} className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: `linear-gradient(to bottom, ${R.rose}, ${R.gold}, ${R.mauve})`, boxShadow: `0 0 6px ${R.rose}40` }} />

          <div className="space-y-5 md:space-y-0">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isLeft = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: isLeft ? -40 : 40, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: idx * 0.03, ease: easings.expo }}
                  className={`relative flex items-start md:items-center gap-4 md:gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row pl-10 md:pl-0 mb-6 md:mb-0 md:py-4`}
                >
                  <div className="w-full md:w-[calc(50%-2.5rem)]">
                    <div className="relative rounded-2xl border p-5 group hover:border-white/15 transition-all duration-300"
                      style={{ background: "rgba(10,5,20,0.6)", borderColor: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0"
                          style={{ background: `${step.color}15`, borderColor: `${step.color}30` }}
                          whileHover={prefersReducedMotion ? {} : { rotate: [0, -10, 10, 0], scale: 1.12 }}
                          transition={{ duration: 0.4 }}
                        >
                          <Icon className="w-5 h-5" style={{ color: step.color }} />
                        </motion.div>
                        <div>
                          <div className="text-xs font-heading font-bold mb-1" style={{ color: step.color }}>{step.num}</div>
                          <div className="text-sm font-heading font-bold text-white mb-1">{step.title}</div>
                          <div className="text-xs text-muted-text leading-relaxed font-body">{step.desc}</div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: `linear-gradient(to right, transparent, ${step.color}40, transparent)` }} />
                    </div>
                  </div>

                  {/* Node */}
                  <div className="absolute left-0 top-5 md:static flex items-center justify-center shrink-0 z-10">
                    <motion.div
                      initial={{ scale: 0 }} whileInView={{ scale: [0, 1.3, 1] }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 0.5, ease: easings.spring }}
                      className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 flex items-center justify-center text-[9px] font-extrabold font-heading"
                      style={{ background: `${step.color}18`, borderColor: `${step.color}60`, color: step.color, boxShadow: `0 0 16px ${step.color}30` }}
                    >
                      {step.num}
                    </motion.div>
                  </div>

                  <div className="hidden md:block w-[calc(50%-2.5rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 10: TECHNOLOGY STACK
// ─────────────────────────────────────────────────────────────────────────────
function TechStackSection() {
  const categories = [
    {
      label: "Frontend",
      color: "#61DAFB",
      items: [
        { name: "Next.js 15", icon: "ri-nextjs-fill", color: "#ffffff", desc: "Full-stack React framework" },
        { name: "React 19", icon: "ri-reactjs-fill", color: "#61DAFB", desc: "Component-driven UI" },
        { name: "Tailwind CSS", icon: "ri-css3-fill", color: "#06b6d4", desc: "Utility-first styling" },
        { name: "Framer Motion", icon: "ri-movie-fill", color: "#7c3aed", desc: "Premium animations" },
        { name: "GSAP", icon: "ri-code-fill", color: "#88ce02", desc: "Scroll storytelling" },
      ]
    },
    {
      label: "Backend",
      color: "#FF2D20",
      items: [
        { name: "Laravel 11", icon: "ri-code-s-slash-fill", color: "#FF2D20", desc: "Elegant PHP framework" },
        { name: "REST API", icon: "ri-server-fill", color: "#06b6d4", desc: "JSON API endpoints" },
        { name: "JWT Auth", icon: "ri-shield-fill", color: "#22c55e", desc: "Secure authentication" },
      ]
    },
    {
      label: "Infrastructure",
      color: "#F5A623",
      items: [
        { name: "MySQL", icon: "ri-database-fill", color: "#F5A623", desc: "Relational database" },
        { name: "Cloudflare R2", icon: "ri-cloud-fill", color: "#F6821F", desc: "Media storage CDN" },
        { name: "AWS S3 Ready", icon: "ri-server-line", color: "#FF9900", desc: "Scalable cloud storage" },
      ]
    },
    {
      label: "Payments & APIs",
      color: "#00e5ff",
      items: [
        { name: "Razorpay", icon: "ri-bank-card-fill", color: "#2563EB", desc: "Indian payment gateway" },
        { name: "Stripe", icon: "ri-secure-payment-fill", color: "#635BFF", desc: "Global payments" },
        { name: "WhatsApp API", icon: "ri-whatsapp-fill", color: "#25D366", desc: "RSVP messaging" },
        { name: "Google Maps", icon: "ri-map-pin-fill", color: "#EA4335", desc: "Venue directions" },
      ]
    },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "rgba(5,8,22,0.6)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold font-heading mb-3"
            style={{ borderColor: `${R.mauve}30`, background: R.mauveLight, color: R.mauve }}>
            <Layers className="w-3.5 h-3.5" /> Technology Stack
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mt-2">
            Built on world-class technology.
          </h2>
          <p className="text-muted-text text-base mt-3 font-body">Enterprise-grade stack ensuring speed, security, and scalability.</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, ci) => (
            <Reveal key={ci} delay={ci * 0.1} variant={ci % 2 === 0 ? "left" : "right"}>
              <div className="rounded-2xl border p-6" style={{ background: "rgba(10,5,20,0.6)", borderColor: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                  <span className="text-xs font-heading font-bold uppercase tracking-wider" style={{ color: cat.color }}>{cat.label}</span>
                </div>
                <div className="space-y-3">
                  {cat.items.map((tech, ti) => (
                    <motion.div
                      key={ti}
                      className="flex items-center gap-4 p-3 rounded-xl border group hover:border-white/10 transition-all duration-300 cursor-default"
                      style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}
                      whileHover={prefersReducedMotion ? {} : { x: 4, backgroundColor: "rgba(255,255,255,0.03)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <i className={`${tech.icon} text-xl shrink-0`} style={{ color: tech.color }} />
                      <div className="flex-1">
                        <div className="text-sm font-heading font-bold text-white">{tech.name}</div>
                        <div className="text-[10px] text-muted-text">{tech.desc}</div>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full opacity-50 group-hover:opacity-100 transition-opacity" style={{ background: tech.color }} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 11: TESTIMONIALS
// ─────────────────────────────────────────────────────────────────────────────
function WeddingTestimonialsSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const testimonials = [
    {
      name: "Arjun & Priya Sharma",
      role: "Wedding Couple",
      company: "Kochi, Kerala",
      avatar: "AP",
      avatarColor: `linear-gradient(135deg, ${R.rose}, ${R.gold})`,
      quote: "Our guests couldn't stop talking about how beautiful our digital invitation was. The countdown timer, background music, and QR code made it feel like a luxury experience. We got 200+ RSVPs in just 2 days!",
      rating: 5,
      tag: "Couple",
    },
    {
      name: "Meenakshi Events",
      role: "Wedding Planning Studio",
      company: "Chennai, Tamil Nadu",
      avatar: "ME",
      avatarColor: `linear-gradient(135deg, ${R.mauve}, ${R.rose})`,
      quote: "We've switched 100% to digital invitations for all our clients using this platform. The admin dashboard is incredibly intuitive. RSVP tracking alone saves us 10+ hours per event. Absolutely worth every rupee.",
      rating: 5,
      tag: "Wedding Planner",
    },
    {
      name: "Pixel Frames Studio",
      role: "Wedding Photography & Studio",
      company: "Bangalore, Karnataka",
      avatar: "PF",
      avatarColor: `linear-gradient(135deg, ${R.gold}, #22c55e)`,
      quote: "We bundle this platform with every premium photography package we sell. Couples love having a matching digital invitation. It's become our best upsell — clients are happy and we earn more per booking.",
      rating: 5,
      tag: "Photography Studio",
    },
  ];

  const current = testimonials[currentIdx];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-0 left-[-10%] w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: `radial-gradient(circle, ${R.roseDim} 0%, transparent 70%)` }} />

      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold font-heading mb-3"
            style={{ borderColor: `${R.rose}30`, background: R.roseDim, color: R.rose }}>
            <Star className="w-3.5 h-3.5 fill-current" /> Client Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mt-2">
            Loved by couples, planners & studios.
          </h2>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -40, filter: "blur(6px)" }}
            transition={{ duration: 0.4, ease: easings.smooth }}
          >
            <div className="rounded-2xl border p-8 md:p-10 relative overflow-hidden"
              style={{ background: "rgba(10,5,20,0.8)", borderColor: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", boxShadow: `0 0 60px ${R.rose}08` }}>
              {/* Quote icon */}
              <div className="absolute top-6 right-8 opacity-[0.04]">
                <MessageSquare className="w-24 h-24" />
              </div>
              <div className="absolute top-6 left-6">
                <span className="text-[9px] font-bold px-2.5 py-1 rounded-full font-heading"
                  style={{ background: R.roseDim, color: R.rose, border: `1px solid ${R.rose}30` }}>
                  {current.tag}
                </span>
              </div>

              <div className="pt-8 space-y-5 relative z-10">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div key={i}
                      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.06, duration: 0.3, ease: easings.spring }}>
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-base md:text-lg text-white font-body italic leading-relaxed">
                  &ldquo;{current.quote}&rdquo;
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="flex items-center gap-4 pt-4 border-t"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div className="w-12 h-12 rounded-full grid place-items-center text-white font-extrabold text-sm"
                    style={{ background: current.avatarColor }}>
                    {current.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-heading font-extrabold text-white">{current.name}</div>
                    <div className="text-xs text-muted-text">{current.role} · {current.company}</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setCurrentIdx(i)}
              className="rounded-full transition-all duration-300"
              style={{ width: i === currentIdx ? "24px" : "10px", height: "10px", background: i === currentIdx ? R.rose : "rgba(255,255,255,0.15)" }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 12: PRICING
// ─────────────────────────────────────────────────────────────────────────────
function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "₹999",
      period: "/invitation",
      color: "#6b7280",
      features: ["1 Wedding Website", "5 Templates", "Basic RSVP Form", "Google Maps", "QR Code", "1GB Storage", "Email Support"],
      storage: "1 GB",
      domain: "Platform subdomain",
    },
    {
      name: "Premium",
      price: "₹1,999",
      period: "/invitation",
      color: R.rose,
      popular: true,
      features: ["3 Wedding Websites", "All 12 Templates", "Advanced RSVP + Guest Mgmt", "Google Maps + Directions", "Branded QR Code", "Photo Gallery", "Background Music", "WhatsApp Sharing", "5GB Storage", "Priority Support", "Analytics Dashboard"],
      storage: "5 GB",
      domain: "Custom subdomain",
    },
    {
      name: "Luxury",
      price: "₹3,499",
      period: "/invitation",
      color: R.gold,
      features: ["Unlimited Websites", "All Templates + Exclusives", "Full Guest Management", "Custom Domain", "Video Integration", "Instagram Feed", "Guest Book", "Advanced Analytics", "20GB Storage", "WhatsApp API", "Dedicated Support"],
      storage: "20 GB",
      domain: "Your own domain",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      color: R.mauve,
      features: ["Unlimited Websites", "White-label Solution", "Custom Themes", "API Access", "SLA Guarantee", "Unlimited Storage", "24/7 Dedicated Support", "Multi-tenant Admin", "Custom Integrations", "Staff Accounts"],
      storage: "Unlimited",
      domain: "Full white-label",
    },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "rgba(5,8,22,0.7)" }}>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: `radial-gradient(circle, ${R.roseDim} 0%, transparent 70%)` }} />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold font-heading mb-3"
            style={{ borderColor: `${R.gold}30`, background: R.goldDim, color: R.gold }}>
            <CreditCard className="w-3.5 h-3.5" /> Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mt-2">
            Simple, transparent pricing.
          </h2>
          <p className="text-muted-text text-base mt-3 font-body">Launch soon. Join the waitlist for early access pricing.</p>
        </Reveal>

        {/* Coming soon banner */}
        <Reveal className="mb-10">
          <div className="max-w-xl mx-auto rounded-xl border p-4 text-center"
            style={{ background: R.goldDim, borderColor: `${R.gold}30` }}>
            <div className="flex items-center justify-center gap-2 text-sm font-heading font-bold" style={{ color: R.gold }}>
              <Sparkles className="w-4 h-4" />
              🎉 Launching Soon — Join the waitlist for 50% early-bird discount
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 32, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-6% 0px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: easings.spring }}
              className="relative rounded-2xl border overflow-hidden flex flex-col"
              style={{
                background: plan.popular ? `linear-gradient(160deg, ${R.roseDim} 0%, rgba(10,5,20,0.95) 100%)` : "rgba(10,5,20,0.7)",
                borderColor: plan.popular ? `${R.rose}50` : "rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
                boxShadow: plan.popular ? `0 0 40px ${R.rose}18, 0 20px 60px rgba(0,0,0,0.3)` : "none",
              }}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[9px] font-bold font-heading"
                  style={{ background: `linear-gradient(135deg, ${R.rose}, ${R.gold})`, color: "white" }}>
                  Most Popular
                </div>
              )}

              <div className="p-6 flex-1">
                <div className="text-xs font-heading font-bold uppercase tracking-wider mb-3" style={{ color: plan.color }}>{plan.name}</div>
                <div className="flex items-end gap-1 mb-5">
                  <span className="text-3xl font-heading font-extrabold text-white">{plan.price}</span>
                  <span className="text-xs text-muted-text mb-1">{plan.period}</span>
                </div>

                <div className="space-y-2.5 mb-6">
                  {plan.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-2 text-xs font-body text-white/70">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: `${plan.color}20`, border: `1px solid ${plan.color}30` }}>
                        <Check className="w-2.5 h-2.5" style={{ color: plan.color }} />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 pt-0">
                <button className="w-full py-3 rounded-xl font-heading font-bold text-sm transition-all duration-300"
                  style={plan.popular
                    ? { background: `linear-gradient(135deg, ${R.rose}, #c0392b)`, color: "white", boxShadow: `0 0 20px ${R.rose}30` }
                    : { background: "rgba(255,255,255,0.04)", color: "white", border: `1px solid rgba(255,255,255,0.1)` }
                  }>
                  {plan.name === "Enterprise" ? "Contact Sales" : "Join Waitlist"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 13: FAQ
// ─────────────────────────────────────────────────────────────────────────────
function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    { q: "How long does it take to create an invitation?", a: "Most couples complete their invitation in under 30 minutes. Simply choose a template, fill in your details, upload photos, and share. Our visual editor is designed to be intuitive — no design skills needed." },
    { q: "Can I use my own custom domain?", a: "Yes! Our Luxury and Enterprise plans support fully custom domains. Simply point your domain (e.g., arjunandpriya.com) to our platform and your guests will see a completely branded experience." },
    { q: "Can I upload background music?", a: "Absolutely. You can upload any audio file (MP3, WAV) and it will play automatically when guests open your invitation. All files are securely stored on Cloudflare R2 CDN for fast global delivery." },
    { q: "Can I customize colors and fonts?", a: "Yes! Every template allows full color customization. Pick from our curated palettes or use any hex color. Font styles vary by template but all support the most popular Google Font pairings." },
    { q: "Can I manage and export my guest list?", a: "Yes. Our admin dashboard provides a full guest management system. View RSVPs by name, category (family/friends), meal preference, and RSVP status. Export the entire list to Excel or CSV in one click." },
    { q: "Can I collect RSVPs digitally?", a: "Yes — that's one of our core features. Guests click the RSVP button in the invitation, fill in names, meal preferences, plus-one details, and dietary requirements. You see all responses in real time." },
    { q: "Can I create multiple invitations for different events?", a: "Yes! Our Premium plan supports 3 invitations and our Luxury plan is unlimited. Perfect for couples hosting mehndi, sangeet, and wedding ceremonies — each with its own unique invitation site." },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <Reveal className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold font-heading mb-3"
            style={{ borderColor: `${R.rose}30`, background: R.roseDim, color: R.rose }}>
            <MessageSquare className="w-3.5 h-3.5" /> FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mt-2">Frequently asked questions.</h2>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="rounded-2xl border overflow-hidden"
                style={{ borderColor: openIdx === i ? `${R.rose}30` : "rgba(255,255,255,0.06)", background: openIdx === i ? R.roseDim : "rgba(10,5,20,0.5)", backdropFilter: "blur(12px)" }}>
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left gap-4"
                >
                  <span className="text-sm font-heading font-semibold text-white">{faq.q}</span>
                  <motion.div animate={{ rotate: openIdx === i ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
                    <ChevronDown className="w-4 h-4 text-muted-text" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIdx === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: easings.smooth }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm text-muted-text leading-relaxed font-body border-t" style={{ borderColor: `${R.rose}20` }}>
                        <div className="pt-4">{faq.a}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 14: PREMIUM CTA
// ─────────────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, rgba(244,63,94,0.08) 0%, rgba(5,8,22,0.95) 50%, rgba(245,158,11,0.06) 100%)` }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px]" style={{ background: `radial-gradient(circle, ${R.roseDim} 0%, transparent 65%)` }} />
      </div>

      {/* Floating decorative petals */}
      {!prefersReducedMotion && [0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${4 + i * 2}px`, height: `${4 + i * 2}px`,
            background: i % 2 === 0 ? R.rose : R.gold,
            left: `${10 + i * 18}%`, top: `${20 + (i % 3) * 25}%`,
            opacity: 0.15 + i * 0.04,
          }}
          animate={{ y: [0, -20, 0], x: [0, i % 2 === 0 ? 8 : -8, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        />
      ))}

      <div className="max-w-4xl mx-auto px-6 md:px-8 text-center relative z-10">
        <Reveal>
          <div className="flex justify-center mb-6">
            <motion.div
              animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-12 h-12 fill-current" style={{ color: R.rose }} />
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-white leading-tight mb-6">
            Let's Create Your<br />
            <span style={{ background: `linear-gradient(135deg, ${R.rose}, ${R.gold}, ${R.mauve})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Dream Wedding Invitation
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-lg text-muted-text font-body max-w-2xl mx-auto mb-10 leading-relaxed">
            Join 2,400+ couples who've already created beautiful digital invitations. Your guests deserve more than a printed card — give them an experience they'll never forget.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="https://weddinginvite.chromologtechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-heading font-bold text-base text-white shadow-2xl"
              style={{ background: `linear-gradient(135deg, ${R.rose}, #c0392b)`, boxShadow: `0 0 40px ${R.rose}40` }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -3, boxShadow: `0 0 60px ${R.rose}60` }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <Heart className="w-5 h-5 fill-current" /> Book a Demo
            </motion.a>

            <motion.a
              href="https://weddinginvite.chromologtechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-heading font-bold text-base border"
              style={{ background: R.goldLight, borderColor: `${R.gold}40`, color: R.gold }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles className="w-5 h-5" /> Start Free Trial
            </motion.a>

            <motion.button
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-heading font-bold text-base border border-white/10 text-muted-text hover:text-white hover:border-white/20 transition-all"
              whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -1 }}
              transition={{ duration: 0.2 }}
              onClick={() => document.getElementById("wedding-contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Mail className="w-5 h-5" /> Contact Us
            </motion.button>
          </div>
        </Reveal>

        {/* Trust badges */}
        <Reveal delay={0.5}>
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-xs text-muted-text font-heading">
            {[
              { icon: Shield, text: "Secure Payments" },
              { icon: Cloud, text: "99.99% Uptime" },
              { icon: Star, text: "5-Star Support" },
              { icon: Heart, text: "2,400+ Happy Couples" },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" style={{ color: i % 2 === 0 ? R.rose : R.gold }} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export default function WeddingInvitationPage() {
  // SEO meta tags
  useEffect(() => {
    document.title = "Wedding Invitation SaaS — Beautiful Digital Wedding Invitations | Chromolog Technologies";
    const updateMeta = (name, content, property = false) => {
      let el = property
        ? document.querySelector(`meta[property="${name}"]`)
        : document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        property ? el.setAttribute("property", name) : el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    updateMeta("description", "Create beautiful, animated wedding invitation websites in minutes. Digital RSVP, countdown timer, photo gallery, background music, QR codes and admin dashboard. Wedding Invitation SaaS by Chromolog Technologies.");
    updateMeta("keywords", "wedding invitation website, digital wedding invitation, online wedding invitation, animated wedding invitation, wedding invitation SaaS, Indian wedding invitation, RSVP website, wedding invitation Kerala, wedding website builder");
    updateMeta("og:title", "Wedding Invitation SaaS — Chromolog Technologies", true);
    updateMeta("og:description", "Design elegant, animated wedding invitation websites in minutes. No coding required.", true);
    updateMeta("og:type", "website", true);
    updateMeta("og:url", "https://chromologtechnologies.com/wedding", true);

    return () => {
      document.title = "Chromolog Technologies — AI-First Software Development Company";
    };
  }, []);

  // Store GSAP instance for workflow section
  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        window._gsap_instance = { gsap, ScrollTrigger };
      });
    });
  }, []);

  return (
    <article className="relative bg-bg-dark overflow-hidden" itemScope itemType="https://schema.org/SoftwareApplication">
      <meta itemProp="name" content="Wedding Invitation SaaS" />
      <meta itemProp="applicationCategory" content="WebApplication" />
      <meta itemProp="operatingSystem" content="Any" />

      <HeroSection />
      <SocialProofSection />
      <ProductOverviewSection />
      <DevicePreviewSection />
      <FeaturesSection />
      <TemplateShowcaseSection />
      <AdminDashboardSection />
      <ComparisonSection />
      <WorkflowSection />
      <TechStackSection />
      <WeddingTestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </article>
  );
}
