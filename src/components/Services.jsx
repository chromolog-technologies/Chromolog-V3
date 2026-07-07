import React, { useState, useRef } from "react";
import { ArrowRight, ArrowLeft, Terminal } from "lucide-react";
import Badge from "./ui/Badge";

function ServiceCard({ title, desc, icon, c, cb, list, backContent }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setCoords({ x: 0, y: 0 });
      }}
      className="relative h-[390px] rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:border-white/[0.15] transition-colors duration-500 overflow-hidden cursor-pointer group [perspective:1000px]"
    >
      {/* Spotlight mouse follow glow overlay */}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-100 z-0"
          style={{
            background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(0, 229, 255, 0.05), transparent 80%)`,
          }}
        />
      )}

      {/* Card Inner Container for 3D Flip */}
      <div
        className={`relative w-full h-full duration-700 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        
        {/* FRONT FACE */}
        <div className="absolute inset-0 w-full h-full p-6 flex flex-col justify-between [backface-visibility:hidden] z-10">
          <div className="space-y-4">
            {/* Custom Colored Icon container */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-transform duration-500 group-hover:scale-105"
              style={{ color: c, background: cb, border: `1px solid ${c}25` }}
            >
              <i className={`${icon} text-2xl`}></i>
            </div>
            
            <h3 className="text-lg font-heading font-bold text-white group-hover:text-accent transition-colors duration-300">
              {title}
            </h3>
            
            <p className="text-sm text-muted-text leading-relaxed font-body">
              {desc}
            </p>
            
            {/* List */}
            <ul className="space-y-2 pt-2">
              {list.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-muted-text font-heading">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(true);
            }}
            className="flex items-center gap-1.5 text-[11px] font-heading font-bold text-accent hover:text-white transition-colors uppercase tracking-wider select-none"
          >
            <span>Technical Spec</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* BACK FACE */}
        <div className="absolute inset-0 w-full h-full p-6 flex flex-col justify-between bg-surface border border-white/[0.08] rounded-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] z-10">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-error" />
                <span className="w-2.5 h-2.5 rounded-full bg-warning" />
                <span className="w-2.5 h-2.5 rounded-full bg-success" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-text font-heading flex items-center gap-1">
                <Terminal className="w-3 h-3 text-accent" />
                Architecture
              </span>
            </div>
            
            {/* Console Screen */}
            <div className="space-y-3 font-mono text-xs text-muted-text bg-[#050816]/75 border border-white/[0.04] p-4 rounded-xl max-h-[220px] overflow-y-auto">
              {backContent.map((line, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-accent select-none">&gt;</span>
                  <span className="leading-relaxed">{line}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(false);
            }}
            className="flex items-center gap-1.5 text-[11px] font-heading font-bold text-muted-text hover:text-white transition-colors uppercase tracking-wider select-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go Back</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default function Services() {
  const services = [
    {
      title: "Web Application Development",
      desc: "Fast, secure web apps built for performance and long-term maintainability.",
      icon: "ri-window-line",
      c: "#00E5FF",
      cb: "rgba(0, 229, 255, 0.08)",
      list: ["React & Laravel", "REST APIs", "Admin dashboards"],
      backContent: [
        "Framework: React SPA + Laravel 12",
        "State: Context API / Redux Toolkit",
        "Database: PostgreSQL / MySQL",
        "API layer: JSON REST / Sanctum JWT",
        "Hosting: AWS Lightsail / DigitalOcean",
      ],
    },
    {
      title: "Mobile App Development",
      desc: "Cross-platform Flutter apps that look native on iOS and Android.",
      icon: "ri-smartphone-line",
      c: "#4F46E5",
      cb: "rgba(79, 70, 229, 0.08)",
      list: ["Flutter", "Offline-first", "Push notifications"],
      backContent: [
        "SDK: Flutter 3.x (Dart Runtime)",
        "Architecture: BLoC / Clean Architecture",
        "Local DB: Hive / SQLite caching",
        "Push services: Firebase FCM",
        "App Stores: Google Play & App Store CI",
      ],
    },
    {
      title: "CRM Development",
      desc: "Custom CRM systems that streamline sales pipelines and customer operations.",
      icon: "ri-customer-service-2-line",
      c: "#06B6D4",
      cb: "rgba(6, 182, 212, 0.08)",
      list: ["Lead tracking", "Custom workflows", "Reporting"],
      backContent: [
        "Base engine: Laravel Pipeline Monolith",
        "Frontend layer: Inertia.js + React",
        "Communications: Twilio SMS & SendGrid",
        "Triggers: Event Listeners & Job Queues",
        "Caching: Redis lead analytics",
      ],
    },
    {
      title: "LMS Development",
      desc: "Scalable learning management platforms for institutes and training teams.",
      icon: "ri-book-open-line",
      c: "#7C3AED",
      cb: "rgba(124, 58, 237, 0.08)",
      list: ["Course builder", "Assessments", "Analytics"],
      backContent: [
        "Base: Node.js + Express Microservices",
        "Storage: AWS S3 + CloudFront CDN",
        "Security: Encrypted video streams",
        "Database: MongoDB / PostgreSQL JSONB",
        "Certificates: Automated PDF templates",
      ],
    },
    {
      title: "HRMS Systems",
      desc: "Enterprise HR workflows covering payroll, attendance, leave and performance.",
      icon: "ri-team-line",
      c: "#22C55E",
      cb: "rgba(34, 197, 94, 0.08)",
      list: ["Multi-tenant", "Payroll engine", "Biometric sync"],
      backContent: [
        "Tenancy: Multi-db tenant isolation",
        "Biometric: REST listener + SDK hook",
        "Payroll: Queued background calculations",
        "Permissions: Granular RBAC",
        "Queue: Laravel Horizon Redis queues",
      ],
    },
    {
      title: "Custom Software",
      desc: "Bespoke software engineered around your exact operational requirements.",
      icon: "ri-code-box-line",
      c: "#EF4444",
      cb: "rgba(239, 68, 68, 0.08)",
      list: ["ERP systems", "SaaS platforms", "Integrations"],
      backContent: [
        "Pattern: Domain Driven Design (DDD)",
        "Containerisation: Docker + Compose",
        "Deployment: AWS ECS / GCP Kubernetes",
        "Security: TLS, rate limiters, CORS locks",
        "Integrations: Custom SDK connectors",
      ],
    },
  ];

  return (
    <section id="services" className="relative bg-bg-dark overflow-hidden py-24 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="section-head reveal text-center max-w-3xl mx-auto mb-16">
          <Badge variant="ai" className="mb-3 px-3 py-1 text-xs">What We Build</Badge>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mt-2">
            End-to-end digital solutions<br />
            <span className="gradient-text-primary">tailored to your industry.</span>
          </h2>
          <p className="text-muted-text text-base mt-4 max-w-xl mx-auto font-body">
            Focused builds for real teams and real workflows.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => (
            <ServiceCard
              key={idx}
              title={svc.title}
              desc={svc.desc}
              icon={svc.icon}
              c={svc.c}
              cb={svc.cb}
              list={svc.list}
              backContent={svc.backContent}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
