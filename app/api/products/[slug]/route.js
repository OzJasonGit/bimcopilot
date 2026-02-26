
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/app/utils/mongodb";

const ProductSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  short_description: { type: String, required: true },
  description: { type: String, required: true },
  license_type: { type: String, enum: ["student", "commercial"] },
  student_price: { type: Number, min: 0 },
  commercial_price: { type: Number, min: 0 },
  category: { type: String, required: true },
  tags: { type: String },
  main_image: { type: String },
  images: { type: [String], default: [] },
  status: { type: String, enum: ["Draft", "Published"], default: "Published" },
  outcome_promise: { type: String },
  requirements: { type: String },
  current_version: { type: String },
  last_updated: { type: String },
  seo_title: { type: String },
  seo_meta_description: { type: String },
  stripe_product_id: { type: String },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const { slug } = params;

    const product = await Product.findOne({ slug });

    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("GET /api/products/[slug] error:", error);
    return NextResponse.json({ success: false, message: `Server error: ${error.message}` }, { status: 500 });
  }
}
