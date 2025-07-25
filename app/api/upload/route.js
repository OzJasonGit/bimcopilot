import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dbj8h56jj",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Ensure the request body is properly parsed as FormData
      const file = req.body.file;
      if (!file) {
        return res.status(400).json({ error: "No file provided" });
      }

      const result = await cloudinary.uploader.upload(file, {
        folder: "Products_Main",
        upload_preset: "product_images", // Replace with your actual upload preset name
      });

      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      res.status(500).json({ error: error.message || "Failed to upload image" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}