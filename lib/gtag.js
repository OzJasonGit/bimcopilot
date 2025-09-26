// lib/gtag.js
export const GA_TRACKING_ID = "G-LCM4F94SWK"; // replace with your GA Measurement ID

// Track pageviews
export const pageview = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// Track custom events
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};