// ─── Footer — Column Stagger Reveal + Social Glow ────────────────────────────
// Columns reveal one by one (120ms apart)
// Social icons glow + scale on hover
// Newsletter input: focus glow preserved
// Bottom bar fades in last

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Award, Shield } from "lucide-react";
import { Input } from "./ui/Input";
import Button from "./ui/Button";
import BrandLogo from "./BrandLogo";
import { easings } from "../motion/easings";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const columnVariant = (delay = 0) => ({
  initial: prefersReducedMotion ? {} : { opacity: 0, y: 28, filter: "blur(5px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-5% 0px" },
  transition: { duration: 0.65, delay, ease: easings.expo },
});

export default function Footer({ setActivePage, navigateToSection }) {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    if (sectionId === "blog") {
      setActivePage("blog");
      window.history.pushState({}, "", "/blog");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionId === "careers") {
      setActivePage("careers");
      window.history.pushState({}, "", "/careers");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.history.pushState({}, "", "/");
      navigateToSection(sectionId);
    }
  };

  const handleLegalLinkClick = (e, pageKey) => {
    e.preventDefault();
    setActivePage(pageKey);
    window.history.pushState({}, "", `/${pageKey}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  // Social links data
  const socialLinks = [
    {
      href: "https://www.linkedin.com/company/chromolog-technologies/",
      label: "LinkedIn",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      href: "https://www.instagram.com/chromologtechnologies/",
      label: "Instagram",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      href: "https://www.facebook.com/profile.php?id=61560645833859",
      label: "Facebook",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative bg-bg-dark border-t border-white/[0.08] overflow-hidden pt-20 pb-10">
      {/* Ambient backgrounds */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16">

          {/* Col 1: Brand — reveals first */}
          <motion.div
            {...columnVariant(0)}
            className="lg:col-span-4 space-y-6"
          >
            <a
              className="inline-block group"
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                setActivePage("home");
                window.history.pushState({}, "", "/");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="Chromolog Home"
            >
              <BrandLogo compact className="h-20 w-auto max-w-[280px]" />
            </a>
            <p className="text-muted-text text-sm leading-relaxed">
              We build premium software that transforms businesses — web, mobile, AI, and custom platforms engineered to scale. Architecting the future of software development.
            </p>

            {/* Social Buttons */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-muted-text hover:text-white transition-colors duration-300"
                  whileHover={prefersReducedMotion ? {} : {
                    scale: 1.12,
                    boxShadow: "0 0 20px rgba(0, 229, 255, 0.25)",
                    borderColor: "rgba(0, 229, 255, 0.3)",
                    color: "#00e5ff",
                  }}
                  transition={{ duration: 0.22, ease: easings.snappy }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Awards & Certifications */}
            <div className="flex items-center gap-4 pt-2 text-muted-text/60">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider font-heading">
                <Award className="w-4 h-4 text-accent" />
                <span>Next-Gen AI Award</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider font-heading">
                <Shield className="w-4 h-4 text-success" />
                <span>ISO 9001:2015</span>
              </div>
            </div>
          </motion.div>

          {/* Col 2: Navigation Links */}
          <motion.div {...columnVariant(0.1)} className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider">Company</h4>
            <nav className="flex flex-col space-y-2.5 text-sm" aria-label="Footer Company Links">
              {[
                { href: "#about", id: "about", label: "About Us" },
                { href: "#projects", id: "projects", label: "Our Projects" },
                { href: "#services", id: "services", label: "Services" },
                { href: "#ai", id: "ai", label: "AI Capabilities" },
                { href: "#product", id: "product", label: "SaaS Product" },
                { href: "#process", id: "process", label: "Our Process" },
                { href: "#blog", id: "blog", label: "Knowledge Hub" },
                { href: "/careers", id: "careers", label: "Careers" },
              ].map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className="text-muted-text hover:text-white transition-colors duration-300 hover:translate-x-0.5 inline-block"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Col 3: Contact */}
          <motion.div {...columnVariant(0.18)} className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider">Contact Details</h4>
            <div className="space-y-4 text-sm text-muted-text">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white text-xs font-heading font-semibold uppercase tracking-wider">Email</strong>
                  <a href="mailto:info@chromologtechnologies.com" className="hover:text-white transition-colors">
                    info@chromologtechnologies.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white text-xs font-heading font-semibold uppercase tracking-wider">Phone</strong>
                  <a href="tel:+919400230723" className="hover:text-white transition-colors block">+91 9400230723</a>
                  <a href="tel:+918497885369" className="hover:text-white transition-colors block">+91 8497885369</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Col 4: Address + Newsletter */}
          <motion.div {...columnVariant(0.26)} className="lg:col-span-3 space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider">Office Address</h4>
              <div className="flex items-start gap-3 text-sm text-muted-text">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white text-xs font-heading font-semibold uppercase tracking-wider">Suite No: V7 66/3520</strong>
                  <p className="leading-relaxed">
                    SPATIUM, Ground Floor Island Castle, Opposite YMCA, Chittoor Road, Ernakulam, Kerala 682035.
                  </p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <motion.form
              onSubmit={handleSubscribe}
              className="space-y-3 pt-2"
              initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35, ease: easings.expo }}
            >
              <h4 className="text-xs font-heading font-bold text-white uppercase tracking-wider">Subscribe to Newsletter</h4>
              {subscribed ? (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-success font-semibold"
                >
                  Thank you for subscribing!
                </motion.p>
              ) : (
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="py-2.5 rounded-xl border border-white/5 hover:border-white/10"
                  />
                  <motion.div
                    whileHover={prefersReducedMotion ? {} : { scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button type="submit" variant="primary" size="sm" className="p-3 shrink-0 rounded-xl">
                      <Send className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
              )}
            </motion.form>
          </motion.div>

        </div>

        {/* Footer Bottom Bar */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35, ease: easings.decel }}
          className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-text font-heading"
        >
          <p>&copy; {currentYear} Chromolog Technologies. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#privacy" onClick={(e) => handleLegalLinkClick(e, "privacy")} className="hover:text-white transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#terms" onClick={(e) => handleLegalLinkClick(e, "terms")} className="hover:text-white transition-colors duration-300">
              Terms &amp; Conditions
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
