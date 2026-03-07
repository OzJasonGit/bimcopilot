"use client";

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import styles from "./ImageUploadField.module.css";

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = "product_images";

export default function ImageUploadField({ label, value, onChange, placeholder = "Or paste URL...", folder = "Stories", disabled }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(e) {
    const file = e?.target?.files?.[0];
    if (!file || !CLOUDINARY_CLOUD_NAME) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", folder);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error?.message || "Upload failed");
      }
      onChange(data.secure_url);
    } catch (err) {
      setError(err.message || "Failed to upload");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <div className={styles.row}>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading || disabled}
          className={styles.fileInput}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading || disabled}
          onClick={() => inputRef.current?.click()}
          className={styles.uploadBtn}
        >
          {uploading ? "Uploading…" : "Upload"}
        </Button>
        <Input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={styles.urlInput}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {value && (
        <div className={styles.preview}>
          <img src={value} alt="" onError={(e) => { e.target.style.display = "none"; }} />
        </div>
      )}
    </div>
  );
}
