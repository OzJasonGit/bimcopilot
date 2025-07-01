import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/app/utils/mongodb";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
}, { timestamps: true });

CategorySchema.index({ slug: 1 });
const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

export async function GET() {
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await connectToDatabase();
      const categories = await Category.find().sort({ createdAt: -1 }).lean();
      return NextResponse.json(categories);
    } catch (error) {
      retries++;
      console.error(`GET /api/categories attempt ${retries} failed:`, error);
      if (retries === maxRetries) {
        return NextResponse.json({ success: false, message: `Failed to fetch categories: ${error.message}` }, { status: 500 });
      }
      await new Promise(resolve => setTimeout(resolve, 2000 * retries));
    }
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    if (!data.name || !data.slug) {
      return NextResponse.json({ success: false, message: "Name and slug are required" }, { status: 400 });
    }
    const exists = await Category.findOne({ slug: data.slug });
    if (exists) {
      return NextResponse.json({ success: false, message: "Category with this slug already exists" }, { status: 400 });
    }
    const newCategory = new Category(data);
    await newCategory.save();
    return NextResponse.json({ success: true, category: newCategory });
  } catch (error) {
    console.error("POST /api/categories error:", error);
    return NextResponse.json({ success: false, message: `Failed to create category: ${error.message}` }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    if (!data._id) {
      return NextResponse.json({ success: false, message: "Category ID is required" }, { status: 400 });
    }
    const updated = await Category.findByIdAndUpdate(data._id, data, { new: true, runValidators: true });
    if (!updated) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, category: updated });
  } catch (error) {
    console.error("PUT /api/categories error:", error);
    return NextResponse.json({ success: false, message: `Failed to update category: ${error.message}` }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ success: false, message: "Slug is required" }, { status: 400 });
    }
    const deleted = await Category.deleteOne({ slug });
    if (deleted.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/categories error:", error);
    return NextResponse.json({ success: false, message: `Failed to delete category: ${error.message}` }, { status: 500 });
  }
}