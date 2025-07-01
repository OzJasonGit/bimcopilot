"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { debounce } from "lodash";

// SCHEMAS
const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters").regex(/^[a-z0-9-]+$/i, "Slug must contain only letters, numbers, or hyphens"),
});
const productSchema = z.object({
  product_id: z.string().min(1, "Product ID is required"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters").regex(/^[a-z0-9-]+$/i, "Slug must contain only letters, numbers, or hyphens"),
  short_description: z.string().min(5, "Short description must be at least 5 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  license_type: z.enum(["student", "commercial"], { message: "Select a valid license type" }),
  student_price: z.coerce.number().positive("Student price must be positive"),
  commercial_price: z.coerce.number().positive("Commercial price must be positive"),
  category: z.string().min(1, "Category is required"),
  tags: z.string().optional(),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
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
  const [selectedImages, setSelectedImages] = useState([]); // Track selected images with local URLs
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const fileInputRef = useRef(null);

  // Auto-generate slug
  const generateSlug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

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

        console.log("Fetched categories:", catData); // Debug
        console.log("Fetched products:", prodData); // Debug

        setCategories(catData);
        setProducts(prodData);

        const tags = [...new Set(prodData.flatMap(p => p.tags ? p.tags.split(",").map(t => t.trim()) : []))];
        setAvailableTags(tags);
      } catch (error) {
        console.error("Error loading data:", error);
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
      const responseData = await res.json();
      console.log("Category saved:", responseData); // Debug
      toast.success("Category saved");
      catForm.reset();
      setEditingCat(null);
      setCategories(await fetch("/api/categories").then(r => r.json()));
    } catch (error) {
      console.error("Category error:", error);
      toast.error(error.message || "Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (slug) => {
    if (!confirm(`Are you sure you want to delete the category "${slug}"?`)) return;
    setLoading(true);
    try {
      console.log("Attempting to delete category with slug:", slug); // Debug
      const res = await fetch(`/api/categories?slug=${encodeURIComponent(slug)}`, { method: "DELETE" });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Delete category response:", errorData); // Debug
        throw new Error(errorData.message || "Failed to delete category");
      }
      toast.success("Category deleted");
      setCategories(prev => prev.filter(c => c.slug !== slug));
    } catch (error) {
      console.error("Delete category error:", error);
      toast.error(error.message || "Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  // PRODUCT CRUD
  const submitProduct = async (data) => {
    setLoading(true);
    try {
      // Ensure numeric fields are numbers
      const formattedData = {
        ...data,
        student_price: Number(data.student_price),
        commercial_price: Number(data.commercial_price),
        tags: data.tags ? data.tags.split(",").map(t => t.trim()).join(",") : "",
      };
      console.log("Submitting product data:", JSON.stringify(formattedData, null, 2)); // Debug
      // Validate form data
      const validation = productSchema.safeParse(formattedData);
      if (!validation.success) {
        const errors = validation.error.issues.map(issue => `${issue.path.join(".")}: ${issue.message}`).join("; ");
        console.error("Validation errors:", errors); // Debug
        toast.error(`Validation failed: ${errors}`);
        throw new Error(errors);
      }
      if (!formattedData.images.length) {
        toast.error("Please upload at least one image before saving");
        throw new Error("No images uploaded");
      }
      const res = await fetch("/api/products", {
        method: editingProd ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...(editingProd || {}), ...formattedData }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("API error response:", errorData); // Debug
        throw new Error(errorData.message || "Product operation failed");
      }
      const responseData = await res.json();
      console.log("Product saved:", responseData); // Debug
      toast.success(`Product ${editingProd ? "updated" : "added"} successfully`);
      prodForm.reset();
      setEditingProd(null);
      setSelectedImages([]); // Clear selected images
      setProducts(await fetch("/api/products").then(r => r.json()));
    } catch (error) {
      console.error("Product submission error:", error); // Debug
      toast.error(error.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };



  const deleteProduct = async (id) => {
    if (!confirm(`Are you sure you want to delete the product with ID "${id}"?`)) return;
    setLoading(true);
    try {
      console.log("Attempting to delete product with ID:", id); // Debug
      const res = await fetch(`/api/products?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Delete product response:", errorData); // Debug
        throw new Error(errorData.message || "Failed to delete product");
      }
      toast.success("Product deleted");
      setProducts(prev => prev.filter(p => p.product_id !== id));
      if (preview?.product_id === id) setPreview(null);
    } catch (error) {
      console.error("Delete product error:", error);
      toast.error(error.message || "Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  // Image upload
  const handleFiles = useCallback(async (files) => {
    const validFiles = Array.from(files).filter(file => {
      if (!file.type.startsWith("image/")) {
        toast.error(`File "${file.name}" is not an image`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) {
      toast.error("No valid images selected");
      return;
    }

    // Add local URLs for preview
    const newImages = validFiles.map(file => ({
      file,
      localUrl: URL.createObjectURL(file),
      name: file.name,
      status: "uploading",
    }));
    setSelectedImages(prev => [...prev, ...newImages]);
    toast.info(`${validFiles.length} image${validFiles.length > 1 ? "s" : ""} selected`);

    try {
      const urls = [];
      const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL || "https://api.cloudinary.com/v1_1/dbj8h56jj/image/upload";
      console.log("Cloudinary URL:", cloudinaryUrl); // Debug
      for (let file of validFiles) {
        try {
          const form = new FormData();
          form.append("file", file);
          form.append("upload_preset", "unsigned");
          form.append("folder", "Folders/Product_Main");
          console.log("FormData content:", { file: file.name, upload_preset: "unsigned", folder: "Folders/Product_Main" }); // Debug
          const res = await fetch(cloudinaryUrl, {
            method: "POST",
            body: form,
          });
          if (!res.ok) {
            const errorData = await res.json();
            console.error("Cloudinary upload error:", errorData); // Debug
            toast.error(`Failed to upload ${file.name}: ${errorData.error?.message || "Unknown error"}`);
            setSelectedImages(prev => prev.map(img => img.name === file.name ? { ...img, status: "failed" } : img));
            continue;
          }
          const data = await res.json();
          console.log("Cloudinary response:", data); // Debug
          urls.push(data.secure_url);
          setSelectedImages(prev => prev.map(img => img.name === file.name ? { ...img, status: "success", cloudinaryUrl: data.secure_url } : img));
        } catch (error) {
          console.error(`Error uploading file ${file.name}:`, error); // Debug
          toast.error(`Failed to upload ${file.name}: ${error.message || "Unknown error"}`);
          setSelectedImages(prev => prev.map(img => img.name === file.name ? { ...img, status: "failed" } : img));
        }
      }
      if (urls.length > 0) {
        prodForm.setValue("images", [...prodForm.getValues("images"), ...urls]);
        toast.success(`${urls.length} image${urls.length > 1 ? "s" : ""} uploaded successfully`);
      } else {
        toast.error("No images uploaded successfully");
      }
    } catch (error) {
      console.error("Image upload error:", error); // Debug
      toast.error(error.message || "Failed to upload images");
      setSelectedImages(prev => prev.map(img => img.status === "uploading" ? { ...img, status: "failed" } : img));
    }
  }, [prodForm]);

  const onDrop = useCallback((ev) => {
    ev.preventDefault();
    handleFiles(ev.dataTransfer.files);
  }, [handleFiles]);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (index) => {
    const image = selectedImages[index];
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    if (image.cloudinaryUrl) {
      prodForm.setValue("images", prodForm.getValues("images").filter(url => url !== image.cloudinaryUrl));
    }
    toast.success(`Image "${image.name}" removed`);
    URL.revokeObjectURL(image.localUrl); // Clean up local URL
  };

  // Clean up local URLs on unmount or form reset
  useEffect(() => {
    return () => {
      selectedImages.forEach(img => URL.revokeObjectURL(img.localUrl));
    };
  }, [selectedImages]);

  // Tag filter and search
  const handleTagFilter = useCallback(
    debounce((value) => {
      setFilterTags(value ? value.split(",").map(t => t.trim()) : []);
    }, 300),
    []
  );

  const filteredProducts = useMemo(() => {
    let result = products;
    if (filterTags.length) {
      result = result.filter(p => p.tags && filterTags.every(tag => p.tags.split(",").map(t => t.trim()).includes(tag)));
    }
    if (searchQuery) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.product_id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [products, filterTags, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Cancel editing
  const cancelEditing = (form, setEditing) => {
    form.reset();
    setEditing(null);
    if (form === prodForm) {
      setSelectedImages([]);
      prodForm.setValue("images", []);
      selectedImages.forEach(img => URL.revokeObjectURL(img.localUrl));
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-50 to-gray-200 min-h-screen font-sans">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
        </div>
      )}

      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">Product Management Dashboard</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Forms */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Category Form */}
          <Form {...catForm}>
            <form onSubmit={catForm.handleSubmit(submitCategory)} className="bg-white p-6 rounded-2xl shadow-xl space-y-6 transform hover:scale-[1.02] transition-transform duration-200 border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-800">{editingCat ? "Edit Category" : "Add Category"}</h3>
              <FormField
                name="name"
                control={catForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Category Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter category name" className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg" />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                name="slug"
                control={catForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Slug</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Auto-generated slug" className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg" />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6">
                  {editingCat ? "Update" : "Add"}
                </Button>
                {editingCat && (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-50 font-semibold rounded-lg"
                      onClick={() => deleteCategory(editingCat.slug)}
                    >
                      Delete
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gray-300 text-gray-600 hover:bg-gray-100 font-semibold rounded-lg"
                      onClick={() => cancelEditing(catForm, setEditingCat)}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </form>
          </Form>

          {/* Product Form */}
          <Form {...prodForm}>
            <form onSubmit={prodForm.handleSubmit(submitProduct)} className="bg-white p-6 rounded-2xl shadow-xl space-y-6 transform hover:scale-[1.02] transition-transform duration-200 border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-800">{editingProd ? "Edit Product" : "Add Product"}</h3>
              {["product_id", "title", "slug", "short_description", "description", "tags"].map(f => (
                <FormField
                  key={f}
                  name={f}
                  control={prodForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">{f.replace(/_/g, " ")}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={`Enter ${f.replace(/_/g, " ")}`} className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg" />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
               />
                ))}
              <FormField
                name="license_type"
                control={prodForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">License Type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg">
                          <SelectValue placeholder="Select license type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  name="student_price"
                  control={prodForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Student Price</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} placeholder="0" className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg" />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="commercial_price"
                  control={prodForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Commercial Price</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} placeholder="0" className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg" />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="category"
                control={prodForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Category</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(c => (
                            <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Images (click or drag & drop)</FormLabel>
                <div
                  onDrop={onDrop}
                  onDragOver={e => e.preventDefault()}
                  onClick={handleFileClick}
                  className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    ref={fileInputRef}
                    hidden
                    onChange={e => handleFiles(e.target.files)}
                  />
                  <p className="text-gray-500 text-center font-medium">Click or drag images here</p>
                </div>
                <FormMessage className="text-red-500" />
                {/* Selected Images */}
                {selectedImages.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 font-medium">Selected Images:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                      {selectedImages.map((img, i) => (
                        <div key={i} className="relative group">
                          <img
                            src={img.cloudinaryUrl || img.localUrl}
                            alt={img.name}
                            className="w-full h-24 object-cover rounded-md shadow-sm"
                            onError={(e) => {
                              console.error(`Failed to load image: ${img.cloudinaryUrl || img.localUrl}`); // Debug
                              e.target.src = "/placeholder-image.jpg"; // Fallback image
                            }}
                          />
                          <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                            {img.name}
                            {img.status === "uploading" && (
                              <span className="ml-1 animate-pulse"> (Uploading...)</span>
                            )}
                            {img.status === "success" && (
                              <span className="ml-1 text-green-400">✔</span>
                            )}
                            {img.status === "failed" && (
                              <span className="ml-1 text-red-400">✖</span>
                            )}
                          </div>
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(i)}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </FormItem>
              <div className="flex gap-4">
                <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6">
                  {editingProd ? "Update" : "Add"}
                </Button>
                {editingProd && (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-50 font-semibold rounded-lg"
                      onClick={() => deleteProduct(editingProd.product_id)}
                    >
                      Delete
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gray-300 text-gray-600 hover:bg-gray-100 font-semibold rounded-lg"
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

        {/* Right: Lists + Preview */}
        <div className="flex-1 flex flex-col gap-8 transition-all duration-300">
          {/* Search and Tag Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              placeholder="Search by title or ID"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg bg-white shadow-sm"
            />
            <Select onValueChange={value => handleTagFilter(value.join(","))} multiple>
              <SelectTrigger className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg bg-white shadow-sm">
                <SelectValue placeholder="Select tags" />
              </SelectTrigger>
              <SelectContent>
                {availableTags.map(tag => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category List */}
          <div className="bg-white p-6 rounded-2xl shadow-xl space-y-4 border border-gray-100">
            <h4 className="text-xl font-semibold text-gray-800">Categories</h4>
            {categories.length === 0 && <p className="text-gray-500">No categories available</p>}
            {categories.map(c => (
              <div
                key={c.slug}
                className="flex justify-between items-center py-3 border-b border-gray-200 hover:bg-blue-50 transition-colors"
              >
                <span className="text-gray-700 font-medium">{c.name}</span>
                <div className="space-x-3">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg" onClick={() => { catForm.reset(c); setEditingCat(c); }}>
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 font-semibold rounded-lg" onClick={() => deleteCategory(c.slug)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Product List */}
          <div className="bg-white p-6 rounded-2xl shadow-xl space-y-4 flex-1 overflow-y-auto border border-gray-100">
            <h4 className="text-xl font-semibold text-gray-800">Products</h4>
            {paginatedProducts.length === 0 && <p className="text-gray-500">No products available</p>}
            {paginatedProducts.map(p => (
              <div
                key={p.product_id}
                className="flex justify-between items-center py-3 border-b border-gray-200 hover:bg-blue-50 transition-colors cursor-pointer"
                onClick={() => setPreview(p)}
              >
                <div>
                  <strong className="text-gray-800 font-medium">{p.title}</strong>
                  <br />
                  <small className="text-gray-500">ID: {p.product_id}</small>
                </div>
                <div className="space-x-3">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg" onClick={e => { e.stopPropagation(); prodForm.reset(p); setEditingProd(p); }}>
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 font-semibold rounded-lg" onClick={e => { e.stopPropagation(); deleteProduct(p.product_id); }}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
            {totalPages > 1 && (
              <div className="flex justify-center gap-3 mt-4">
                <Button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold rounded-lg"
                >
                  Previous
                </Button>
                <span className="text-gray-700 font-medium">Page {currentPage} of {totalPages}</span>
                <Button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold rounded-lg"
                >
                  Next
                </Button>
              </div>
            )}
          </div>

          {/* Product Preview */}
          {preview && (
            <div className="bg-white p-6 rounded-2xl shadow-xl space-y-4 border border-gray-100">
              <h4 className="text-xl font-semibold text-gray-800">Preview: {preview.title}</h4>
              {preview.images?.length > 1 && (
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                  onClick={() => setShowCarousel(show => !show)}
                >
                  {showCarousel ? "Hide Carousel" : "Show Carousel"}
                </Button>
              )}
              {showCarousel && preview.images?.length > 1 ? (
                <Carousel showThumbs={false} dynamicHeight={true} className="mt-2">
                  {preview.images.map((u, i) => (
                    <div key={i}>
                      <img
                        src={u}
                        alt={`Preview ${i}`}
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                          console.error(`Failed to load preview image: ${u}`); // Debug
                          e.target.src = "/placeholder-image.jpg"; // Fallback image
                        }}
                      />
                    </div>
                  ))}
                </Carousel>
              ) : (
                <img
                  src={preview.images?.[0]}
                  alt=""
                  className="w-full h-48 object-cover rounded-lg mt-2"
                  onError={(e) => {
                    console.error(`Failed to load preview image: ${preview.images?.[0]}`); // Debug
                    e.target.src = "/placeholder-image.jpg"; // Fallback image
                  }}
                />
              )}
              <p className="text-sm text-gray-600">{preview.short_description}</p>
              <p className="text-sm text-gray-600">
                <strong>Student:</strong> ${preview.student_price} | <strong>Commercial:</strong> ${preview.commercial_price}
              </p>
              <p className="text-xs italic text-gray-500">Tags: {preview.tags || "None"}</p>
              <Button
                size="sm"
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-100 font-semibold rounded-lg"
                onClick={() => setPreview(null)}
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