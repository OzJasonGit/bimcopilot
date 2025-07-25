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
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { debounce } from "lodash";

// SCHEMAS
const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/i, "Slug must contain only letters, numbers, or hyphens"),
});

const productSchema = z.object({
  product_id: z.string().min(1, "Product ID is required"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z.string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/i, "Slug must contain only letters, numbers, or hyphens"),
  short_description: z.string().min(5, "Short description must be at least 5 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  license_type: z.enum(["student", "commercial"]),
  student_price: z.coerce.number().positive("Student price must be positive"),
  commercial_price: z.coerce.number().positive("Commercial price must be positive"),
  category: z.string().min(1, "Category is required"),
  tags: z.string().optional(),
  main_image: z.string().url("Main image must be a valid URL").optional().or(z.literal("")),
  images: z.array(z.string().url("Image must be a valid URL")).optional(),
});

export default function Product_Management() {
  // Forms
  const catForm = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", slug: "" },
  });
  const prodForm = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      product_id: "",
      title: "",
      slug: "",
      short_description: "",
      description: "",
      license_type: "student",
      student_price: 0,
      commercial_price: 0,
      category: "",
      tags: "",
      main_image: "",
      images: [],
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
  const mainImageInput = useRef();
  const carouselInput = useRef();
  const itemsPerPage = 10;

  // Cloudinary config
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!CLOUDINARY_CLOUD_NAME) {
    throw new Error("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set in your environment variables.");
  }

  // Auto-generate slug
  const generateSlug = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

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
      if (name === "title" && value.title) {
        prodForm.setValue("slug", generateSlug(value.title));
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
    prodForm.setValue("main_image", data.secure_url);
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
    prodForm.setValue("images", [...prodForm.getValues("images"), ...urls].slice(0, 5));
  } catch (error) {
    console.error("Carousel image upload error:", error);
    toast.error(error.message || "Failed to upload carousel images");
    setFormError(error.message || "Failed to upload carousel images");
  } finally {
    setCarouselUploading(false);
  }
}

  function removeCarouselImage(idx) {
    const currentImages = prodForm.getValues("images");
    prodForm.setValue("images", currentImages.filter((_, i) => i !== idx));
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
        product_id = (data.title.replace(/\s+/g, "-").toLowerCase() + "-" + Date.now()).slice(0, 32);
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
        student_price: Number(data.student_price),
        commercial_price: Number(data.commercial_price),
        tags: data.tags ? data.tags.split(",").map((t) => t.trim()).join(",") : "",
        images: data.images || [],
      };

      const validation = productSchema.safeParse(formattedData);
      if (!validation.success) {
        const errors = validation.error.issues
          .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
          .join("; ");
        setFormError(`Validation failed: ${errors}`);
        throw new Error(errors);
      }

      const res = await fetch("/api/products", {
        method: editingProd ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Product operation failed");
      }

      toast.success(`Product ${editingProd ? "updated" : "added"} successfully`);
      prodForm.reset();
      setEditingProd(null);
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
    } catch (error) {
      toast.error(error.message || "Failed to delete product");
    } finally {
      setLoading(false);
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
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.product_id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [products, filterTags, searchQuery]);

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

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="text-white text-lg">Loading...</div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-gray-800">Product Management Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Forms */}
        <div className="space-y-8">
          {/* Category Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              {editingCat ? "Edit Category" : "Add Category"}
            </h3>
            <Form {...catForm}>
              <form onSubmit={catForm.handleSubmit(submitCategory)} className="space-y-4">
                <FormField
                  control={catForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Category Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md"
                          placeholder="Enter category name"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={catForm.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Slug</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md"
                          placeholder="Auto-generated slug"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 transition"
                  >
                    {editingCat ? "Update" : "Submit"}
                  </Button>
                  {editingCat && (
                    <>
                      <Button
                        type="button"
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 transition"
                        onClick={() => deleteCategory(editingCat.slug)}
                      >
                        Delete
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-2 transition"
                        onClick={() => cancelEditing(catForm, setEditingCat)}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </form>
            </Form>
          </div>

          {/* Product Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              {editingProd ? "Edit Product" : "Add Product"}
            </h3>
            <Form {...prodForm}>
              <form onSubmit={prodForm.handleSubmit(submitProduct)} className="space-y-4">
                {[
                  "product_id",
                  "title",
                  "slug",
                  "short_description",
                  "description",
                  "tags",
                ].map((f) => (
                  <FormField
                    key={f}
                    control={prodForm.control}
                    name={f}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">
                          {f.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md"
                            placeholder={`Enter ${f.replace(/_/g, " ")}`}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                ))}
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
                  name="main_image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Main Image</FormLabel>
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
                          <p className="text-sm text-gray-600">Main Image Preview:</p>
                          <img
                            src={field.value}
                            alt="Main Image Preview"
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
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Carousel Images (Optional, up to 5)</FormLabel>
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
                          <p className="text-sm text-gray-600">Carousel Images Preview:</p>
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
                      <Button
                        type="button"
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 transition"
                        onClick={() => deleteProduct(editingProd.product_id)}
                      >
                        Delete
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-2 transition"
                        onClick={() => cancelEditing(prodForm, setEditingProd)}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>

        {/* Right: Lists + Preview */}
        <div className="space-y-8">
          {/* Search and Tag Filter */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md py-2 px-4"
            />
            <Input
              type="text"
              placeholder="Filter by tags (comma-separated)"
              onChange={(e) => handleTagFilter(e.target.value)}
              className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md py-2 px-4"
            />
          </div>

          {/* Category List */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-4 text-gray-700">Categories</h4>
            {categories.length === 0 && <p className="text-gray-500">No categories available</p>}
            <ul className="space-y-3">
              {categories.map((c) => (
                <li
                  key={c.slug}
                  className="flex justify-between items-center p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                >
                  <span className="text-gray-700">{c.name}</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => {
                        catForm.reset(c);
                        setEditingCat(c);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white rounded-md"
                      onClick={() => deleteCategory(c.slug)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Product List */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-4 text-gray-700">Products</h4>
            {paginatedProducts.length === 0 && <p className="text-gray-500">No products available</p>}
            <ul className="space-y-3">
              {paginatedProducts.map((p) => (
                <li
                  key={p.product_id}
                  className="p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition cursor-pointer"
                  onClick={() => setPreview(p)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <strong className="text-gray-800">{p.title}</strong>
                      <p className="text-sm text-gray-600">ID: {p.product_id}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          prodForm.reset({
                            ...p,
                            main_image: p.main_image || "",
                            images: p.images || [],
                          });
                          setEditingProd(p);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white rounded-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProduct(p.product_id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <Button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md px-4 py-2 transition"
                >
                  Previous
                </Button>
                <span className="text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md px-4 py-2 transition"
                >
                  Next
                </Button>
              </div>
            )}
          </div>

          {/* Product Preview */}
          {preview && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold mb-4 text-gray-700">Preview: {preview.title}</h4>
              {preview.images?.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setShowCarousel((show) => !show)}
                  className="mb-4 border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  {showCarousel ? "Hide Carousel" : "Show Carousel"}
                </Button>
              )}
              {showCarousel && preview.images?.length > 0 ? (
                <Carousel showThumbs={false} showStatus={false} className="rounded-md overflow-hidden">
                  {preview.images.map((u, i) => (
                    <div key={i}>
                      <img
                        src={u}
                        alt={`Preview ${i}`}
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />
                    </div>
                  ))}
                </Carousel>
              ) : (
                <img
                  src={preview.main_image}
                  alt="Product Preview"
                  className="w-full max-w-xs h-48 object-cover rounded-md shadow-sm"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
              )}
              <p className="mt-4 text-gray-600">{preview.short_description}</p>
              <p className="text-gray-700">
                <strong>Student:</strong> ${preview.student_price} |{" "}
                <strong>Commercial:</strong> ${preview.commercial_price}
              </p>
              <p className="text-gray-600">Tags: {preview.tags || "None"}</p>
              <Button
                variant="outline"
                onClick={() => setPreview(null)}
                className="mt-4 border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Clear Preview
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}