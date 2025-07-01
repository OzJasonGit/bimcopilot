import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dbj8h56jj",
  api_key: process.env.CLOUDINARY_API_KEY || "189196893527426",
  api_secret: process.env.CLOUDINARY_API_SECRET || "XJpnvxgey7UtfE9rVyyHhbfD5as",
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");
    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, message: "No files uploaded" }, { status: 400 });
    }

    const urls = [];
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        console.error(`Invalid file type: ${file.name}`); // Debug
        continue;
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      console.log(`Uploading file: ${file.name} to folder: Folders/Product_Main`); // Debug
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "Folders/Product_Main", resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      console.log("Uploaded image:", result); // Debug
      urls.push(result.secure_url);
    }

    if (urls.length === 0) {
      return NextResponse.json({ success: false, message: "No images uploaded successfully" }, { status: 400 });
    }

    return NextResponse.json({ success: true, urls });
  } catch (error) {
    console.error("Upload error:", error); // Debug
    return NextResponse.json({ success: false, message: `Failed to upload images: ${error.message}` }, { status: 500 });
  }
}