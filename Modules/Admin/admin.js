
"use client";
import styles from "./admin.module.css"
import React, { useState, useEffect } from "react";

import Menu from "@/components/Menu/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Configure Quill with modules including list support
const QuillNoSSRWrapper = dynamic(
  () => {
    return new Promise((resolve) => {
      import("react-quill").then((ReactQuillModule) => {
        const ReactQuill = ReactQuillModule.default || ReactQuillModule;
        
        // Configure modules with list support - Quill has built-in list support
        const modules = {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']
          ],
        };

        const QuillComponent = ({ value, onChange, placeholder, ...props }) => {
          return (
            <ReactQuill
              theme="snow"
              modules={modules}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              {...props}
            />
          );
        };
        
        resolve(QuillComponent);
      });
    });
  },
  { ssr: false }
);

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({

  post_number: z.string().min(1, {
    message: "Title must be at least 1 characters.",
  }),
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  slug: z.string().min(3, {
    message: "slug must be at least 3 characters.",
  }),
  author: z.string().min(2, {
    message: "Author name must be at least 2 characters.",
  }),
  subtitle: z.string().optional(),
  image: z.string().url({
    message: "Image must be a valid URL.",
  }),
  image2: z.string().url({
    message: "Image must be a valid URL.",
  }),
  avatar: z.string().url({
    message: "Avatar must be a valid URL.",
  }),
  introduction: z.string().min(3, {
    message: "introduction must be at least 3 chharacters",
  }),

  body1_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }),
  body1: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }),

  body2_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }),
  body2: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }),

  body3_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body3: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),

  body4_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body4: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),

  body5_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body5: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),

  body6_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body6: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),

  body7_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body7: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),


  body8_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body8: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),


  body9_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body9: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),


  body10_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),
  body10: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),

  video: z.string().url({
    message: "Video must be a valid URL.",
  }).optional(),
  conclusion: z.string().optional(),
});

export function Admin() {
  const form = useForm({
    resolver: zodResolver(formSchema),
      defaultValues: {
      post_number: "",
      title: "",
      author: "",
      subtitle: "",
      image: "",
      image2: "",
      avatar: "",
      slug: "",
      body1_title: "",
      body1: "",
      body2_title: "",
      body2: "",
      body3_title: "",
      body3: "",
      body4_title: "",
      body4: "",
      body5_title: "",
      body5: "",
      body6_title: "",
      body6: "",
      body7_title: "",
      body7: "",
      body8_title: "",
      body8: "",
      body9_title: "",
      body9: "",
      body10_title: "",
      body10: "",
      introduction: "",
      video: "",
      conclusion: "",

    },
  });
  const [story, setStory] = useState({
      post_number: "",
      title: "",
      author: "",
      subtitle: "",
      image: "",
      image2: "",
      avatar: "",
      slug: "",
      body1_title: "",
      body1: "",
      body2_title: "",
      body2: "",
      body3_title: "",
      body3: "",
      body4_title: "",
      body4: "",
      body5_title: "",
      body5: "",
      body6_title: "",
      body6: "",
      body7_title: "",
      body7: "",
      body8_title: "",
      body8: "",
      body9_title: "",
      body9: "",
      body10_title: "",
      body10: "",
      introduction: "",
      video: "",
      conclusion: "",
  });

  const [loading, setLoading] = useState(false); // Track loading state
  const [stories, setStories] = useState([]);
  const [editingStory, setEditingStory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [storiesLoading, setStoriesLoading] = useState(true);

  // Fetch stories on component mount
  useEffect(() => {
    fetchStories();
  }, []);

  const stripHtml = (html) => {
    if (!html) return "";
    // Remove HTML tags using regex
    return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
  };

  const fetchStories = async () => {
    try {
      setStoriesLoading(true);
      const res = await fetch("/api/admin_route");
      if (res.ok) {
        const result = await res.json();
        setStories(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setStoriesLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStory((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (story) => {
    setEditingStory(story);
    setIsEditing(true);
    // Populate form with story data
    form.reset({
      post_number: story.post_number || "",
      title: story.title || "",
      author: story.author || "",
      subtitle: story.subtitle || "",
      image: story.image || "",
      image2: story.image2 || "",
      avatar: story.avatar || "",
      slug: story.slug || "",
      body1_title: story.body1_title || "",
      body1: story.body1 || "",
      body2_title: story.body2_title || "",
      body2: story.body2 || "",
      body3_title: story.body3_title || "",
      body3: story.body3 || "",
      body4_title: story.body4_title || "",
      body4: story.body4 || "",
      body5_title: story.body5_title || "",
      body5: story.body5 || "",
      body6_title: story.body6_title || "",
      body6: story.body6 || "",
      body7_title: story.body7_title || "",
      body7: story.body7 || "",
      body8_title: story.body8_title || "",
      body8: story.body8 || "",
      body9_title: story.body9_title || "",
      body9: story.body9 || "",
      body10_title: story.body10_title || "",
      body10: story.body10 || "",
      introduction: story.introduction || "",
      video: story.video || "",
      conclusion: story.conclusion || "",
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingStory(null);
    form.reset();
  };

  const handlePublish = async (storyId) => {
    try {
      const res = await fetch("/api/admin_route", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: storyId,
          published: true,
          publishDate: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        alert("Story published successfully!");
        fetchStories();
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(`Error: ${errorData.error || "Failed to publish story"}`);
      }
    } catch (error) {
      console.error("Error publishing story:", error);
      alert("An unexpected error occurred.");
    }
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    console.log("Validated data:", data);
    try {
      const url = "/api/admin_route";
      const method = isEditing ? "PUT" : "POST";
      const body = isEditing
        ? JSON.stringify({ ...data, _id: editingStory._id })
        : JSON.stringify(data);

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Error submitting story:", errorData);
        alert(`Error: ${errorData.error || "Failed to submit story"}`);
      } else {
        const result = await res.json();
        alert(isEditing ? "Story updated successfully!" : "Story added successfully!");
        form.reset();
        setIsEditing(false);
        setEditingStory(null);
        fetchStories();
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("An unexpected error occurred. Check the console for details.");
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };


  return (

    <section >
      <style dangerouslySetInnerHTML={{__html: `
        .ql-editor ul,
        .ql-editor ol {
          padding-left: 1.5em !important;
          margin: 0.5em 0 !important;
          list-style-position: outside !important;
        }
        .ql-editor ul {
          list-style-type: disc !important;
        }
        .ql-editor ol {
          list-style-type: decimal !important;
        }
        .ql-editor li {
          display: list-item !important;
          margin: 0.25em 0 !important;
          padding-left: 0.5em !important;
        }
      `}} />
      <Menu />
      <div className={styles.container}>
        {/* Main Content Area - Form */}
        <div className={styles.mainContent}>
        <div className={styles.formDiv} >
            <h1 style={{ textAlign: "center", fontSize: "x-large", fontWeight: "600" }}>
              {isEditing ? "Edit Story" : "Create New Story"}
            </h1>
            {isEditing && (
              <div style={{ marginBottom: "1rem", textAlign: "center" }}>
                <Button
                  type="button"
                  onClick={handleCancelEdit}
                  variant="outline"
                  size="sm"
                >
                  Cancel Edit
                </Button>
              </div>
            )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">

              <FormField
                control={form.control}
                name="post_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>post_number</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your post_number here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
             <FormField
  control={form.control}
  name="slug"
  render={({ field }) => (
    <FormItem className="space-y-2">
      <FormLabel className="text-sm font-medium text-gray-700">
        Slug
      </FormLabel>
      <FormControl>
        <div className="relative">
          <textarea
            {...field}
            rows={3}
            className={`
              w-full p-3 rounded-lg border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all
              placeholder:text-gray-400 text-sm
              resize-none
            `}
            placeholder="Write your slug here..."
            value={field.value || ""}
            onChange={(e) => {
              let value = e.target.value.trim(); // Trim spaces from start & end
              let formattedValue = value
                .toLowerCase()
                .replace(/\s+/g, "-") // Replace spaces with "-"
                .replace(/[^a-z0-9-]/g, ""); // Remove invalid characters
              
              field.onChange(formattedValue);
            }}
            maxLength={50}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">
            {field.value?.length || 0}/50
          </div>
        </div>
      </FormControl>
      {/* Slug Preview and Copy Button */}
      {field.value && (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-gray-600">
            Preview: <span className="font-mono text-blue-500">{field.value}</span>
          </span>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(field.value)}
            className="text-sm text-blue-500 hover:text-blue-600"
          >
            Copy
          </button>
        </div>
      )}
      <FormMessage className="text-xs text-red-500" />
    </FormItem>
  )}
/>

              <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtitle</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your subtitle here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter image URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter secondary image URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Avatar URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="introduction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>introduction</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your introduction here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="body1_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body1_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body1_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body1</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body1 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



              <FormField
                control={form.control}
                name="body2_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body2_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body2_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="body2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body2</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body2 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



              <FormField
                control={form.control}
                name="body3_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body3_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body3_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                  />  


              <FormField
                control={form.control}
                name="body3"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body3</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body3 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="body4_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body4_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body4_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body4"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body4</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body4 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="body5_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body5_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body5_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body5"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body5</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body5 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body6_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body6_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body6_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="body6"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body6</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body6 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body7_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body7_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body7_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body7"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body7</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body7 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


            <FormField
                control={form.control}
                name="body8_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body8_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body8_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body8"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body8</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body8 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



            <FormField
                control={form.control}
                name="body9_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body9_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body9_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body9"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body9</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body9 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


            <FormField
                control={form.control}
                name="body10_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body10_title</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body10_title here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body10"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body10</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your body10 here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />




              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter video URL (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Author name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="conclusion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conclusion</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your conclusion here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" story={story} handleChange={handleChange} handleSubmit={handleSubmit} disabled={loading} >
                {loading ? (isEditing ? "Updating..." : "Submitting...") : (isEditing ? "Update Story" : "Create Story")}
              </Button>
            </form>
          </Form>

          </div>
        </div>

        {/* Sidebar - Stories List */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarContent}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: "2px solid #e5e7eb" }}>
              All Stories
            </h2>
            {storiesLoading ? (
              <p style={{ textAlign: "center", color: "#6b7280", padding: "2rem" }}>Loading stories...</p>
            ) : stories.length === 0 ? (
              <p style={{ textAlign: "center", color: "#6b7280", padding: "2rem" }}>No stories found.</p>
            ) : (
              <div className={styles.storiesList}>
                {stories.map((story) => (
                  <div
                    key={story._id}
                    className={`${styles.storyItem} ${editingStory?._id === story._id ? styles.storyItemActive : ""}`}
                    onClick={() => handleEdit(story)}
                    style={{ cursor: "pointer" }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "600", marginBottom: "0.25rem", fontSize: "0.95rem" }}>
                        {stripHtml(story.title) || "Untitled Story"}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.5rem" }}>
                        Post #: {story.post_number || "N/A"}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.5rem" }}>
                        Slug: {story.slug || "N/A"}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {story.published ? (
                          <span style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: "500" }}>● Published</span>
                        ) : (
                          <span style={{ fontSize: "0.75rem", color: "#ef4444", fontWeight: "500" }}>● Draft</span>
                        )}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(story);
                        }}
                        size="sm"
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        Enable Edit
                      </Button>
                      {!story.published && (
                        <Button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePublish(story._id);
                          }}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Publish
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

    </section>
  );
}

export default Admin;

