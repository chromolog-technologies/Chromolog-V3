import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Brain, Cpu, Cloud, BarChart3, Shield } from "lucide-react";
import ThreeScene from "./ThreeScene";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Badge from "./ui/Badge";

const cyclingWords = [
  "AI Software",
  "Enterprise ERPs",
  "Mobile Apps",
  "Cloud Architectures",
  "Business Workflows",
  "Next-Gen SaaS",
];

const technologies = [
  { name: "Laravel", icon: "ri-bootstrap-fill", color: "#FF2D20" },
  { name: "Flutter", icon: "ri-flutter-fill", color: "#02569B" },
  { name: "React", icon: "ri-reactjs-fill", color: "#61DAFB" },
  { name: "Python", icon: "ri-code-fill", color: "#3776AB" },
  { name: "OpenAI", icon: "ri-brain-fill", color: "#10a37f" },
  { name: "Gemini", icon: "ri-shining-fill", color: "#7c3aed" },
  { name: "Docker", icon: "ri-instance-fill", color: "#2496ED" },
  { name: "AWS", icon: "ri-cloud-fill", color: "#FF9900" },
  { name: "PostgreSQL", icon: "ri-database-fill", color: "#336791" },
];

export default function Hero({ navigateToSection }) {
  const [wordIndex, setWordIndex] = useState(0);
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % cyclingWords.length);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleStartProject = (e) => {
    e.preventDefault();
    navigateToSection("contact");
  };

  const handleSeeWork = (e) => {
    e.preventDefault();
    navigateToSection("projects");
  };

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 overflow-hidden bg-bg-dark"
        id="home"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: Headline & Description */}
          <div className="lg:col-span-7 flex flex-col text-left space-y-6 lg:pr-6">
            
            {/* Animated Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex"
            >
              <Badge variant="ai" className="px-4 py-1.5 text-xs font-semibold">
                AI-First Technology Partner
              </Badge>
            </motion.div>

            {/* Cyclical Text Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading"
            >
              We Architect <br />
              <div className="h-[1.25em] relative overflow-hidden mt-1 inline-block w-full">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 28, opacity: 0, filter: "blur(5px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -28, opacity: 0, filter: "blur(5px)" }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 top-0 gradient-text-primary block"
                  >
                    {cyclingWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-muted-text max-w-xl leading-relaxed font-body"
            >
              Chromolog Technologies builds intelligent, production-ready custom software. We integrate AI cognitive workflows, clean cloud infrastructures, and high-fidelity interfaces engineered to scale your operations.
            </motion.p>

            {/* Hero Checkmarks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 gap-x-6 gap-y-3 pt-2 text-sm text-muted-text max-w-lg"
            >
              {[
                { label: "Intelligent AI Features", icon: Brain },
                { label: "High-Performance Code", icon: Cpu },
                { label: "100% Client Ownership", icon: Shield },
                { label: "Cloud Scalable Infrastructure", icon: Cloud },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-accent shrink-0" />
                  <span>{item.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Button
                variant="gradient"
                size="lg"
                magnetic={true}
                onClick={handleStartProject}
                icon={ArrowRight}
                iconPosition="right"
              >
                Start Your Project
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleSeeWork}
              >
                Explore Our Solutions
              </Button>
            </motion.div>

          </div>

          {/* Right: ThreeJS Scene & Floating Panels */}
          <div className="lg:col-span-5 relative w-full aspect-square flex items-center justify-center min-h-[380px] md:min-h-[480px]">
            
            {/* Interactive 3D Canvas */}
            <div className="w-full h-full absolute inset-0 z-10">
              <ThreeScene />
            </div>

            {/* Floating Glass Card 1: AI Assistant */}
            <motion.div
              style={{
                x: mousePos.x * 25,
                y: mousePos.y * 25,
              }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-0 -left-6 z-20 pointer-events-none select-none max-w-[190px]"
            >
              <Card variant="glass" className="p-4 border-white/[0.08] shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-primary/20 text-accent">
                    <Brain className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-white">AI Agent</span>
                  <Badge variant="status" color="success" className="ml-auto text-[9px] px-2 py-0.5">Live</Badge>
                </div>
                <p className="text-[10px] text-muted-text font-body">Cognitive OCR and workflow sync active.</p>
              </Card>
            </motion.div>

            {/* Floating Glass Card 2: ERP Analytics */}
            <motion.div
              style={{
                x: -mousePos.x * 20,
                y: -mousePos.y * 20,
              }}
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute bottom-6 -right-4 z-20 pointer-events-none select-none max-w-[210px]"
            >
              <Card variant="glass" className="p-4 border-white/[0.08] shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1.5 rounded-lg bg-secondary/20 text-secondary">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-white">ERP Analytics</span>
                </div>
                <div className="space-y-1.5">
                  <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-accent w-[78%] rounded-full" />
                  </div>
                  <div className="flex justify-between text-[9px] text-muted-text">
                    <span>Performance</span>
                    <span className="text-accent font-bold">98.4%</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Floating Glass Card 3: Cloud Infrastructure */}
            <motion.div
              style={{
                x: mousePos.x * 15,
                y: -mousePos.y * 15,
              }}
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-6 -left-6 z-20 pointer-events-none select-none max-w-[180px]"
            >
              <Card variant="glass" className="p-4 border-white/[0.08] shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-purple-glow/20 text-purple-glow">
                    <Cloud className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Cluster</span>
                    <span className="text-[9px] text-success font-semibold">99.99% Uptime</span>
                  </div>
                </div>
              </Card>
            </motion.div>

          </div>

        </div>
      </section>

      {/* Technology Trust Section: Infinite Logo Carousel */}
      <section className="relative py-12 bg-bg-dark/50 border-y border-white/[0.06] overflow-hidden" aria-label="Trusted Technologies">
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="text-sm font-heading font-semibold text-muted-text uppercase tracking-wider shrink-0 select-none">
            Our Core Stack
          </div>
          
          <div className="w-full overflow-hidden relative mask-gradient">
            {/* Infinite slider container */}
            <div className="flex gap-8 items-center w-max animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused]">
              {/* Double array rendering for infinite marquee flow */}
              {[...technologies, ...technologies, ...technologies].map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2 border border-white/[0.05] rounded-xl bg-white/[0.02] select-none text-muted-text hover:text-white-text hover:border-white/10 hover:bg-white/[0.04] transition-all"
                >
                  <i className={`${tech.icon} text-lg`} style={{ color: tech.color }} />
                  <span className="text-xs font-semibold font-heading tracking-wide">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CSS for gradient mask of infinite marquee */}
        <style>{`
          .mask-gradient {
            mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
            -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
          }
        `}</style>
      </section>
    </>
  );
}
