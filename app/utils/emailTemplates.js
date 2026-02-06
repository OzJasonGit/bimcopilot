function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function getWelcomeEmail({ name, appUrl }) {
  const safeName = escapeHtml(name || "there");
  const safeAppUrl = appUrl || "https://bimcopilot.com";

  return {
    subject: "Welcome to Bimcopilot",
    text:
      `Hi ${name || "there"},\n\n` +
      "Welcome to Bimcopilot! Your account is ready.\n\n" +
      `Get started here: ${safeAppUrl}\n\n` +
      "If you have any questions, just reply to this email.\n",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Welcome to Bimcopilot</h2>
        <p>Hi ${safeName},</p>
        <p>Your account is ready. We're excited to have you on board.</p>
        <p><a href="${safeAppUrl}">Get started</a></p>
        <p>If you have any questions, just reply to this email.</p>
      </div>
    `,
  };
}

export function getPasswordResetEmail({ name, resetLink, expiresHours }) {
  const safeName = escapeHtml(name || "there");
  const safeResetLink = resetLink || "#";
  const hoursText = expiresHours ? `${expiresHours} hour(s)` : "a limited time";

  return {
    subject: "Reset your Bimcopilot password",
    text:
      `Hi ${name || "there"},\n\n` +
      "You requested a password reset. Click the link below to set a new password.\n\n" +
      `${safeResetLink}\n\n` +
      `This link is valid for ${hoursText}.\n\n` +
      "If you didn't request this, you can ignore this email.\n",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Reset your password</h2>
        <p>Hi ${safeName},</p>
        <p>You requested a password reset for your Bimcopilot account.</p>
        <p>Click the link below to set a new password (valid for ${hoursText}):</p>
        <p><a href="${safeResetLink}">Reset password</a></p>
        <p>If you didn't request this, you can ignore this email.</p>
      </div>
    `,
  };
}
