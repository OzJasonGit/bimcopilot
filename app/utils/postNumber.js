/**
 * Strip HTML from post_number for clean display.
 * Old stories may have stored values like "<h1>01</h1>".
 */
export function getPostNumberDisplay(val) {
  if (val == null) return "";
  return String(val)
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
}

/**
 * Extract numeric value from post_number for sorting.
 * Handles both plain numbers ("21") and HTML-wrapped ("<h1>01</h1>").
 */
export function getPostNumberNumeric(val) {
  const stripped = getPostNumberDisplay(val).replace(/\D/g, "") || "0";
  return parseInt(stripped, 10) || 0;
}
