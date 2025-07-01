import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/app/utils/mongodb";

const ProductSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  short_description: { type: String, required: true },
  description: { type: String, required: true },
  license_type: { type: String, enum: ["student", "commercial"], required: true },
  student_price: { type: Number, required: true, min: 0 },
  commercial_price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  tags: { type: String },
  images: { type: [String], required: true },
}, { timestamps: true });

ProductSchema.index({ slug: 1 });
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export async function GET() {
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await connectToDatabase();
      const products = await Product.find().sort({ createdAt: -1 }).lean();
      return NextResponse.json(products);
    } catch (error) {
      retries++;
      console.error(`GET /api/products attempt ${retries} failed:`, error);
      if (retries === maxRetries) {
        return NextResponse.json({ success: false, message: `Failed to fetch products: ${error.message}` }, { status: 500 });
      }
      await new Promise(resolve => setTimeout(resolve, 2000 * retries));
    }
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    if (!data.product_id || !data.title || !data.slug || !data.category || !data.images?.length) {
      return NextResponse.json({ success: false, message: "Required fields are missing" }, { status: 400 });
    }
    const exists = await Product.findOne({ slug: data.slug });
    if (exists) {
      return NextResponse.json({ success: false, message: "Product with this slug already exists" }, { status: 400 });
    }
    const product = new Product(data);
    await product.save();
    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ success: false, message: `Failed to create product: ${error.message}` }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    if (!data._id) {
      return NextResponse.json({ success: false, message: "Product ID is required" }, { status: 400 });
    }
    const updated = await Product.findByIdAndUpdate(data._id, data, { new: true, runValidators: true });
    if (!updated) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error("PUT /api/products error:", error);
    return NextResponse.json({ success: false, message: `Failed to update product: ${error.message}` }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "Product ID is required" }, { status: 400 });
    }
    const deleted = await Product.deleteOne({ product_id: id });
    if (deleted.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/products error:", error);
    return NextResponse.json({ success: false, message: `Failed to delete product: ${error.message}` }, { status: 500 });
  }
}