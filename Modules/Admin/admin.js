
"use client";
import styles from "./admin.module.css"
import { useState } from "react";

import Menu from "@/components/Menu/menu";
import Header from "@/components/Header/Header";
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
  body1: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }),
  body2: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }),
  body3: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }),
  body4: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }),
  body5: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }),
  body6: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }),
  body7: z.string().min(3, {
    message: "body must be at least 3 characters.",
  }),
  video: z.string().url({
    message: "Video must be a valid URL.",
  }).optional(),
  conclusion: z.string().optional(),
});

export function Admin() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      subtitle: "",
      image: "",
      image2: "",
      avatar: "",
      slug: "",
      body1: "",
      body2: "",
      body3: "",
      body4: "",
      body5: "",
      body6: "",
      body7: "",
      introduction: "",
      video: "",
      conclusion: "",

    },
  });
  const [story, setStory] = useState({
    title: "",
    author: "",
    subtitle: "",
    image: "",
    image2: "",
    avatar: "",
    slug: "",
    body1: "",
    body2: "",
    body3: "",
    body4: "",
    body5: "",
    body6: "",
    body7: "",
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
      <Header /><br></br>
      <div className={styles.section1}>
        <div className={styles.formDiv} >
          <h1 style={{ textAlign: "center", fontSize: "x-large", fontWeight: "600" }}>Stories</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
                  <FormItem>
                    <FormLabel>slug</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={field.value || ""} // Bind value to the form's field
                        onChange={(content) => field.onChange(content)} // Update the form's state on change
                        placeholder="Write your slug here..."
                      />
                    </FormControl>
                    <FormMessage />
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
                name="body7"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>body7</FormLabel>
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

