"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { debounce } from "lodash";
import { useFormatPrice } from '@/components/Context/CurrencyContext';
import Link from "next/link";
import { productToSpecShape, specShapeToInternal } from "@/app/lib/product-schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import styles from "./product_management.module.css";

// SCHEMAS
const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/i, "Slug must contain only letters, numbers, or hyphens"),
});

// Product object per spec: product_id, name, status, short_description, long_description, outcome_promise, category, tags, primary_image, gallery_images, requirements, current_version, last_updated, seo_title, seo_meta_description, stripe_product_id
const productSchema = z.object({
  product_id: z.string().min(1, "Product ID is required"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/i, "Slug must contain only letters, numbers, or hyphens"),
  short_description: z.string().min(5, "Short description must be at least 5 characters"),
  long_description: z.string().min(5, "Long description must be at least 5 characters"),
  license_type: z.enum(["student", "commercial"]).optional(),
  student_price: z.coerce.number().min(0).optional(),
  commercial_price: z.coerce.number().min(0).optional(),
  category: z.string().min(1, "Category is required"),
  tags: z.string().optional(),
  primary_image: z.string().url("Primary image must be a valid URL").optional().or(z.literal("")),
  gallery_images: z.array(z.string().url("Image must be a valid URL")).optional(),
  status: z.enum(["Draft", "Published"]).optional(),
  outcome_promise: z.string().optional(),
  requirements: z.string().optional(),
  current_version: z.string().optional(),
  last_updated: z.string().optional(),
  seo_title: z.string().optional(),
  seo_meta_description: z.string().optional(),
  stripe_product_id: z.string().optional(),
  stock_status: z.enum(["in_stock", "out_of_stock", "low_stock", "pre_order"]).optional(),
  stock_quantity: z.coerce.number().min(0).optional(),
});

export default function Product_Management() {
  const formatPrice = useFormatPrice();
  // Forms
  const catForm = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", slug: "" },
  });
  const prodForm = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      product_id: "",
      name: "",
      slug: "",
      short_description: "",
      long_description: "",
      license_type: "student",
      student_price: 0,
      commercial_price: 0,
      category: "",
      tags: "",
      primary_image: "",
      gallery_images: [],
      status: "Published",
      outcome_promise: "",
      requirements: "",
      current_version: "",
      last_updated: "",
      seo_title: "",
      seo_meta_description: "",
      stripe_product_id: "",
      stock_status: "in_stock",
      stock_quantity: 0,
    },
  });

  // State
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingCat, setEditingCat] = useState(null);
  const [editingProd, setEditingProd] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showCarousel, setShowCarousel] = useState(false);
  const [filterTags, setFilterTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [availableTags, setAvailableTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mainImageUploading, setMainImageUploading] = useState(false);
  const [carouselUploading, setCarouselUploading] = useState(false);
  const [formError, setFormError] = useState("");
  const [addMode, setAddMode] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterStock, setFilterStock] = useState("all");
  const [airtableConfigured, setAirtableConfigured] = useState(null);
  const [airtableSyncing, setAirtableSyncing] = useState(false);
  const [airtableImporting, setAirtableImporting] = useState(false);
  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const mainImageInput = useRef();
  const carouselInput = useRef();
  const itemsPerPage = 25;
  const productPanelOpen = addMode || editingProd !== null;

  // Cloudinary config
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!CLOUDINARY_CLOUD_NAME) {
    throw new Error("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set in your environment variables.");
  }

  // Auto-generate slug
  const generateSlug = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  // Check if Airtable is configured (GET returns 503 when not configured)
  useEffect(() => {
    let cancelled = false;
    fetch("/api/airtable/products")
      .then((r) => {
        if (cancelled) return;
        setAirtableConfigured(r.status === 503 ? false : r.ok);
      })
      .catch(() => { if (!cancelled) setAirtableConfigured(false); });
    return () => { cancelled = true; };
  }, []);

  const handleSyncToAirtable = async () => {
    setAirtableSyncing(true);
    try {
      const res = await fetch("/api/airtable/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sync" }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        toast.success(data.message || "Synced to Airtable.");
      } else {
        toast.error(data.error || "Sync failed.");
      }
    } catch (e) {
      toast.error(e.message || "Sync failed.");
    } finally {
      setAirtableSyncing(false);
    }
  };

  const handleImportFromAirtable = async () => {
    setAirtableImporting(true);
    try {
      const res = await fetch("/api/airtable/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "import" }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        toast.success(data.message || "Imported from Airtable.");
        const prodRes = await fetch("/api/products");
        if (prodRes.ok) {
          const list = await prodRes.json();
          setProducts(Array.isArray(list) ? list : []);
        }
      } else {
        toast.error(data.error || "Import failed.");
      }
    } catch (e) {
      toast.error(e.message || "Import failed.");
    } finally {
      setAirtableImporting(false);
    }
  };

  // Load initial data
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const catRes = await fetch("/api/categories");
        const prodRes = await fetch("/api/products");

        if (!catRes.ok) {
          const errorData = await catRes.json();
          throw new Error(errorData.message || "Failed to fetch categories");
        }
        if (!prodRes.ok) {
          const errorData = await prodRes.json();
          throw new Error(errorData.message || "Failed to fetch products");
        }

        const catData = await catRes.json();
        const prodData = await prodRes.json();

        setCategories(Array.isArray(catData) ? catData : catData.data || []);
        setProducts(Array.isArray(prodData.data) ? prodData.data : prodData || []);

        const tags = [
          ...new Set(
            prodData.data?.flatMap((p) =>
              p.tags ? p.tags.split(",").map((t) => t.trim()) : []
            ) || []
          ),
        ];
        setAvailableTags(tags);
      } catch (error) {
        toast.error(error.message || "Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Auto-generate slugs
  useEffect(() => {
    const subscription = catForm.watch((value, { name }) => {
      if (name === "name" && value.name) {
        catForm.setValue("slug", generateSlug(value.name));
      }
    });
    return () => subscription.unsubscribe();
  }, [catForm]);

  useEffect(() => {
    const subscription = prodForm.watch((value, { name }) => {
      if (name === "name" && value.name) {
        prodForm.setValue("slug", generateSlug(value.name));
      }
    });
    return () => subscription.unsubscribe();
  }, [prodForm]);

// Inside Product_Management.jsx
// Image upload handlers
async function handleMainImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  setMainImageUploading(true);
  setFormError("");
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "product_images"); 
    // Use the product slug as a subfolder
    const productSlug = prodForm.getValues("slug") || "Uncategorized";
    formData.append("folder", `Products_Main/${productSlug}`);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    console.log("Main image upload response:", data); // Debug log
    if (!res.ok || data.error) {
      throw new Error(data.error?.message || "Failed to upload image");
    }
    prodForm.setValue("primary_image", data.secure_url);
  } catch (error) {
    console.error("Main image upload error:", error);
    toast.error(error.message || "Failed to upload main image");
    setFormError(error.message || "Failed to upload main image");
  } finally {
    setMainImageUploading(false);
  }
}

async function handleCarouselUpload(e) {
  const files = Array.from(e.target.files);
  if (!files.length) return;
  setCarouselUploading(true);
  setFormError("");
  try {
    const urls = [];
    // Use the product slug as a subfolder
    const productSlug = prodForm.getValues("slug") || "Uncategorized";
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "product_images"); // Replace with your actual upload preset name
      formData.append("folder", `Products_Main/${productSlug}`);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      console.log("Carousel image upload response:", data); // Debug log
      if (!res.ok || data.error) {
        throw new Error(data.error?.message || "Failed to upload image");
      }
      urls.push(data.secure_url);
    }
    prodForm.setValue("gallery_images", [...prodForm.getValues("gallery_images"), ...urls].slice(0, 5));
  } catch (error) {
    console.error("Carousel image upload error:", error);
    toast.error(error.message || "Failed to upload carousel images");
    setFormError(error.message || "Failed to upload carousel images");
  } finally {
    setCarouselUploading(false);
  }
}

  function removeCarouselImage(idx) {
    const currentImages = prodForm.getValues("gallery_images");
    prodForm.setValue("gallery_images", currentImages.filter((_, i) => i !== idx));
  }

  // CATEGORY CRUD
  const submitCategory = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("/api/categories", {
        method: editingCat ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...(editingCat || {}), ...data }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Category operation failed");
      }
      toast.success("Category saved");
      catForm.reset();
      setEditingCat(null);
      setCategories(await fetch("/api/categories").then((r) => r.json()));
    } catch (error) {
      toast.error(error.message || "Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (slug) => {
    if (!confirm(`Are you sure you want to delete the category "${slug}"?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/categories?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete category");
      }
      toast.success("Category deleted");
      setCategories((prev) => prev.filter((c) => c.slug !== slug));
    } catch (error) {
      toast.error(error.message || "Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  // PRODUCT CRUD
  const submitProduct = async (data) => {
    setLoading(true);
    setFormError("");
    try {
      // Validate product_id uniqueness
      let product_id = data.product_id.trim();
      if (!product_id) {
        product_id = (data.name.replace(/\s+/g, "-").toLowerCase() + "-" + Date.now()).slice(0, 32);
        prodForm.setValue("product_id", product_id);
        data.product_id = product_id;
      } else {
        const exists = products.some(
          (p) => p.product_id === product_id && (!editingProd || p.product_id !== editingProd.product_id)
        );
        if (exists) {
          setFormError("Product ID is already used. Choose a unique ID or leave blank for auto.");
          throw new Error("Product ID is already used");
        }
      }

      const formattedData = {
        ...data,
        student_price: Number(data.student_price ?? 0),
        commercial_price: Number(data.commercial_price ?? 0),
        tags: data.tags ? data.tags.split(",").map((t) => t.trim()).join(",") : "",
        gallery_images: data.gallery_images || [],
        status: data.status || "Published",
        outcome_promise: data.outcome_promise || "",
        requirements: data.requirements || "",
        current_version: data.current_version || "",
        last_updated: data.last_updated || "",
        seo_title: data.seo_title || "",
        seo_meta_description: data.seo_meta_description || "",
        stripe_product_id: data.stripe_product_id || "",
        primary_image: data.primary_image || "",
        stock_status: data.stock_status || "in_stock",
        stock_quantity: Number(data.stock_quantity ?? 0),
      };

      const validation = productSchema.safeParse(formattedData);
      if (!validation.success) {
        const errors = validation.error.issues
          .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
          .join("; ");
        setFormError(`Validation failed: ${errors}`);
        throw new Error(errors);
      }

      // Map spec shape to internal (title, description, main_image, images) for API/DB
      const payload = specShapeToInternal(formattedData);
      if (editingProd?._id) payload._id = editingProd._id;

      const res = await fetch("/api/products", {
        method: editingProd ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Product operation failed");
      }

      toast.success(`Product ${editingProd ? "updated" : "added"} successfully`);
      prodForm.reset();
      setEditingProd(null);
      setAddMode(false);
      setProducts(
        await fetch("/api/products")
          .then((r) => r.json())
          .then((d) => (Array.isArray(d.data) ? d.data : d))
      );
    } catch (error) {
      console.error("Product submission error:", error);
      if (!formError) setFormError(error.message || "Failed to save product");
      toast.error(error.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm(`Are you sure you want to delete the product with ID "${id}"?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/products?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete product");
      }
      toast.success("Product deleted");
      setProducts((prev) => prev.filter((p) => p.product_id !== id));
      if (preview?.product_id === id) setPreview(null);
      setSelectedIds((prev) => { const next = new Set(prev); next.delete(id); return next; });
    } catch (error) {
      toast.error(error.message || "Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAllOnPage = () => {
    const pageIds = paginatedProducts.map((p) => p.product_id);
    const allSelected = pageIds.length > 0 && pageIds.every((id) => selectedIds.has(id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allSelected) pageIds.forEach((id) => next.delete(id));
      else pageIds.forEach((id) => next.add(id));
      return next;
    });
  };

  const clearSelection = () => setSelectedIds(new Set());

  const bulkDeleteSelected = async () => {
    const ids = Array.from(selectedIds);
    if (!ids.length) return;
    if (!confirm(`Delete ${ids.length} selected product(s)? This cannot be undone.`)) return;
    setBulkDeleting(true);
    let ok = 0;
    let fail = 0;
    for (const id of ids) {
      try {
        const res = await fetch(`/api/products?id=${encodeURIComponent(id)}`, { method: "DELETE" });
        if (res.ok) ok++;
        else fail++;
      } catch {
        fail++;
      }
    }
    setBulkDeleting(false);
    const idSet = new Set(ids);
    clearSelection();
    if (preview && idSet.has(preview.product_id)) setPreview(null);
    if (ok) toast.success(`${ok} product(s) deleted.`);
    if (fail) toast.error(`${fail} product(s) failed to delete.`);
    if (ok) {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : data.data ?? []);
    }
  };

  const bulkSyncSelectedToAirtable = async () => {
    const ids = Array.from(selectedIds);
    if (!ids.length) return;
    setAirtableSyncing(true);
    try {
      const res = await fetch("/api/airtable/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sync", productIds: ids }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        toast.success(data.message || `Synced ${ids.length} product(s) to Airtable.`);
      } else {
        toast.error(data.error || "Sync failed.");
      }
    } catch (e) {
      toast.error(e.message || "Sync failed.");
    } finally {
      setAirtableSyncing(false);
    }
  };

  // Tag filter and search
  const handleTagFilter = useCallback(
    debounce((value) => {
      setFilterTags(value ? value.split(",").map((t) => t.trim()) : []);
    }, 300),
    []
  );

  const filteredProducts = useMemo(() => {
    let result = products;
    if (filterTags.length) {
      result = result.filter((p) =>
        p.tags && filterTags.every((tag) => p.tags.split(",").map((t) => t.trim()).includes(tag))
      );
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          (p.name || p.title || "").toLowerCase().includes(q) ||
          (p.product_id || "").toLowerCase().includes(q)
      );
    }
    if (filterCategory && filterCategory !== "all") {
      result = result.filter((p) => (p.category || "") === filterCategory);
    }
    if (filterStatus && filterStatus !== "all") {
      result = result.filter((p) => (p.status || "Published") === filterStatus);
    }
    if (filterStock && filterStock !== "all") {
      result = result.filter((p) => (p.stock_status || "in_stock") === filterStock);
    }
    return result;
  }, [products, filterTags, searchQuery, filterCategory, filterStatus, filterStock]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Cancel editing
  const cancelEditing = (form, setEditing) => {
    form.reset();
    setEditing(null);
    setFormError("");
  };

  const closePanel = () => {
    setAddMode(false);
    setEditingProd(null);
    prodForm.reset();
    setFormError("");
  };

  const truncate = (str, len = 35) => {
    if (!str || typeof str !== "string") return "—";
    const s = str.replace(/\s+/g, " ").trim();
    return s.length > len ? s.slice(0, len) + "…" : s;
  };

  const defaultProductValues = {
    product_id: "", name: "", slug: "", short_description: "", long_description: "",
    license_type: "student", student_price: 0, commercial_price: 0, category: "", tags: "",
    primary_image: "", gallery_images: [], status: "Published", outcome_promise: "",
    requirements: "", current_version: "", last_updated: "", seo_title: "", seo_meta_description: "", stripe_product_id: "",
    stock_status: "in_stock", stock_quantity: 0,
  };

  return (
    <div className={styles.container}>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="text-white text-lg">Loading...</div>
        </div>
      )}
      <header className={styles.toolbar}>
        <div className={styles.toolbarInner }>
          <div>
            <h1 className={styles.toolbarTitle}>Products</h1>
            <p className={styles.toolbarSubtitle}>Manage your product catalog</p>
          </div>
          <div className={styles.toolbarActions}>
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-40 sm:w-52 border-gray-200 rounded-md bg-white"
            />
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="h-9 w-36 border-gray-200 rounded-md bg-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="h-9 w-28 border-gray-200 rounded-md bg-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStock} onValueChange={setFilterStock}>
              <SelectTrigger className="h-9 w-28 border-gray-200 rounded-md bg-white">
                <SelectValue placeholder="Stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All stock</SelectItem>
                <SelectItem value="in_stock">In stock</SelectItem>
                <SelectItem value="out_of_stock">Out of stock</SelectItem>
                <SelectItem value="low_stock">Low stock</SelectItem>
                <SelectItem value="pre_order">Pre-order</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="h-9 rounded-md"
              onClick={() => { setAddMode(true); setEditingProd(null); prodForm.reset(defaultProductValues); }}
            >
              Add product
            </Button>
            <Button variant="outline" className="h-9 rounded-md border-gray-200" onClick={() => setCategoriesOpen(true)}>
              Categories
            </Button>
            {airtableConfigured === true && (
              <>
                <Button
                  variant="outline"
                  className="h-9 rounded-md border-gray-200"
                  onClick={handleSyncToAirtable}
                  disabled={airtableSyncing}
                >
                  {airtableSyncing ? "Syncing…" : "Sync to Airtable"}
                </Button>
                <Button
                  variant="outline"
                  className="h-9 rounded-md border-gray-200"
                  onClick={handleImportFromAirtable}
                  disabled={airtableImporting}
                >
                  {airtableImporting ? "Importing…" : "Import from Airtable"}
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      {selectedIds.size > 0 && (
        <div className={styles.bulkBar}>
          <span className="text-sm font-medium text-blue-800">{selectedIds.size} selected</span>
          <Button variant="outline" size="sm" className="h-8" onClick={clearSelection}>
            Clear selection
          </Button>
          <Button variant="destructive" size="sm" className="h-8" onClick={bulkDeleteSelected} disabled={bulkDeleting}>
            {bulkDeleting ? "Deleting…" : "Delete selected"}
          </Button>
          {airtableConfigured === true && (
            <Button variant="outline" size="sm" className="h-8" onClick={bulkSyncSelectedToAirtable} disabled={airtableSyncing}>
              {airtableSyncing ? "Syncing…" : "Sync selected to Airtable"}
            </Button>
          )}
        </div>
      )}
      <div className={styles.tableWrap}>
        <div className={styles.tableCard}>
          <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th} style={{ width: 40 }}>
                  <input
                    type="checkbox"
                    checked={paginatedProducts.length > 0 && paginatedProducts.every((p) => selectedIds.has(p.product_id))}
                    onChange={toggleSelectAllOnPage}
                    aria-label="Select all on page"
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </th>
                <th className={styles.th} style={{ width: 48 }} />
                <th className={styles.th}>Name</th>
                <th className={styles.th} style={{ width: 112 }}>Status</th>
                <th className={styles.th}>Category</th>
                <th className={styles.th} style={{ maxWidth: 140 }}>Tags</th>
                <th className={styles.th} style={{ minWidth: 120 }}>Short description</th>
                <th className={styles.th} style={{ minWidth: 100 }}>Outcome/Promise</th>
                <th className={styles.th} style={{ minWidth: 100 }}>Requirements</th>
                <th className={styles.th} style={{ width: 96 }}>Version</th>
                <th className={styles.th} style={{ width: 112 }}>Updated</th>
                <th className={styles.th} style={{ minWidth: 120 }}>SEO title</th>
                <th className={styles.th} style={{ width: 100 }}>Stripe ID</th>
                <th className={styles.th} style={{ width: 100 }}>Stock</th>
                <th className={styles.th} style={{ width: 72 }}>Qty</th>
                <th className={styles.th} style={{ width: 100 }}>Actions</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {paginatedProducts.length === 0 && (
                <tr><td colSpan={16} className={`${styles.td} ${styles.emptyState}`}>No products yet. Click &quot;Add product&quot; to create one.</td></tr>
              )}
              {paginatedProducts.map((p) => (
                <tr key={p.product_id} className={styles.tr}>
                  <td className={styles.td} style={{ width: 40 }}>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(p.product_id)}
                      onChange={() => toggleSelect(p.product_id)}
                      aria-label={`Select ${p.name || p.title || p.product_id}`}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </td>
                  <td className={styles.td}>
                    <div className={styles.thumb}>
                      {(p.main_image || p.primary_image) && (
                        <img src={p.main_image || p.primary_image} alt="" onError={(e) => { e.target.onerror = null; e.target.style.display = "none"; }} />
                      )}
                    </div>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.nameCell}>{(p.name || p.title) || "—"}</div>
                    <div className={styles.productId}>{p.product_id}</div>
                  </td>
                  <td className={styles.td}>
                    <span className={`${styles.statusPill} ${p.status === "Published" ? styles.statusPublished : styles.statusDraft}`}>
                      {p.status || "Published"}
                    </span>
                  </td>
                  <td className={styles.td}>{p.category || "—"}</td>
                  <td className={styles.td} style={{ maxWidth: 140 }} title={p.tags || ""}>{p.tags ? (String(p.tags).length > 40 ? String(p.tags).slice(0, 40) + "…" : p.tags) : "—"}</td>
                  <td className={styles.td} title={p.short_description || ""}>{truncate((p.short_description || "").replace(/<[^>]*>/g, ""), 40)}</td>
                  <td className={styles.td} title={p.outcome_promise || ""}>{truncate((p.outcome_promise || "").replace(/<[^>]*>/g, ""), 35)}</td>
                  <td className={styles.td} title={p.requirements || ""}>{truncate((p.requirements || "").replace(/<[^>]*>/g, ""), 35)}</td>
                  <td className={styles.td}>{p.current_version || "—"}</td>
                  <td className={styles.td}>{p.last_updated || "—"}</td>
                  <td className={styles.td} title={p.seo_title || ""}>{truncate((p.seo_title || "").replace(/<[^>]*>/g, ""), 40)}</td>
                  <td className={styles.td} style={{ fontSize: "0.75rem" }} title={p.stripe_product_id || ""}>{p.stripe_product_id ? truncate(p.stripe_product_id, 18) : "—"}</td>
                  <td className={styles.td}>
                    <span className={`${styles.statusPill} ${(p.stock_status || "in_stock") === "in_stock" ? styles.statusPublished : (p.stock_status || "") === "out_of_stock" ? "bg-red-50 text-red-700" : (p.stock_status || "") === "low_stock" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"}`} style={{ fontSize: "0.7rem" }}>
                      {(p.stock_status || "in_stock") === "in_stock" ? "In stock" : (p.stock_status || "") === "out_of_stock" ? "Out of stock" : (p.stock_status || "") === "low_stock" ? "Low stock" : (p.stock_status || "") === "pre_order" ? "Pre-order" : "In stock"}
                    </span>
                  </td>
                  <td className={styles.td}>{p.stock_quantity != null && p.stock_quantity !== "" ? Number(p.stock_quantity) : "—"}</td>
                  <td className={styles.td}>
                    <div className="flex items-center gap-1 flex-wrap">
                      <Link href={`/products/${p.slug || p.product_id}`} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm" className="h-8 text-gray-600 hover:text-gray-900">View</Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="h-8 text-gray-600 hover:text-gray-900" onClick={() => { setAddMode(false); const spec = productToSpecShape(p); prodForm.reset({ product_id: p.product_id, name: spec.name ?? p.title ?? "", slug: p.slug ?? "", short_description: p.short_description ?? "", long_description: spec.long_description ?? p.description ?? "", category: p.category ?? "", tags: p.tags ?? "", primary_image: spec.primary_image ?? p.main_image ?? "", gallery_images: spec.gallery_images ?? p.images ?? [], status: p.status ?? "Published", outcome_promise: p.outcome_promise ?? "", requirements: p.requirements ?? "", current_version: p.current_version ?? "", last_updated: p.last_updated ?? "", seo_title: p.seo_title ?? "", seo_meta_description: p.seo_meta_description ?? "", stripe_product_id: p.stripe_product_id ?? "", stock_status: p.stock_status ?? "in_stock", stock_quantity: p.stock_quantity ?? 0, license_type: p.license_type ?? "student", student_price: p.student_price ?? 0, commercial_price: p.commercial_price ?? 0 }); setEditingProd(p); }}>Edit</Button>
                      <Button variant="ghost" size="sm" className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => deleteProduct(p.product_id)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
        {totalPages > 1 && (
          <div className={styles.paginationWrap}>
            <p className={styles.paginationInfo}>Page {currentPage} of {totalPages}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage((c) => c - 1)}>Previous</Button>
              <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage((c) => c + 1)}>Next</Button>
            </div>
          </div>
        )}
      </div>
      {productPanelOpen && (
        <div className={styles.panelOverlay}>
          <div className={styles.panelBackdrop} onClick={closePanel} aria-hidden />
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>{addMode ? "New product" : `Edit: ${editingProd?.name || editingProd?.title || "Product"}`}</h2>
              <Button variant="ghost" size="sm" onClick={closePanel}>Close</Button>
            </div>
            <div className={styles.panelBody}>
              <Form {...prodForm}>
                <form onSubmit={prodForm.handleSubmit(submitProduct)} className="space-y-4">
                <FormField
                  control={prodForm.control}
                  name="product_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Product ID (primary)</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md" placeholder="e.g. iso19650-bep-template-pack" />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={prodForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md" placeholder="e.g. ISO 19650 BEP Template Pack" />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={prodForm.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Slug</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md" placeholder="Auto-generated from name" />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={prodForm.control}
                  name="short_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Short description</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md" placeholder="e.g. A plug-and-play BEP template pack aligned to ISO 19650." />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={prodForm.control}
                  name="long_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Long description</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md min-h-[100px]" placeholder="e.g. Includes BEP structure, MIDP/TIDP examples, naming rules, and checklists..." />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={prodForm.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Tags (link)</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md" placeholder="e.g. ISO 19650, BEP, MIDP, TIDP, Naming" />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={prodForm.control}
                  name="license_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">License Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md">
                            <SelectValue placeholder="Select license type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={prodForm.control}
                  name="student_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Student Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md"
                          placeholder="Enter student price"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={prodForm.control}
                  name="commercial_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Commercial Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md"
                          placeholder="Enter commercial price"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={prodForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((c) => (
                            <SelectItem key={c.slug} value={c.slug}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={prodForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || "Published"}>
                        <FormControl>
                          <SelectTrigger className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Draft">Draft</SelectItem>
                          <SelectItem value="Published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={prodForm.control}
                  name="outcome_promise"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Outcome / Promise</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md"
                          placeholder="e.g. Write a credible BEP in hours, not days."
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={prodForm.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Requirements</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md"
                          placeholder="e.g. Word/Google Docs + basic ISO 19650 familiarity"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={prodForm.control}
                  name="current_version"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Current version</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md"
                          placeholder="e.g. v1.0"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={prodForm.control}
                  name="last_updated"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Last updated</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="date"
                          className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md"
                          placeholder="e.g. 2026-02-25"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={prodForm.control}
                  name="seo_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">SEO title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md"
                          placeholder="e.g. ISO 19650 BEP Template Pack (Download)"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={prodForm.control}
                  name="seo_meta_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">SEO meta description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md min-h-[80px]"
                          placeholder="e.g. Download an ISO 19650-aligned BEP template pack with MIDP/TIDP examples and naming rules."
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={prodForm.control}
                  name="stripe_product_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Stripe product id</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md"
                          placeholder="e.g. prod_XXXX"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={prodForm.control}
                  name="stock_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Stock status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || "in_stock"}>
                        <FormControl>
                          <SelectTrigger className="border-gray-300 rounded-md">
                            <SelectValue placeholder="Stock status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="in_stock">In stock</SelectItem>
                          <SelectItem value="out_of_stock">Out of stock</SelectItem>
                          <SelectItem value="low_stock">Low stock</SelectItem>
                          <SelectItem value="pre_order">Pre-order</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={prodForm.control}
                  name="stock_quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Items in stock (quantity)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          {...field}
                          className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md"
                          placeholder="0"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={prodForm.control}
                  name="primary_image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Primary image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          ref={mainImageInput}
                          onChange={handleMainImageUpload}
                          disabled={mainImageUploading || !prodForm.getValues("slug")}
                          className="border-gray-300 rounded-md"
                        />
                      </FormControl>
                      {mainImageUploading && (
                        <div className="text-sm text-gray-500 mt-2">Uploading...</div>
                      )}
                      {!prodForm.getValues("slug") && (
                        <div className="text-xs text-red-500 mt-1">Enter product name first to enable image upload.</div>
                      )}
                      {field.value && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">Primary image preview:</p>
                          <img
                            src={field.value}
                            alt="Primary image preview"
                            className="w-40 h-40 object-cover rounded-md shadow-sm"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/150";
                            }}
                          />
                        </div>
                      )}
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={prodForm.control}
                  name="gallery_images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Gallery images (optional, up to 5)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          ref={carouselInput}
                          onChange={handleCarouselUpload}
                          disabled={carouselUploading || !prodForm.getValues("slug")}
                          className="border-gray-300 rounded-md"
                        />
                      </FormControl>
                      {carouselUploading && (
                        <div className="text-sm text-gray-500 mt-2">Uploading...</div>
                      )}
                      {!prodForm.getValues("slug") && (
                        <div className="text-xs text-red-500 mt-1">Enter product name first to enable image upload.</div>
                      )}
                      {field.value?.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">Gallery images preview:</p>
                          <div className="flex flex-wrap gap-3">
                            {field.value.map((img, idx) => (
                              <div key={idx} className="relative">
                                <img
                                  src={img}
                                  alt={`Carousel Image ${idx + 1}`}
                                  className="w-24 h-24 object-cover rounded-md shadow-sm"
                                  onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/150";
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => removeCarouselImage(idx)}
                                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md hover:bg-red-700 transition"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                {formError && <div className="text-red-500 text-sm bg-red-50 p-2 rounded-md">{formError}</div>}
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={loading || mainImageUploading || carouselUploading}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 transition"
                  >
                    {editingProd ? "Update" : "Submit"}
                  </Button>
                  {editingProd && (
                    <>
                      <Button type="button" variant="destructive" className="bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 transition" onClick={() => deleteProduct(editingProd.product_id)}>Delete</Button>
                      <Button type="button" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-2 transition" onClick={() => { cancelEditing(prodForm, setEditingProd); closePanel(); }}>Cancel</Button>
                    </>
                  )}
                </div>
              </form>
            </Form>
            </div>
          </div>
        </div>
      )}
      <Dialog open={categoriesOpen} onOpenChange={setCategoriesOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Categories</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Form {...catForm}>
              <form onSubmit={catForm.handleSubmit(submitCategory)} className="space-y-4">
                <FormField control={catForm.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">Category Name</FormLabel>
                    <FormControl><Input {...field} className="border-gray-300 rounded-md" placeholder="Enter category name" /></FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )} />
                <FormField control={catForm.control} name="slug" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">Slug</FormLabel>
                    <FormControl><Input {...field} className="border-gray-300 rounded-md" placeholder="Auto-generated" /></FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )} />
                <div className="flex gap-3">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-md">{editingCat ? "Update" : "Submit"}</Button>
                  {editingCat && (
                    <>
                      <Button type="button" variant="destructive" size="sm" onClick={() => deleteCategory(editingCat.slug)}>Delete</Button>
                      <Button type="button" variant="outline" size="sm" onClick={() => cancelEditing(catForm, setEditingCat)}>Cancel</Button>
                    </>
                  )}
                </div>
              </form>
            </Form>
            <h4 className="text-sm font-semibold text-gray-700 mt-4">Existing categories</h4>
            {categories.length === 0 && <p className="text-gray-500 text-sm">No categories yet.</p>}
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {categories.map((c) => (
                <li key={c.slug} className="flex justify-between items-center p-2 bg-gray-50 rounded-md text-sm">
                  <span className="text-gray-700">{c.name}</span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8" onClick={() => { catForm.reset(c); setEditingCat(c); }}>Edit</Button>
                    <Button variant="ghost" size="sm" className="h-8 text-red-600 hover:text-red-700" onClick={() => deleteCategory(c.slug)}>Delete</Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}