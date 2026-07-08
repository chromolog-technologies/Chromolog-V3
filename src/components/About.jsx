import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Target, Sparkles, Calendar, ArrowRight } from "lucide-react";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Badge from "./ui/Badge";

const stories = [
  {
    id: "story",
    tabLabel: "Our Story",
    title: "Crafting intelligent architectures since day one.",
    icon: BookOpen,
    content: "Chromolog Technologies was established with a singular focus: to build digital products that combine clean, modular code with human-centric interfaces. Based in Kerala, India, we have partnered with institutions and enterprises to design, develop, and deploy production-grade software ecosystems that scale effortlessly.",
  },
  {
    id: "vision",
    tabLabel: "Vision & Mission",
    title: "To bake intelligence directly into every system.",
    icon: Target,
    content: "We believe AI shouldn't be bolted on as an afterthought; it must be native to the workflow. Our mission is to engineer high-security, high-performance systems with frictionless designs, empowering teams to eliminate manual operational loops and focus on core business growth.",
  },
  {
    id: "future",
    tabLabel: "Future & Growth",
    title: "Pioneering the cognitive agent ecosystem.",
    icon: Sparkles,
    content: "We are actively steering towards autonomous agent architectures. By leveraging advanced language models, vector stores, and real-time database scopes, we build custom software platforms that are future-ready, self-learning, and tailored to industry-specific regulatory demands.",
  },
];

const milestones = [
  { year: "2022", title: "Inception & Foundations", desc: "Chromolog was founded with a target to modernize custom software. Formed a core team of senior product engineers in Ernakulam, Kerala." },
  { year: "2023", title: "Enterprise Scalability", desc: "Successfully delivered custom ERP and queue displays for retail and education centers, handling high daily transaction volumes." },
  { year: "2024", title: "Product Ecosystems", desc: "Incubated HumaNode HRMS architecture, shifting towards multi-tenant scoping and Laravel + React modular infrastructures." },
  { year: "2025", title: "AI-First Evolution", desc: "Standardized cognitive APIs, offline-first barcode syncs, and intelligent queue scheduling, transforming operations into AI-led systems." },
  { year: "2026", title: "Global Scale & Agents", desc: "Incubating autonomous agent pipelines, vector search connectors, and premium cloud deployments for international modern teams." },
];

export default function About({ navigateToSection }) {
  const [activeStory, setActiveStory] = useState("story");
  const selectedStory = stories.find((s) => s.id === activeStory);

  return (
    <section id="about" className="relative bg-bg-dark overflow-hidden py-16 md:py-24">
      {/* Background orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-primary/4 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[20%] right-[-10%] w-[300px] h-[300px] bg-secondary/4 blur-[90px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Head */}
        <div className="section-head reveal text-center max-w-3xl mx-auto mb-16">
          <Badge variant="ai" className="mb-3 px-3 py-1 text-xs">Who We Are</Badge>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white leading-tight mt-2">
            Not just lines of code.<br />
            <span className="gradient-text-cyan">Intelligent business systems.</span>
          </h2>
          <p className="text-muted-text text-base mt-4 max-w-xl mx-auto font-body">
            We partner with institutions, startups, and enterprises to ship scalable software.
          </p>
        </div>

        {/* Story Tab Split Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-24">
          
          {/* Left Tab Buttons */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-3">
            {stories.map((story) => {
              const TabIcon = story.icon;
              const isActive = story.id === activeStory;
              return (
                <button
                  key={story.id}
                  onClick={() => setActiveStory(story.id)}
                  className={`flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-300 ${
                    isActive
                      ? "bg-white/[0.04] border-primary/40 shadow-xl shadow-primary/5 text-white"
                      : "bg-white/[0.01] border-white/[0.06] text-muted-text hover:text-white-text hover:bg-white/[0.02]"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl border ${
                    isActive ? "bg-primary/20 border-primary/30 text-accent" : "bg-white/[0.02] border-white/[0.06] text-muted-text"
                  }`}>
                    <TabIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold font-heading tracking-wide uppercase text-white/50 text-[10px]">Pillar</span>
                    <span className="text-base font-heading font-bold">{story.tabLabel}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Content Showcase */}
          <div className="lg:col-span-8 flex items-stretch">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full"
              >
                <Card variant="glass" className="h-full p-8 md:p-10 flex flex-col justify-between border-white/[0.08] shadow-2xl backdrop-blur-xl">
                  <div className="space-y-6">
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-white leading-tight">
                      {selectedStory.title}
                    </h3>
                    <p className="text-muted-text text-base leading-relaxed font-body">
                      {selectedStory.content}
                    </p>
                  </div>
                  <div className="flex gap-4 pt-8 border-t border-white/[0.06] mt-8">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateToSection("contact")}
                      icon={ArrowRight}
                      iconPosition="right"
                    >
                      Connect with Architects
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Animated Milestones Scrolling Timeline */}
        <div className="border-t border-white/[0.08] pt-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/[0.08] rounded-full bg-white/[0.02] text-xs font-semibold text-muted-text mb-3">
              <Calendar className="w-4 h-4 text-accent" />
              <span>Milestones & Growth</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white">Our Journey Roadmap</h3>
          </div>

          {/* Timeline Pipeline */}
          <div className="relative max-w-4xl mx-auto pl-6 md:pl-0">
            {/* Center Vertical Timeline Track Line */}
            <div className="absolute left-[8px] md:left-1/2 top-0 bottom-0 w-px bg-white/[0.08] transform md:-translate-x-1/2" />

            <div className="space-y-12">
              {milestones.map((milestone, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`relative flex flex-col md:flex-row items-start md:items-center ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Circle Node Marker */}
                    <div className="absolute left-[8px] md:left-1/2 top-1.5 md:top-1/2 w-4 h-4 rounded-full bg-bg-dark border-2 border-primary transform -translate-x-[7.5px] md:-translate-y-1/2 flex items-center justify-center z-10 shadow-[0_0_8px_rgba(79,70,229,0.5)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    </div>

                    {/* Left/Right Card spacing */}
                    <div className="w-full md:w-1/2 md:px-8 pl-6">
                      <Card
                        variant="feature"
                        className="p-6 border-white/[0.06] hover:border-primary/20 hover:shadow-primary/5 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-base font-heading font-extrabold text-accent">{milestone.year}</span>
                          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                          <h4 className="text-sm font-heading font-bold text-white">{milestone.title}</h4>
                        </div>
                        <p className="text-xs md:text-sm text-muted-text leading-relaxed font-body">{milestone.desc}</p>
                      </Card>
                    </div>

                    {/* Empty placeholder to keep layout grids balanced */}
                    <div className="hidden md:block w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
