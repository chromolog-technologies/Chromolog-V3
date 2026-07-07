import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, MessageSquare, LineChart, FileText, Bot, Database, Zap, Sparkles, Check } from "lucide-react";
import Badge from "./ui/Badge";
import Card from "./ui/Card";

const aiCapabilities = [
  {
    id: "agents",
    title: "Autonomous AI Agents",
    desc: "Self-executing digital workers that parse documents, email clients, and trigger database updates.",
    icon: Bot,
    glow: "primary",
    features: ["Hands-Off Workflows", "99% Accuracy", "Granular Logging"],
  },
  {
    id: "predictive",
    title: "Predictive Analytics",
    desc: "Custom machine learning models for risk scoring, trend forecasting, and competency analysis.",
    icon: LineChart,
    glow: "secondary",
    features: ["Placement Scoring", "Inventory Optimization", "Anomaly Alerts"],
  },
  {
    id: "nlp",
    title: "Cognitive NLP & RAG",
    desc: "Document intelligence to automatically read invoices, match resume criteria, and search vaults.",
    icon: MessageSquare,
    glow: "accent",
    features: ["RAG Search Pipelines", "Invoice Parsing", "Resume Screening"],
  },
  {
    id: "vision",
    title: "Document Intelligence (OCR)",
    desc: "Neural network vision engines that pull structured keys out of unstructured files and images.",
    icon: FileText,
    glow: "primary",
    features: ["Receipt Parsing", "Layout Analysis", "Metadata Tagging"],
  },
];

export default function AIShowcase() {
  const [activeTab, setActiveTab] = useState("agents");

  return (
    <section id="ai" className="relative bg-bg-dark overflow-hidden py-24 border-t border-white/[0.05]">
      {/* Background Neural Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] pointer-events-none z-0" />
      <div className="absolute top-[10%] right-[10%] w-[350px] h-[350px] bg-secondary/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-purple-glow/4 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Head */}
        <div className="section-head reveal text-center max-w-3xl mx-auto mb-16">
          <Badge variant="ai" className="mb-3 px-3 py-1 text-xs">AI & Intelligent Automation</Badge>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mt-2">
            Intelligent systems built to<br />
            <span className="gradient-text-primary">automate your operations.</span>
          </h2>
          <p className="text-muted-text text-base mt-4 max-w-xl mx-auto font-body">
            We build custom AI agents, predictive engines, and cognitive pipelines that turn raw data into decisions.
          </p>
        </div>

        {/* Tab Split Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-20">
          
          {/* Left Tab Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            {[
              { id: "agents", title: "Autonomous AI Agents", desc: "Self-executing workflows that parse documents and trigger updates.", icon: Bot },
              { id: "predictive", title: "Predictive Analytics", desc: "Custom machine learning algorithms for forecasting and trend analysis.", icon: LineChart },
              { id: "nlp", title: "Cognitive Automation (NLP)", desc: "Natural language processing to auto-read invoices and match resume criteria.", icon: MessageSquare }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-start gap-4 p-5 rounded-2xl border text-left transition-all duration-300 ${
                    isActive
                      ? "bg-white/[0.04] border-primary/45 shadow-xl shadow-primary/5"
                      : "bg-white/[0.01] border-white/[0.05] hover:bg-white/[0.02]"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl border mt-0.5 ${
                    isActive ? "bg-primary/20 border-primary/30 text-accent" : "bg-white/[0.02] border-white/[0.06] text-muted-text"
                  }`}>
                    <TabIcon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-heading font-bold text-white">{tab.title}</h3>
                    <p className="text-xs text-muted-text leading-relaxed font-body">{tab.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Visual Panel Display */}
          <div className="lg:col-span-7 flex items-stretch">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full flex"
              >
                <Card variant="glass" className="w-full p-8 flex flex-col justify-between border-white/[0.08] shadow-2xl backdrop-blur-xl">
                  
                  {/* Interactive Visualizations */}
                  <div className="flex-1 flex items-center justify-center p-6 border border-white/[0.04] bg-[#050816]/60 rounded-xl mb-6 min-h-[180px] relative overflow-hidden">
                    
                    {activeTab === "agents" && (
                      <div className="flex items-center gap-4 text-xs font-semibold relative w-full justify-around flex-wrap">
                        <div className="flex flex-col items-center gap-2 p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                          <div className="w-8 h-8 rounded-lg bg-primary/20 text-accent flex items-center justify-center">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <span className="text-muted-text text-[10px]">Inbound Email</span>
                        </div>
                        {/* Connecting anim line */}
                        <div className="h-0.5 bg-white/[0.08] flex-1 min-w-[30px] relative">
                          <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-accent rounded-full animate-[shimmer_1.5s_infinite]" />
                        </div>
                        <div className="flex flex-col items-center gap-2 p-4 bg-primary/10 border border-primary/20 rounded-2xl relative shadow-lg shadow-primary/10">
                          <div className="w-10 h-10 rounded-xl bg-primary/20 text-white flex items-center justify-center animate-pulse">
                            <Brain className="w-5 h-5" />
                          </div>
                          <span className="text-white text-[11px]">AI Agent</span>
                        </div>
                        {/* Connecting anim line */}
                        <div className="h-0.5 bg-white/[0.08] flex-1 min-w-[30px] relative">
                          <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-accent rounded-full animate-[shimmer_1.5s_infinite]" />
                        </div>
                        <div className="flex flex-col items-center gap-2 p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                          <div className="w-8 h-8 rounded-lg bg-success/20 text-success flex items-center justify-center">
                            <Database className="w-4 h-4" />
                          </div>
                          <span className="text-muted-text text-[10px]">ERP Update</span>
                        </div>
                      </div>
                    )}

                    {activeTab === "predictive" && (
                      <div className="w-full space-y-4">
                        <svg viewBox="0 0 300 110" className="w-full h-24 overflow-visible">
                          <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            d="M 10 100 Q 75 80, 150 40 T 290 10"
                            fill="none"
                            stroke="url(#svg-glow-grad)"
                            strokeWidth="3.5"
                          />
                          <defs>
                            <linearGradient id="svg-glow-grad" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#4f46e5" />
                              <stop offset="100%" stopColor="#00e5ff" />
                            </linearGradient>
                          </defs>
                          <circle cx="75" cy="80" r="4" className="fill-primary" />
                          <circle cx="150" cy="40" r="4" className="fill-accent" />
                          <circle cx="290" cy="10" r="4" className="fill-secondary" />
                        </svg>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-text">Accuracy score</span>
                          <span className="text-accent font-bold font-heading text-sm">98.4%</span>
                        </div>
                      </div>
                    )}

                    {activeTab === "nlp" && (
                      <div className="w-full space-y-2 max-w-[320px]">
                        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-2.5 text-xs text-muted-text text-left max-w-[85%]">
                          Parse Invoice invoice_9401.pdf
                        </div>
                        <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 text-xs text-white text-left ml-auto max-w-[85%] space-y-1">
                          <div className="flex items-center gap-1.5 text-success">
                            <Check className="w-3.5 h-3.5" />
                            <span>Total extracted: <strong>₹48,500</strong></span>
                          </div>
                          <div className="flex items-center gap-1.5 text-success">
                            <Check className="w-3.5 h-3.5" />
                            <span>Vendor: <strong>SPATIUM Ernakulam</strong></span>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Tab Copy */}
                  <div className="space-y-4 text-left">
                    {activeTab === "agents" && (
                      <>
                        <h4 className="text-lg font-heading font-bold text-white">Hands-Off Workflow Operations</h4>
                        <p className="text-sm text-muted-text leading-relaxed font-body">
                          Deploy digital workers that execute multi-step operational tasks. Our agents process incoming inquiries, classify documents based on semantic content, retrieve contextual files, and populate ERP databases or HR platforms automatically with 99% accuracy.
                        </p>
                      </>
                    )}

                    {activeTab === "predictive" && (
                      <>
                        <h4 className="text-lg font-heading font-bold text-white">Data-Driven Decisions</h4>
                        <p className="text-sm text-muted-text leading-relaxed font-body">
                          Stop guessing your business trends. We design custom ML pipelines that forecast customer behavior, score student competencies (like our AlphaGrew campus platform), optimize inventory stocking intervals, and surface key anomalies in transaction reports.
                        </p>
                      </>
                    )}

                    {activeTab === "nlp" && (
                      <>
                        <h4 className="text-lg font-heading font-bold text-white">Semantic Document Understanding</h4>
                        <p className="text-sm text-muted-text leading-relaxed font-body">
                          Read, extract, and categorize text data automatically. We integrate LLM APIs and local fine-tuned language models to extract complex metadata from raw PDFs, verify resumes against job requirements, and drive semantic search inside custom knowledge vaults.
                        </p>
                      </>
                    )}
                  </div>

                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Premium AI Capabilities Grid */}
        <div className="border-t border-white/[0.08] pt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl font-heading font-bold text-white">Integrated AI Engine Library</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiCapabilities.map((cap) => {
              const CapIcon = cap.icon;
              return (
                <Card
                  key={cap.id}
                  variant="feature"
                  glow={true}
                  glowColor={cap.glow}
                  className="p-6 border-white/[0.06] hover:border-primary/20 transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center text-accent">
                      <CapIcon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-heading font-bold text-white">{cap.title}</h4>
                    <p className="text-xs text-muted-text leading-relaxed font-body">{cap.desc}</p>
                  </div>
                  <div className="space-y-2 pt-4 border-t border-white/[0.04] mt-4">
                    {cap.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[10px] font-bold text-white-text/80 font-heading tracking-wide uppercase">
                        <Zap className="w-3 h-3 text-accent shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
