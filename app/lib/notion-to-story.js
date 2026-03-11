/**
 * Map a Notion page and its block children to our story document shape.
 * Used by the Notion webhook to sync stories from Notion.
 */

const NOTION_VERSION = "2022-06-28";

function getNotionHeaders(integrationSecret) {
  return {
    Authorization: `Bearer ${integrationSecret}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  };
}

/**
 * Extract plain text from a Notion rich_text array.
 */
function richTextToPlain(richText) {
  if (!Array.isArray(richText)) return "";
  return richText.map((t) => t.plain_text ?? "").join("");
}

/**
 * Convert rich_text to simple HTML (paragraphs, bold, italic, links).
 */
function richTextToHtml(richText) {
  if (!Array.isArray(richText) || richText.length === 0) return "";
  return richText
    .map((t) => {
      let content = escapeHtml(t.plain_text ?? "");
      if (t.annotations?.bold) content = `<strong>${content}</strong>`;
      if (t.annotations?.italic) content = `<em>${content}</em>`;
      if (t.href) content = `<a href="${escapeHtml(t.href)}">${content}</a>`;
      return content;
    })
    .join("");
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Get page title from Notion page object (properties can be "Title", "Name", etc.).
 */
function getPageTitle(page) {
  const props = page?.properties ?? {};
  for (const key of ["Title", "Name", "title", "name"]) {
    const p = props[key];
    if (p?.title && Array.isArray(p.title)) {
      return richTextToPlain(p.title);
    }
  }
  return "Untitled";
}

/**
 * Get a string property from page (e.g. Slug, Author).
 */
function getPagePropertyString(page, ...keys) {
  const props = page?.properties ?? {};
  for (const key of keys) {
    const p = props[key];
    if (p?.rich_text && Array.isArray(p.rich_text)) {
      const v = richTextToPlain(p.rich_text);
      if (v) return v;
    }
    if (p?.title && Array.isArray(p.title)) {
      const v = richTextToPlain(p.title);
      if (v) return v;
    }
  }
  return "";
}

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "untitled";
}

/**
 * Recursively fetch all block children (handles pagination and nested blocks).
 */
async function fetchBlockChildren(blockId, integrationSecret) {
  const blocks = [];
  let startCursor = undefined;
  do {
    const url = new URL(`https://api.notion.com/v1/blocks/${blockId}/children`);
    url.searchParams.set("page_size", "100");
    if (startCursor) url.searchParams.set("start_cursor", startCursor);
    const res = await fetch(url.toString(), {
      headers: getNotionHeaders(integrationSecret),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Notion API blocks: ${res.status} ${err}`);
    }
    const data = await res.json();
    blocks.push(...(data.results || []));
    startCursor = data.next_cursor ?? undefined;
  } while (startCursor);
  return blocks;
}

/**
 * Convert a single Notion block to HTML content (for paragraph, headings, etc.).
 */
function blockToHtml(block) {
  const type = block?.type;
  if (!type || !block[type]) return "";

  const rt = block[type]?.rich_text;
  const text = richTextToHtml(rt || []);

  switch (type) {
    case "paragraph":
      return text ? `<p>${text}</p>` : "";
    case "heading_1":
      return text ? `<h1>${text}</h1>` : "";
    case "heading_2":
      return text ? `<h2>${text}</h2>` : "";
    case "heading_3":
      return text ? `<h3>${text}</h3>` : "";
    case "bulleted_list_item":
      return text ? `<li>${text}</li>` : "";
    case "numbered_list_item":
      return text ? `<li>${text}</li>` : "";
    case "to_do":
      const checked = block[type].checked ? " checked" : "";
      return text ? `<p><input type="checkbox"${checked} disabled/> ${text}</p>` : "";
    case "quote":
      return text ? `<blockquote>${text}</blockquote>` : "";
    case "code":
      return text ? `<pre><code>${text}</code></pre>` : "";
    default:
      return text ? `<p>${text}</p>` : "";
  }
}

/**
 * Fetch Notion page by ID.
 */
async function fetchNotionPage(pageId, integrationSecret) {
  const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    headers: getNotionHeaders(integrationSecret),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Notion API page: ${res.status} ${err}`);
  }
  return res.json();
}

/**
 * Map Notion page + blocks to our story document.
 * Uses first paragraph(s) as introduction, rest as body1 (and optionally more sections).
 */
function mapNotionToStory(page, blocks, options = {}) {
  const title = getPageTitle(page);
  const slug =
    options.slug ||
    getPagePropertyString(page, "Slug", "slug") ||
    slugify(title);
  const author =
    options.author ||
    getPagePropertyString(page, "Author", "author") ||
    "BIM Copilot";
  const subtitle = options.subtitle || getPagePropertyString(page, "Subtitle", "subtitle");
  const date = options.date || new Date().toISOString().split("T")[0];

  const parts = [];
  for (const block of blocks) {
    const html = blockToHtml(block);
    if (html) parts.push(html);
  }

  const fullHtml = parts.join("\n");
  const firstParagraphEnd = fullHtml.indexOf("</p>");
  const introduction =
    firstParagraphEnd > 0
      ? fullHtml.slice(0, firstParagraphEnd + 4)
      : fullHtml.slice(0, 1500);
  const bodyContent =
    firstParagraphEnd > 0 ? fullHtml.slice(firstParagraphEnd + 4).trim() : "";

  return {
    post_number: options.post_number || "",
    title,
    slug,
    author,
    date,
    subtitle: subtitle || undefined,
    image: options.image || "",
    image2: options.image2 || undefined,
    avatar: options.avatar || undefined,
    introduction: introduction || title,
    body1_title: "",
    body1: bodyContent || introduction,
    conclusion: options.conclusion || undefined,
    video: options.video || undefined,
    published: options.published ?? false,
    notion_page_id: page?.id ?? undefined,
  };
}

/**
 * Fetch a Notion page and its block children, then map to story.
 */
export async function fetchNotionPageAndMapToStory(pageId, integrationSecret, options = {}) {
  const page = await fetchNotionPage(pageId, integrationSecret);
  const blocks = await fetchBlockChildren(pageId, integrationSecret);
  return mapNotionToStory(page, blocks, options);
}
