



// lib/gtag.js
export const GA_TRACKING_ID = "G-1L63LBBY65"; // replace with your GA4 Measurement ID

// Track pageviews
export const pageview = (url) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};