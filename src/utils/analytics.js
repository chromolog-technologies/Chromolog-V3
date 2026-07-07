/**
 * Chromolog Analytics Utility
 * GA4-ready event tracking. Replace G-XXXXXXXXXX with your real Measurement ID.
 * To enable: uncomment the gtag script in index.html and set your ID.
 */

const isGA = () => typeof window !== "undefined" && typeof window.gtag === "function";

/** Track a custom event */
export function trackEvent(category, action, label = "", value = 0) {
  if (!isGA()) return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}

/** Track SPA page view (call on route change) */
export function trackPageView(pagePath, pageTitle = document.title) {
  if (!isGA()) return;
  window.gtag("event", "page_view", {
    page_path: pagePath,
    page_title: pageTitle,
  });
}

/** Track CTA button clicks */
export function trackCTA(buttonId, destination = "") {
  trackEvent("CTA", "click", buttonId);
  if (destination) trackEvent("Navigation", "cta_navigate", destination);
}

/** Track contact form submission */
export function trackFormSubmit(formName = "contact_form") {
  trackEvent("Form", "submit", formName);
}

/** Track AI chat open */
export function trackChatOpen() {
  trackEvent("AI_Assistant", "open", "chat_widget");
}

/** Track AI chat message sent */
export function trackChatMessage(query = "") {
  trackEvent("AI_Assistant", "message_sent", query.slice(0, 80));
}

/** Track scroll depth milestones (25, 50, 75, 100) */
export function trackScrollDepth(percent) {
  trackEvent("Scroll", "depth", `${percent}%`, percent);
}

/** Track WhatsApp button click */
export function trackWhatsApp() {
  trackEvent("Communication", "whatsapp_click", "floating_button");
}

/** Track case study view */
export function trackCaseStudy(projectName = "") {
  trackEvent("Portfolio", "case_study_view", projectName);
}

/** Track newsletter signup */
export function trackNewsletterSignup(source = "blog") {
  trackEvent("Lead", "newsletter_signup", source);
}

/** Consent toggle — enable/disable analytics based on cookie consent */
export function setAnalyticsConsent(granted = true) {
  if (!isGA()) return;
  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
  });
}
