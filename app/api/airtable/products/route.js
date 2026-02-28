import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/utils/auth";
import {
  listAirtableProducts,
  syncProductsToAirtable,
  airtableRecordToProduct,
  isAirtableConfigured,
} from "@/app/lib/airtable";
import { connectToDatabase } from "@/app/utils/mongodb";
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  product_id: String,
  title: String,
  slug: String,
  short_description: String,
  description: String,
  category: String,
  tags: String,
  main_image: String,
  images: Array,
  status: String,
  outcome_promise: String,
  requirements: String,
  current_version: String,
  last_updated: String,
  seo_title: String,
  seo_meta_description: String,
  stripe_product_id: String,
  stock_status: String,
  stock_quantity: Number,
}, { timestamps: true, strict: false });
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

/** GET: List records from Airtable (for import preview or pull) */
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 1) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }
    if (!isAirtableConfigured()) {
      return NextResponse.json(
        { error: "Airtable not configured", configured: false },
        { status: 503 }
      );
    }
    const result = await listAirtableProducts();
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error || "Failed to list Airtable" },
        { status: 502 }
      );
    }
    const products = (result.records || []).map((r) => airtableRecordToProduct(r)).filter(Boolean);
    return NextResponse.json({ products, total: products.length });
  } catch (err) {
    const is403 = err.status === 403 || (err.message && err.message.includes("403"));
    if (is403 && err.details) {
      console.error("GET /api/airtable/products Airtable 403. Check token base access and IDs:", err.details);
      return NextResponse.json(
        {
          error: "Airtable denied access (403). Ensure your token has 'data.records:read' and access to this base. Verify AIRTABLE_BASE_ID and AIRTABLE_PRODUCTS_TABLE in .env.",
          debug: { baseId: err.details.baseId, table: err.details.table },
        },
        { status: 502 }
      );
    }
    console.error("GET /api/airtable/products error:", err);
    return NextResponse.json(
      { error: err.message || "Airtable request failed" },
      { status: 500 }
    );
  }
}

/**
 * POST: action = "sync" | "import"
 * - sync: push our DB products to Airtable (body optional: { productIds } to sync only those)
 * - import: create/update our products from Airtable records (body optional: { productIds } to import only those)
 */
export async function POST(req) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 1) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }
    if (!isAirtableConfigured()) {
      return NextResponse.json(
        { error: "Airtable not configured", configured: false },
        { status: 503 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const action = body.action || "sync";

    if (action === "sync") {
      await connectToDatabase();
      let products = await Product.find().sort({ createdAt: -1 }).lean();
      const productIds = body.productIds;
      if (Array.isArray(productIds) && productIds.length > 0) {
        products = products.filter((p) => productIds.includes(p.product_id));
      }
      const result = await syncProductsToAirtable(products);
      return NextResponse.json({
        ok: true,
        created: result.created,
        updated: result.updated,
        message: `Synced: ${result.created} created, ${result.updated} updated in Airtable.`,
      });
    }

    if (action === "import") {
      const listResult = await listAirtableProducts();
      if (!listResult.ok || !listResult.records?.length) {
        return NextResponse.json(
          { error: listResult.error || "No records in Airtable" },
          { status: 400 }
        );
      }
      await connectToDatabase();
      const toImport = (body.productIds && body.productIds.length)
        ? listResult.records.filter((r) => {
            const id = r.fields?.["Product ID"];
            return body.productIds.includes(id);
          })
        : listResult.records;
      let imported = 0;
      for (const rec of toImport) {
        const p = airtableRecordToProduct(rec);
        if (!p || !(p.product_id || p.name)) continue;
        const slug = (p.slug || (p.name || p.title || "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")).slice(0, 200);
        const existing = await Product.findOne({
          $or: [{ product_id: p.product_id }, { slug }],
        });
        const payload = {
          product_id: p.product_id || p.name,
          title: p.name || p.title || "",
          slug: slug || p.product_id || "imported-" + Date.now(),
          short_description: p.short_description || "",
          description: p.long_description || p.description || "",
          category: p.category || "",
          tags: p.tags || "",
          main_image: p.primary_image || p.main_image || "",
          images: Array.isArray(p.gallery_images) ? p.gallery_images : (p.gallery_images ? String(p.gallery_images).split(",").map((s) => s.trim()) : []),
          status: p.status || "Draft",
          outcome_promise: p.outcome_promise || "",
          requirements: p.requirements || "",
          current_version: p.current_version || "",
          last_updated: p.last_updated || "",
          seo_title: p.seo_title || "",
          seo_meta_description: p.seo_meta_description || "",
          stripe_product_id: p.stripe_product_id || "",
          stock_status: p.stock_status || "in_stock",
          stock_quantity: p.stock_quantity != null ? Number(p.stock_quantity) : 0,
        };
        if (existing) {
          await Product.findByIdAndUpdate(existing._id, payload);
        } else {
          await Product.create(payload);
        }
        imported++;
      }
      return NextResponse.json({
        ok: true,
        imported,
        message: `Imported ${imported} product(s) from Airtable.`,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    const is403 = err.status === 403 || (err.message && err.message.includes("403"));
    if (is403 && err.details) {
      console.error("POST /api/airtable/products Airtable 403. Check token base access and IDs:", err.details);
      return NextResponse.json(
        {
          error: "Airtable denied access (403). Ensure your token has data scopes and access to this base. Verify AIRTABLE_BASE_ID and AIRTABLE_PRODUCTS_TABLE in .env.",
          debug: { baseId: err.details.baseId, table: err.details.table },
        },
        { status: 502 }
      );
    }
    console.error("POST /api/airtable/products error:", err);
    return NextResponse.json(
      { error: err.message || "Airtable request failed" },
      { status: 500 }
    );
  }
}
