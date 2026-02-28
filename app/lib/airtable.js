/**
 * Airtable integration for Products.
 * Syncs our product catalog to/from an Airtable base (table).
 *
 * Env: AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_PRODUCTS_TABLE (table name or id)
 */

const AIRTABLE_API_BASE = "https://api.airtable.com/v0";
const AIRTABLE_META_BASE = "https://api.airtable.com/v0/meta";

/** Our product field → Airtable column name (user can match these in their base) */
export const PRODUCT_TO_AIRTABLE_FIELDS = {
  product_id: "Product ID",
  name: "Name",
  title: "Name",
  status: "Status",
  short_description: "Short description",
  long_description: "Long description",
  description: "Long description",
  outcome_promise: "Outcome / Promise",
  category: "Category",
  tags: "Tags",
  primary_image: "Primary image",
  main_image: "Primary image",
  gallery_images: "Gallery images",
  images: "Gallery images",
  requirements: "Requirements",
  current_version: "Version",
  last_updated: "Last updated",
  seo_title: "SEO title",
  seo_meta_description: "SEO meta description",
  stripe_product_id: "Stripe product id",
  stock_status: "Stock status",
  stock_quantity: "Stock quantity",
  slug: "Slug",
};

function getConfig() {
  const apiKey = process.env.AIRTABLE_API_KEY?.trim();
  const baseId = process.env.AIRTABLE_BASE_ID?.trim();
  const table = (process.env.AIRTABLE_PRODUCTS_TABLE || "Products").trim();
  if (!apiKey || !baseId) {
    return null;
  }
  return { apiKey, baseId, table };
}

/**
 * Build a map from our Airtable column name (lowercase) to the actual schema field name.
 * So "Short description" -> "Short Description" when that's what exists in the base.
 */
function mapToSchemaNames(allowedFieldNames) {
  if (!allowedFieldNames || !allowedFieldNames.size) return null;
  const nameSet = new Set(allowedFieldNames);
  const map = new Map();
  for (const ourCol of Object.values(PRODUCT_TO_AIRTABLE_FIELDS)) {
    if (nameSet.has(ourCol)) {
      map.set(ourCol, ourCol);
      continue;
    }
    const lower = ourCol.trim().toLowerCase();
    for (const actual of nameSet) {
      if (actual.trim().toLowerCase() === lower) {
        map.set(ourCol, actual);
        break;
      }
    }
  }
  return map;
}

/**
 * Format a value for Airtable based on field type.
 * For singleSelect/multipleSelects, only returns values that exist in allowedChoices (avoids 422 INVALID_MULTIPLE_CHOICE_OPTIONS).
 */
function formatValueForAirtable(value, fieldType, isArray, allowedChoices = null) {
  const str = typeof value === "string" ? value : value == null ? "" : String(value);
  const arr = isArray ? (Array.isArray(value) ? value : str.split(",").map((s) => s.trim()).filter(Boolean)) : null;

  const matchesChoice = (v) => {
    if (!allowedChoices || !allowedChoices.size) return true;
    const key = String(v).trim().toLowerCase();
    return key && allowedChoices.has(key);
  };
  const hasChoices = allowedChoices && allowedChoices.size > 0;

  switch (fieldType) {
    case "multipleSelects": {
      const list = arr && arr.length ? arr : str ? [str.trim()].filter(Boolean) : [];
      if (!hasChoices) return undefined;
      const filtered = list.filter((v) => matchesChoice(v));
      return filtered.length ? filtered : undefined;
    }
    case "singleSelect": {
      const val = str.trim();
      if (!val) return undefined;
      if (!hasChoices || !matchesChoice(val)) return undefined;
      return val;
    }
    case "multipleAttachments":
    case "multipleAttachment": // legacy
      if (!arr && !str) return undefined;
      const urls = arr && arr.length ? arr : [str.trim()].filter(Boolean);
      return urls.map((u) => (typeof u === "object" && u && "url" in u ? u : { url: String(u) }));
    default:
      return isArray && arr && arr.length ? arr.join(", ") : str.slice(0, 100000) || undefined;
  }
}

/**
 * Convert our product document to Airtable fields object.
 * If schema is provided ({ names, types }), only sends existing fields and formats by type (e.g. Tags as array for multipleSelects).
 */
export function productToAirtableFields(product, schema = null) {
  if (!product || typeof product !== "object") return {};
  const out = {};
  const p = { ...product };
  if (p.title && !p.name) p.name = p.title;
  if (p.description && !p.long_description) p.long_description = p.description;
  if (p.main_image && !p.primary_image) p.primary_image = p.main_image;
  if (p.images && !p.gallery_images) p.gallery_images = p.images;

  const allowedFieldNames = schema?.names ?? null;
  const fieldTypes = schema?.types ?? null;
  const schemaMap = allowedFieldNames ? mapToSchemaNames(allowedFieldNames) : null;

  for (const [ourKey, airtableCol] of Object.entries(PRODUCT_TO_AIRTABLE_FIELDS)) {
    const sendCol = schemaMap ? schemaMap.get(airtableCol) : airtableCol;
    if (schemaMap && !sendCol) continue;
    const v = p[ourKey];
    if (v === undefined || v === null) continue;

    const fieldType = fieldTypes?.get(sendCol);
    const allowedChoices = schema?.choices?.get(sendCol) ?? null;
    const isArrayLike =
      ["tags", "gallery_images", "images", "primary_image", "main_image"].includes(ourKey) ||
      Array.isArray(v);
    const formatted = formatValueForAirtable(v, fieldType, isArrayLike, allowedChoices);
    if (formatted === undefined) continue;
    out[sendCol] = formatted;
  }
  return out;
}

/**
 * Convert Airtable record to our product-like shape (for import).
 */
export function airtableRecordToProduct(record) {
  if (!record || !record.fields) return null;
  const f = record.fields;
  const colToKey = {};
  for (const [k, col] of Object.entries(PRODUCT_TO_AIRTABLE_FIELDS)) {
    colToKey[col] = k;
  }
  const out = { _airtableId: record.id };
  for (const [col, value] of Object.entries(f)) {
    const key = colToKey[col];
    if (key) out[key] = value;
    else out[col] = value;
  }
  if (out.images && !out.gallery_images) out.gallery_images = out.images;
  if (out.title && !out.name) out.name = out.title;
  if (out.description && !out.long_description) out.long_description = out.description;
  if (out.main_image && !out.primary_image) out.primary_image = out.main_image;
  return out;
}

/**
 * Fetch table schema for the products table.
 * Returns { names: Set of field names, types: Map of field name -> type } or null.
 * Uses Meta API; requires schema.bases:read.
 */
export async function getTableSchema(config) {
  try {
    const url = `${AIRTABLE_META_BASE}/bases/${config.baseId}/tables`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const tables = data.tables || [];
    const tableIdOrName = config.table;
    const table = tables.find(
      (t) =>
        t.id === tableIdOrName ||
        (t.name && t.name.trim().toLowerCase() === String(tableIdOrName).trim().toLowerCase())
    );
    if (!table || !Array.isArray(table.fields)) return null;
    const names = new Set(table.fields.map((f) => f.name).filter(Boolean));
    const types = new Map(table.fields.filter((f) => f.name).map((f) => [f.name, f.type]));
    const choices = new Map();
    for (const f of table.fields) {
      if (!f.name) continue;
      const rawChoices = f.options?.choices ?? f.typeOptions?.choices ?? [];
      if (!Array.isArray(rawChoices) || !rawChoices.length) continue;
      const optionNames = new Set(
        rawChoices.map((c) => (typeof c === "string" ? c : (c && c.name) || "").trim().toLowerCase()).filter(Boolean)
      );
      if (optionNames.size) choices.set(f.name, optionNames);
    }
    return { names, types, choices };
  } catch {
    return null;
  }
}

/** Backward compat: return just the Set of field names. */
export async function getTableFieldNames(config) {
  const schema = await getTableSchema(config);
  return schema ? schema.names : null;
}

async function airtableFetch(config, path, options = {}) {
  const url = `${AIRTABLE_API_BASE}/${config.baseId}/${encodeURIComponent(config.table)}${path}`;
  const init = {
    method: options.method || "GET",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  };
  if (options.body) init.body = options.body;
  const res = await fetch(url, init);
  if (!res.ok) {
    const err = await res.text();
    const msg = `Airtable ${res.status}: ${err}`;
    const errObj = new Error(msg);
    errObj.status = res.status;
    errObj.details = { baseId: config.baseId, table: config.table };
    throw errObj;
  }
  if (res.status === 204) return null;
  return res.json();
}

/**
 * List all records from the Airtable products table (with pagination).
 */
export async function listAirtableProducts() {
  const config = getConfig();
  if (!config) return { ok: false, error: "Airtable not configured", records: [] };
  const all = [];
  let offset = null;
  do {
    const path = offset ? `?offset=${offset}` : "";
    const data = await airtableFetch(config, path);
    all.push(...(data.records || []));
    offset = data.offset || null;
  } while (offset);
  return { ok: true, records: all };
}

/**
 * Sync our products to Airtable: create or update by Product ID.
 * Fetches table schema and only sends fields that exist in Airtable (avoids 422 UNKNOWN_FIELD_NAME).
 */
export async function syncProductsToAirtable(products) {
  const config = getConfig();
  if (!config) return { ok: false, error: "Airtable not configured", created: 0, updated: 0 };
  if (!Array.isArray(products) || products.length === 0) {
    return { ok: true, created: 0, updated: 0 };
  }

  const schema = await getTableSchema(config);

  const { records } = await listAirtableProducts();
  if (!records) return { ok: false, error: "Failed to list Airtable records", created: 0, updated: 0 };

  const byProductId = {};
  for (const r of records) {
    const id = r.fields?.[PRODUCT_TO_AIRTABLE_FIELDS.product_id] || r.fields?.["Product ID"];
    if (id) byProductId[id] = r.id;
  }

  let created = 0;
  let updated = 0;

  for (const p of products) {
    const productId = p.product_id || p.title || p.name;
    if (!productId) continue;
    const fields = productToAirtableFields(p, schema);
    if (Object.keys(fields).length === 0) continue;

    const existingId = byProductId[productId];
    if (existingId) {
      await airtableFetch(config, "", {
        method: "PATCH",
        body: JSON.stringify({ records: [{ id: existingId, fields }] }),
      });
      updated++;
    } else {
      await airtableFetch(config, "", {
        method: "POST",
        body: JSON.stringify({ records: [{ fields }] }),
      });
      created++;
    }
  }

  return { ok: true, created, updated };
}

export function isAirtableConfigured() {
  return !!(process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID);
}
