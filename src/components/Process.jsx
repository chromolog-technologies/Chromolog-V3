import React from "react";
import { motion } from "framer-motion";
import { Compass, Search, PenTool, Code, Cpu, ShieldAlert, Rocket, HeartHandshake, Check } from "lucide-react";
import Badge from "./ui/Badge";
import Card from "./ui/Card";
import Progress from "./ui/Progress";

const steps = [
  { num: "01", title: "Discovery", desc: "Deep-dive into your operational loops, users, and tech limitations to define a precise scope.", icon: Compass, color: "#00e5ff" },
  { num: "02", title: "Research & Planning", desc: "Designing system boundaries, database entities, API contracts, and project milestones.", icon: Search, color: "#4f46e5" },
  { num: "03", title: "UI/UX Design", desc: "High-fidelity clickable interface prototypes built with our premium design token system.", icon: PenTool, color: "#7c3aed" },
  { num: "04", title: "Core Development", desc: "Setting up repositories, modular APIs, test suites, and granular integration coverage.", icon: Code, color: "#06b6d4" },
  { num: "05", title: "AI Integration", desc: "Orchestrating agent workflows, RAG search engines, LLM fine-tuning, and vector stores.", icon: Cpu, color: "#10b981" },
  { num: "06", title: "Rigorous Testing", desc: "Security auditing, concurrency runs, penetration testing, and cross-platform QA cycles.", icon: ShieldAlert, color: "#f59e0b" },
  { num: "07", title: "CI/CD Deployment", desc: "Zero-downtime launches inside your secure AWS/Dockerized production environment.", icon: Rocket, color: "#ef4444" },
  { num: "08", title: "Dedicated Support", desc: "Continuous monitoring, live log tracing, feature scaling, and SLA-backed maintenance.", icon: HeartHandshake, color: "#22c55e" },
];

export default function Process() {
  return (
    <>
      {/* 1. Cinematic Vertical Timeline Pipeline */}
      <section id="process" className="relative bg-bg-dark overflow-hidden py-24 border-t border-white/[0.05]">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.012] pointer-events-none z-0" />
        <div className="absolute top-[30%] left-[20%] w-[350px] h-[350px] bg-primary/4 blur-[110px] pointer-events-none rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-accent/3 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10">

          {/* Section Head */}
          <div className="section-head reveal text-center max-w-3xl mx-auto mb-20">
            <Badge variant="ai" className="mb-3 px-3 py-1 text-xs">How We Work</Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mt-2">
              Our 8-step delivery pipeline,<br />
              <span className="gradient-text-cyan">engineered for speed and safety.</span>
            </h2>
            <p className="text-muted-text text-base mt-4 max-w-xl mx-auto font-body">
              Structured deployment sprints keeping you fully aligned at every critical milestone.
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="relative">
            {/* Central connector line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent hidden md:block" />

            <div className="space-y-0">
              {steps.map((step, idx) => {
                const StepIcon = step.icon;
                const isLeft = idx % 2 === 0;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative flex items-center gap-0 md:gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:flex-row mb-0`}
                  >
                    {/* Card side */}
                    <div className="w-full md:w-[calc(50%-2.5rem)] py-4">
                      <div
                        className={`group relative rounded-2xl border border-white/[0.06] bg-[#0A0F1D]/40 hover:border-white/[0.12] hover:bg-white/[0.02] transition-all duration-400 p-6 shadow-lg ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}
                      >
                        {/* Step number watermark */}
                        <span className="absolute top-4 right-5 text-[11px] font-bold font-heading text-white/[0.07] uppercase tracking-widest">
                          {step.num}
                        </span>

                        <div className="flex items-start gap-4">
                          <div
                            className="w-10 h-10 rounded-xl border border-white/[0.08] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                            style={{ background: `${step.color}15`, borderColor: `${step.color}30` }}
                          >
                            <StepIcon className="w-5 h-5" style={{ color: step.color }} />
                          </div>
                          <div>
                            <h3 className="text-sm font-heading font-bold text-white leading-tight mb-1.5">
                              {step.title}
                            </h3>
                            <p className="text-xs text-muted-text leading-relaxed font-body">
                              {step.desc}
                            </p>
                          </div>
                        </div>

                        {/* Accent glow on hover */}
                        <div
                          className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-b-2xl"
                          style={{ background: `linear-gradient(to right, transparent, ${step.color}50, transparent)` }}
                        />
                      </div>
                    </div>

                    {/* Center node (desktop only) */}
                    <div className="hidden md:flex flex-col items-center z-10 shrink-0 w-10">
                      <motion.div
                        whileInView={{ scale: [0, 1.2, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                        className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-[10px] font-extrabold font-heading shadow-lg"
                        style={{
                          background: `${step.color}18`,
                          borderColor: `${step.color}60`,
                          color: step.color,
                          boxShadow: `0 0 16px ${step.color}30`,
                        }}
                      >
                        {step.num}
                      </motion.div>
                      {/* Connecting segment line */}
                      {idx < steps.length - 1 && (
                        <div
                          className="w-px flex-1 mt-0"
                          style={{
                            background: `linear-gradient(to bottom, ${step.color}40, ${steps[idx + 1].color}25)`,
                            minHeight: "2.5rem",
                          }}
                        />
                      )}
                    </div>

                    {/* Mobile: step num badge */}
                    <div className="md:hidden flex items-center gap-2 self-start mt-0 mb-2 order-first">
                      <div
                        className="w-7 h-7 rounded-full border flex items-center justify-center text-[9px] font-extrabold font-heading"
                        style={{ background: `${step.color}18`, borderColor: `${step.color}60`, color: step.color }}
                      >
                        {step.num}
                      </div>
                      {idx < steps.length - 1 && (
                        <div className="w-6 h-px" style={{ background: `${step.color}40` }} />
                      )}
                    </div>

                    {/* Empty spacer for the other side */}
                    <div className="hidden md:block w-[calc(50%-2.5rem)]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Premium Analytics & Success Statistics Dashboard */}
      <section className="relative py-24 bg-bg-dark/45 border-t border-white/[0.05] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Copy block */}
            <div className="lg:col-span-5 space-y-6">
              <Badge variant="ai" className="px-3 py-1 text-xs">Live Benchmarks</Badge>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white leading-tight">
                Our performance in numbers.<br />
                <span className="gradient-text-primary">Measuring client success.</span>
              </h3>
              <p className="text-sm text-muted-text leading-relaxed font-body">
                We track execution speeds, security audits, and application uptimes in real time. We are committed to maintaining industry-leading software benchmarks for every deploy.
              </p>

              <div className="space-y-3 pt-2 text-sm text-muted-text">
                {[
                  "Average lighthouse page speed: 96+",
                  "Security vulnerability checks: 100% Passed",
                  "Auto-scaling container responses: <120ms",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success shrink-0" />
                    <span className="font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Statistics Dashboard Panel */}
            <div className="lg:col-span-7">
              <Card variant="glass" className="p-6 border-white/[0.08] shadow-2xl backdrop-blur-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Circle chart: Industries served */}
                  <div className="bg-white/[0.02] border border-white/[0.04] p-5 rounded-2xl flex flex-col items-center justify-between text-center min-h-[220px]">
                    <span className="text-[10px] font-bold text-muted-text uppercase tracking-widest font-heading mb-3">Industries Served</span>
                    <Progress type="circle" value={6} max={8} size="lg" color="accent" showLabel={true} />
                    <div className="text-xs text-muted-text mt-4">
                      <strong>6 Core Sectors</strong> (Healthcare, EdTech, Retail, Enterprise CRM/ERP, HRMS, AI)
                    </div>
                  </div>

                  {/* Analytics chart: Project deliveries */}
                  <div className="bg-white/[0.02] border border-white/[0.04] p-5 rounded-2xl flex flex-col justify-between min-h-[220px]">
                    <span className="text-[10px] font-bold text-muted-text uppercase tracking-widest font-heading">Monthly Deployments</span>
                    <div className="space-y-4 pt-4">
                      <Progress value={99} max={100} showLabel={true} color="success" size="sm" />
                      <div className="text-[10px] font-bold text-muted-text uppercase tracking-wider font-heading leading-none">
                        Client Satisfaction
                      </div>

                      <Progress value={98} max={100} showLabel={true} color="primary" size="sm" />
                      <div className="text-[10px] font-bold text-muted-text uppercase tracking-wider font-heading leading-none">
                        SLA Milestone Speed
                      </div>
                    </div>
                  </div>

                </div>
              </Card>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

