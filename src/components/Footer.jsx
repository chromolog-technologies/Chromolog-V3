import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Award, Shield } from "lucide-react";
import { Input } from "./ui/Input";
import Button from "./ui/Button";

export default function Footer({ setActivePage, navigateToSection }) {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    if (sectionId === "blog") {
      setActivePage("blog");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigateToSection(sectionId);
    }
  };

  const handleLegalLinkClick = (e, pageKey) => {
    e.preventDefault();
    setActivePage(pageKey);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative bg-bg-dark border-t border-white/[0.08] overflow-hidden pt-20 pb-10">
      {/* Ambient backgrounds */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16">
          
          {/* Col 1: Brand Info & Socials */}
          <div className="lg:col-span-4 space-y-6">
            <a
              className="inline-block group"
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                setActivePage("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="Chromolog Home"
            >
              <img
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-102 rounded-lg"
                src="images/chromologlogo.webp"
                alt="Chromolog Technologies logo"
                loading="lazy"
              />
            </a>
            <p className="text-muted-text text-sm leading-relaxed">
              We build premium software that transforms businesses — web, mobile, AI, and custom platforms engineered to scale. Architecting the future of software development.
            </p>
            
            {/* Social Buttons */}
            <div className="flex space-x-3">
              <a
                className="p-2.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/15 transition-all text-muted-text hover:text-white"
                href="https://www.linkedin.com/company/chromolog-technologies/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                className="p-2.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/15 transition-all text-muted-text hover:text-white"
                href="https://www.instagram.com/chromologtechnologies/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                className="p-2.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/15 transition-all text-muted-text hover:text-white"
                href="https://www.facebook.com/profile.php?id=61560645833859"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>

            {/* Awards & Certifications */}
            <div className="flex items-center gap-4 pt-2 text-muted-text/60">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider font-heading">
                <Award className="w-4.5 h-4.5 text-accent" />
                <span>Next-Gen AI Award</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider font-heading">
                <Shield className="w-4.5 h-4.5 text-success" />
                <span>ISO 9001:2015</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider">Company</h4>
            <nav className="flex flex-col space-y-2.5 text-sm" aria-label="Footer Company Links">
              <a href="#about" onClick={(e) => handleLinkClick(e, "about")} className="text-muted-text hover:text-white transition-colors duration-300">About Us</a>
              <a href="#projects" onClick={(e) => handleLinkClick(e, "projects")} className="text-muted-text hover:text-white transition-colors duration-300">Our Projects</a>
              <a href="#services" onClick={(e) => handleLinkClick(e, "services")} className="text-muted-text hover:text-white transition-colors duration-300">Services</a>
              <a href="#ai" onClick={(e) => handleLinkClick(e, "ai")} className="text-muted-text hover:text-white transition-colors duration-300">AI Capabilities</a>
              <a href="#product" onClick={(e) => handleLinkClick(e, "product")} className="text-muted-text hover:text-white transition-colors duration-300">SaaS Product</a>
              <a href="#process" onClick={(e) => handleLinkClick(e, "process")} className="text-muted-text hover:text-white transition-colors duration-300">Our Process</a>
              <a href="#blog" onClick={(e) => handleLinkClick(e, "blog")} className="text-muted-text hover:text-white transition-colors duration-300">Knowledge Hub</a>
            </nav>
          </div>

          {/* Col 3: Contact details */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider">Contact Details</h4>
            <div className="space-y-4 text-sm text-muted-text">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white text-xs font-heading font-semibold uppercase tracking-wider">Email</strong>
                  <a href="mailto:info@chromologtechnologies.com" className="hover:text-white transition-colors">info@chromologtechnologies.com</a>
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
          </div>

          {/* Col 4: Office Address & Newsletter */}
          <div className="lg:col-span-3 space-y-6">
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
            <form onSubmit={handleSubscribe} className="space-y-3 pt-2">
              <h4 className="text-xs font-heading font-bold text-white uppercase tracking-wider">Subscribe to Newsletter</h4>
              {subscribed ? (
                <p className="text-xs text-success font-semibold">Thank you for subscribing!</p>
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
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    className="p-3 shrink-0 rounded-xl"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Footer Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-text font-heading">
          <p>&copy; {currentYear} Chromolog Technologies. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#privacy" onClick={(e) => handleLegalLinkClick(e, "privacy")} className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#terms" onClick={(e) => handleLegalLinkClick(e, "terms")} className="hover:text-white transition-colors duration-300">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
