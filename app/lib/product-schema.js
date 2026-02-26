/**
 * Canonical Product object and input fields (1 row per product).
 * Use these keys in forms and API; DB may alias for backward compatibility.
 *
 * Example row: "ISO 19650 BEP Template Pack"
 */

export const PRODUCT_FIELDS = [
  { key: "product_id", label: "Product ID (primary)", type: "string", required: true },
  { key: "name", label: "Name", type: "string", required: true },
  { key: "status", label: "Status", type: "enum", required: false, options: ["Published", "Draft"] },
  { key: "short_description", label: "Short description", type: "string", required: true },
  { key: "long_description", label: "Long description", type: "text", required: true },
  { key: "outcome_promise", label: "Outcome/Promise", type: "string", required: false },
  { key: "category", label: "Category (link)", type: "string", required: true },
  { key: "tags", label: "Tags (link)", type: "string", required: false },
  { key: "primary_image", label: "Primary image", type: "attachment", required: false },
  { key: "gallery_images", label: "Gallery images", type: "attachments", required: false },
  { key: "requirements", label: "Requirements", type: "string", required: false },
  { key: "current_version", label: "Current version", type: "string", required: false },
  { key: "last_updated", label: "Last updated", type: "date", required: false },
  { key: "seo_title", label: "SEO title", type: "string", required: false },
  { key: "seo_meta_description", label: "SEO meta description", type: "string", required: false },
  { key: "stripe_product_id", label: "Stripe product id", type: "string", required: false },
];

/** Map spec field names to internal/DB field names (for APIs that still use title/description/main_image/images) */
export const PRODUCT_FIELD_TO_INTERNAL = {
  name: "title",
  long_description: "description",
  primary_image: "main_image",
  gallery_images: "images",
};

/** Map internal field names to spec names (for reading from DB) */
export const INTERNAL_TO_PRODUCT_FIELD = {
  title: "name",
  description: "long_description",
  main_image: "primary_image",
  images: "gallery_images",
};

/**
 * Normalize API/DB product to canonical shape (name, long_description, primary_image, gallery_images).
 * Mutates and returns the same object with spec keys set from internal keys when present.
 */
export function productToSpecShape(product) {
  if (!product || typeof product !== "object") return product;
  const out = { ...product };
  if (out.title !== undefined && out.name === undefined) out.name = out.title;
  if (out.description !== undefined && out.long_description === undefined) out.long_description = out.description;
  if (out.main_image !== undefined && out.primary_image === undefined) out.primary_image = out.main_image;
  if (out.images !== undefined && out.gallery_images === undefined) out.gallery_images = out.images;
  return out;
}

/**
 * Normalize form/spec payload to internal shape for API/DB (title, description, main_image, images).
 */
export function specShapeToInternal(data) {
  if (!data || typeof data !== "object") return data;
  const out = { ...data };
  if (out.name !== undefined) out.title = out.name;
  if (out.long_description !== undefined) out.description = out.long_description;
  if (out.primary_image !== undefined) out.main_image = out.primary_image;
  if (out.gallery_images !== undefined) out.images = out.gallery_images;
  return out;
}
