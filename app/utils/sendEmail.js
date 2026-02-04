/**
 * SMTP email sender using nodemailer.
 * Set these in .env.local:
 *   SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS,
 *   SMTP_FROM (e.g. "Bimcopilot <noreply@bimcopilot.com>")
 *   NEXT_PUBLIC_APP_URL (e.g. https://bimcopilot.com) for links in emails
 */
import nodemailer from "nodemailer";

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn("SMTP not configured: SMTP_HOST, SMTP_USER, SMTP_PASS required");
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

/**
 * Send an email.
 * @param {Object} options - { to, subject, text, html? }
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function sendEmail({ to, subject, text, html }) {
  const transport = getTransport();
  if (!transport) {
    return { success: false, error: "Email is not configured" };
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@bimcopilot.com";

  try {
    await transport.sendMail({
      from,
      to,
      subject,
      text: text || (html ? html.replace(/<[^>]*>/g, "") : ""),
      html: html || undefined,
    });
    return { success: true };
  } catch (err) {
    console.error("Send email error:", err);
    return { success: false, error: err.message || "Failed to send email" };
  }
}

/**
 * Get base URL for links in emails (e.g. reset password link).
 */
export function getAppUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
