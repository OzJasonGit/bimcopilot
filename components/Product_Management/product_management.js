"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useCallback, useMemo } from "react";
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
  license_type: z.enum(["student", "commercial"]),
  student_price: z.coerce.number().positive("Student price must be positive"),
  commercial_price: z.coerce.number().positive("Commercial price must be positive"),
  category: z.string().min(1, "Category is required"),
  tags: z.string().optional(),
  main_image: z.string().url("Main image must be a valid URL"),
  image_1: z.string().url("Image 1 must be a valid URL").optional().or(z.literal("")),
  image_2: z.string().url("Image 2 must be a valid URL").optional().or(z.literal("")),
  image_3: z.string().url("Image 3 must be a valid URL").optional().or(z.literal("")),
  image_4: z.string().url("Image 4 must be a valid URL").optional().or(z.literal("")),
  image_5: z.string().url("Image 5 must be a valid URL").optional().or(z.literal("")),
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
      image_1: "",
      image_2: "",
      image_3: "",
      image_4: "",
      image_5: "",
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
  const itemsPerPage = 10;

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

        console.log("Fetched products:", prodData); // Debug log

        setCategories(Array.isArray(catData) ? catData : catData.data || []);
        setProducts(Array.isArray(prodData.data) ? prodData.data : prodData || []);

        const tags = [...new Set(prodData.data?.flatMap(p => p.tags ? p.tags.split(",").map(t => t.trim()) : []) || [])];
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
      setCategories(await fetch("/api/categories").then(r => r.json()));
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
      const res = await fetch(`/api/categories?slug=${encodeURIComponent(slug)}`, { method: "DELETE" });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete category");
      }
      toast.success("Category deleted");
      setCategories(prev => prev.filter(c => c.slug !== slug));
    } catch (error) {
      toast.error(error.message || "Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  // PRODUCT CRUD
  const submitProduct = async (data) => {
    setLoading(true);
    try {
      // Include all image fields in the images array
      const images = [data.main_image, data.image_1, data.image_2, data.image_3, data.image_4, data.image_5].filter(url => url && url.trim() !== "");
      const formattedData = {
        ...data,
        student_price: Number(data.student_price),
        commercial_price: Number(data.commercial_price),
        tags: data.tags ? data.tags.split(",").map(t => t.trim()).join(",") : "",
        images, // Include all valid image URLs

      };

      // Explicit validation for main_image
      if (!formattedData.main_image || !z.string().url().safeParse(formattedData.main_image).success) {
        toast.error("Please provide a valid main image URL");
        throw new Error("Invalid or missing main image");
      }

      const validation = productSchema.safeParse(formattedData);
      if (!validation.success) {
        const errors = validation.error.issues.map(issue => `${issue.path.join(".")}: ${issue.message}`).join("; ");
        toast.error(`Validation failed: ${errors}`);
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

      const newProduct = await res.json();
      console.log("Product saved:", newProduct); // Debug log

      toast.success(`Product ${editingProd ? "updated" : "added"} successfully`);
      prodForm.reset();
      setEditingProd(null);
      setProducts(await fetch("/api/products").then(r => r.json()).then(d => Array.isArray(d.data) ? d.data : d));
    } catch (error) {
      console.error("Product submission error:", error);
      toast.error(error.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm(`Are you sure you want to delete the product with ID "${id}"?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/products?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete product");
      }
      toast.success("Product deleted");
      setProducts(prev => prev.filter(p => p.product_id !== id));
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
            <form onSubmit={catForm.handleSubmit(submitCategory)} className="bg-white p-6 rounded-2xl border border-gray-100 space-y-6">
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
                  {editingCat ? "Update" : "submit"}
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
            <form onSubmit={prodForm.handleSubmit(submitProduct)} className="bg-white p-6 rounded-2xl border border-gray-100 space-y-6">
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
              <FormField
                name="main_image"
                control={prodForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Main Image URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter main image URL"
                        className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                    {field.value && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 font-medium">Main Image Preview:</p>
                        <img
                          src={field.value}
                          alt="Main Image Preview"
                          className="w-full h-24 object-cover rounded-md mt-2"
                          onError={(e) => {
                            e.target.src = "/placeholder-image.jpg";
                          }}
                        />
                      </div>
                    )}
                  </FormItem>
                )}
              />
              {["image_1", "image_2", "image_3", "image_4", "image_5"].map((fieldName, index) => (
                <FormField
                  key={fieldName}
                  name={fieldName}
                  control={prodForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Image {index + 1} URL (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={`Enter image ${index + 1} URL`}
                          className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                      {field.value && (
                        <div className="mt-3">
                          <p className="text-sm text-gray-600 font-medium">Image {index + 1} Preview:</p>
                          <img
                            src={field.value}
                            alt={`Image ${index + 1} Preview`}
                            className="w-full h-24 object-cover rounded-md mt-2"
                            onError={(e) => {
                              e.target.src = "/placeholder-image.jpg";
                            }}
                          />
                        </div>
                      )}
                    </FormItem>
                  )}
                />
              ))}
              <div className="flex gap-4">
                <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6">
                  {editingProd ? "Update" : "submit"}
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
        <div className="flex-1 flex flex-col gap-8">
          {/* Search and Tag Filter */}
          {/* Commented out as per original code
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              placeholder="Search by title or ID"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg bg-white"
            />
            <Select onValueChange={value => handleTagFilter(value.join(","))} multiple>
              <SelectTrigger className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg bg-white">
                <SelectValue placeholder="Select tags" />
              </SelectTrigger>
              <SelectContent>
                {availableTags.map(tag => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          */}

          {/* Category List */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4">
            <h4 className="text-xl font-semibold text-gray-800">Categories</h4>
            {categories.length === 0 && <p className="text-gray-500">No categories available</p>}
            {categories.map(c => (
              <div
                key={c.slug}
                className="flex justify-between items-center py-3 border-b border-gray-200"
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
          <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4 flex-1 overflow-y-auto">
            <h4 className="text-xl font-semibold text-gray-800">Products</h4>
            {paginatedProducts.length === 0 && <p className="text-gray-500">No products available</p>}
            {paginatedProducts.map(p => (
              <div
                key={p.product_id}
                className="flex justify-between items-center py-3 border-b border-gray-200 cursor-pointer"
                onClick={() => setPreview(p)}
              >
                <div>
                  <strong className="text-gray-800 font-medium">{p.title}</strong>
                  <br />
                  <small className="text-gray-500">ID: {p.product_id}</small>
                </div>
                <div className="space-x-3">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg" onClick={e => {
                    e.stopPropagation();
                    prodForm.reset({
                      ...p,
                      main_image: p.main_image || "",
                      image_1: p.images?.[0] || "",
                      image_2: p.images?.[1] || "",
                      image_3: p.images?.[2] || "",
                      image_4: p.images?.[3] || "",
                      image_5: p.images?.[4] || "",
                    });
                    setEditingProd(p);
                  }}>
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
            <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4">
              <h4 className="text-xl font-semibold text-gray-800">Preview: {preview.title}</h4>
              {preview.images?.length > 0 && (
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                  onClick={() => setShowCarousel(show => !show)}
                >
                  {showCarousel ? "Hide Carousel" : "Show Carousel"}
                </Button>
              )}
              {showCarousel && preview.images?.length > 0 ? (
                <Carousel showThumbs={false} dynamicHeight={true} className="mt-2">
                  {preview.images.map((u, i) => (
                    <div key={i}>
                      <img
                        src={u}
                        alt={`Preview ${i}`}
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = "/placeholder-image.jpg";
                        }}
                      />
                    </div>
                  ))}
                </Carousel>
              ) : (
                <img
                  src={preview.images?.[0]}
                  alt="Main Image"
                  className="w-full h-48 object-cover rounded-lg mt-2"
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg";
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