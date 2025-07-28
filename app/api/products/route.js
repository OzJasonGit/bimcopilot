import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/app/utils/mongodb";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dbj8h56jj",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    // Find the product to get its images
    const product = await Product.findOne({ product_id: id });
    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }
    // Delete images from Cloudinary
    let cloudinaryErrors = [];
    for (const imageUrl of product.images) {
      try {
        // Extract public_id from the URL
        // Example: https://res.cloudinary.com/<cloud_name>/image/upload/v1234567890/Products_Main/slug/filename.jpg
        const matches = imageUrl.match(/\/upload\/([^\.]+)\./);
        let publicId = null;
        if (matches && matches[1]) {
          // Remove version if present
          publicId = matches[1].replace(/^v\d+\//, "");
        } else {
          // Fallback: try to get everything after '/upload/' and before file extension
          publicId = imageUrl.split("/upload/")[1]?.split(".")[0];
        }
        if (publicId) {
          await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
        } else {
          cloudinaryErrors.push(`Could not extract public_id from ${imageUrl}`);
        }
      } catch (err) {
        cloudinaryErrors.push(`Failed to delete image ${imageUrl}: ${err.message}`);
      }
    }
    // Delete the product from DB
    const deleted = await Product.deleteOne({ product_id: id });
    if (deleted.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Product not found in DB after image deletion" }, { status: 404 });
    }
    if (cloudinaryErrors.length > 0) {
      return NextResponse.json({ success: true, warning: "Product deleted but some images failed to delete", errors: cloudinaryErrors });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/products error:", error);
    return NextResponse.json({ success: false, message: `Failed to delete product: ${error.message}` }, { status: 500 });
  }
}