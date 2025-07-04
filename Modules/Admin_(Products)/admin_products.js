
"use client";
import styles from "./admin.module.css"
import { useState } from "react";

import Menu from "@/components/Menu/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// import QuillNoSSRWrapper from "react-quill";
const QuillNoSSRWrapper = dynamic(() => import("react-quill"), { ssr: false });

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


  //Core Metadata 
  product_id: z.string().min(1, {
    message: "Title must be at least 1 characters.",
  }),

  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),

  slug: z.string().min(3, {
    message: "slug must be at least 3 characters.",
  }),

  description: z.string().min(2, {
    message: "Author name must be at least 2 characters.",
  }),

  category: z.string().optional(),
  image: z.string().url({
    message: "Image must be a valid URL.",
  }),

  tags: z.string().url({
    message: "Image must be a valid URL.",
  }),

  status: z.string().url({
    message: "Avatar must be a valid URL.",
  }),

  visibility: z.string().min(3, {
    message: "introduction must be at least 3 chharacters",
  }),

  created: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }),

  updated: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }),









  //Pricing and Sales Info
  price: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }),

  currency: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }),

  discount: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),

  is_free: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optioisnal(),

  license_type: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),

  license_terms_url: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),

















  //Download & File Info
  file_url: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),

  file_size_mb: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),

  download_count: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),

  max_downloads_per_user: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),

  version: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),

  changelog: [
    {

    },
    {

    }
  ],
  
  
  
  
  
  //Media
  thumbnail_url: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),


  gallery_images: z.string().min(3, 
    [
      "https://cdn.mysite.com/img/toolkit-1.png",
      "https://cdn.mysite.com/img/toolkit-2.png"
    ]
  ).optional(),


  video_demo_url: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),















  //AI/Tech Metadata (Optional, for AI-based products)
  tech_stack: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),

  ai_model: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),

  integration: {
    platform: ["Python", "Revit API", "OpenAI API"],
    instructions_url: z.string().min(3, {
      message: "body must be at least 3 characters.",
    }).optional(),
  },

  dependencies: z.string().min(3, {
    dependencies: ["Python", "Revit API", "OpenAI API"],
  }).optional(),














  //Marketing + SEO
  seo_title: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),

  seo_description: z.string().url({
    message: "Video must be a valid URL.",
  }).optional(),

  keywords: z.string().url({
    message: "Video must be a valid URL.",
  }).optional(),

  featured: true,

  bestseller: false,

 









 //Author + Support  
 author_id: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),

 author_name: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),

 support_email: z.string().min(3, {
  message: "body must be at least 3 characters.",
  }).optional(),

 support_page_url: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }).optional(),










//Purchase/Access Control (optional per user if extended) 
access_roles: z.string().min(3, {
  access_roles: ["buyer", "subscriber", "member"],
}).optional(),

requires_login: z.string().min(3, {
  message: "body must be at least 3 characters.",
}).optional(),

requires_subscription: z.string().min(3, {
message: "body must be at least 3 characters.",
}).optional(),




});












export function Admin() {
  const form = useForm({
    resolver: zodResolver(formSchema),
      defaultValues: {


      //Core Metadata   
      product_id: "",
      title: "",
      slug: "",
      description: "",
      category: "",
      tags: "",
      status: "",
      visibility: "",
      created_at: "",
      updated_at: "",


      //Pricing and Sales Info
      price: "",
      currency: "",
      discount: "",
      percentage: "",
      active: "",
      expires_at: "",
      is_free: "",
      license_type: "",
      license_terms_url: "",


      //Download & File Info
      file_url: "",
      file_size_mb: "",
      file_format: "",
      download_count: "",
      max_downloads_per_user: "",
      version: "",
      changelog: "",
      body10_title: "",
      body10: "",
      introduction: "",
      video: "",
      conclusion: "",


      //Download & File Info
      thumbnail_url: "",
      gallery_images: "",
      video_demo_url: "",    

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStory((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (data) => {
    setLoading(true);
    console.log("Validated data:", data);
    try {
      const res = await fetch("/api/admin_route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Error submitting story:", errorData);
        alert(`Error: ${errorData.error || "Failed to submit story"}`);
      } else {
        const result = await res.json();
        // console.log("Submission success:", result);
        alert("Story added successfully!");
        form.reset();
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
      <Menu />
      <div className={styles.section1}>
        <div className={styles.formDiv} >
          <h1 style={{ textAlign: "center", fontSize: "x-large", fontWeight: "600" }}>Stories</h1>
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
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>

        </div>
      </div>

    </section>
  );
}

export default Admin;

