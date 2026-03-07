"use client";

import React, { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "react-quill/dist/quill.snow.css";

import styles from "./newStories.module.css";
import { QuillNoSSRWrapper } from "@/Modules/Admin/admin";
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
import ImageUploadField from "@/components/ImageUploadField/ImageUploadField";

const MAX_BODY_SECTIONS = 18;

const bodyFieldSchema = Object.fromEntries(
  Array.from({ length: MAX_BODY_SECTIONS }, (_, idx) => {
    const n = idx + 1;
    if (n === 1) {
      return [
        [`body${n}_title`, z.string().min(3, "Section title is required")],
        [`body${n}`, z.string().min(3, "Main story content is required")],
      ];
    }
    return [
      [`body${n}_title`, z.string().optional()],
      [`body${n}`, z.string().optional()],
    ];
  }).flat()
);

const formSchema = z.object({
  post_number: z.string().min(1, "Post number is required"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  author: z.string().min(2, "Author must be at least 2 characters"),
  date: z.string().optional(),
  subtitle: z.string().optional(),
  image: z.string().min(1, "Main image is required"),
  image2: z.string().optional(),
  avatar: z.string().optional(),
  introduction: z.string().min(3, "Introduction is required"),
  ...bodyFieldSchema,
  conclusion: z.string().optional(),
  video: z.string().optional(),
});

const bodyDefaultValues = Object.fromEntries(
  Array.from({ length: MAX_BODY_SECTIONS }, (_, idx) => {
    const n = idx + 1;
    return [[`body${n}_title`, ""], [`body${n}`, ""]];
  }).flat()
);

const defaultValues = {
  post_number: "",
  title: "",
  slug: "",
  author: "",
  date: "",
  subtitle: "",
  image: "",
  image2: "",
  avatar: "",
  introduction: "",
  ...bodyDefaultValues,
  conclusion: "",
  video: "",
};

function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

function getVisibleBodyCount(story) {
  if (!story) return 1;
  let max = 1;
  for (let i = 1; i <= MAX_BODY_SECTIONS; i += 1) {
    const hasTitle = String(story[`body${i}_title`] || "").trim().length > 0;
    const hasBody = String(story[`body${i}`] || "").trim().length > 0;
    if (hasTitle || hasBody) max = i;
  }
  return max;
}

export default function NewStories() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [loading, setLoading] = useState(false);
  const [storiesLoading, setStoriesLoading] = useState(true);
  const [stories, setStories] = useState([]);
  const [editingStory, setEditingStory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [storySearch, setStorySearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [notice, setNotice] = useState({ type: "", message: "" });
  const [visibleBodyCount, setVisibleBodyCount] = useState(1);
  const [showEditor, setShowEditor] = useState(false);
  const titleWatch = form.watch("title");
  const formValues = form.watch();

  function openPreviewInNewTab() {
    const story = {
      post_number: formValues.post_number,
      title: formValues.title,
      slug: formValues.slug || "preview",
      subtitle: formValues.subtitle,
      author: formValues.author,
      date: formValues.date,
      image: formValues.image,
      image2: formValues.image2,
      avatar: formValues.avatar,
      introduction: formValues.introduction,
      conclusion: formValues.conclusion,
      video: formValues.video,
      ...Object.fromEntries(
        Array.from({ length: MAX_BODY_SECTIONS }, (_, i) => {
          const n = i + 1;
          return [
            [`body${n}_title`, formValues[`body${n}_title`]],
            [`body${n}`, formValues[`body${n}`]],
          ];
        }).flat()
      ),
    };
    try {
      localStorage.setItem("story_preview_data", JSON.stringify(story));
      window.open("/blog/preview", "_blank", "noopener,noreferrer");
    } catch (e) {
      console.error("Failed to open preview:", e);
    }
  }

  useEffect(() => {
    fetchStories();
  }, []);

  useEffect(() => {
    if (!isEditing) {
      const currentSlug = form.getValues("slug");
      if (!currentSlug) {
        form.setValue("slug", slugify(titleWatch), { shouldDirty: true });
      }
    }
  }, [titleWatch, form, isEditing]);

  const storyStats = useMemo(() => {
    const published = stories.filter((item) => item?.published).length;
    const drafts = stories.length - published;
    return { total: stories.length, published, drafts };
  }, [stories]);

  const filteredStories = useMemo(() => {
    const query = storySearch.trim().toLowerCase();
    return stories.filter((item) => {
      const statusOk =
        statusFilter === "all" ||
        (statusFilter === "published" && item?.published) ||
        (statusFilter === "draft" && !item?.published);

      if (!statusOk) return false;
      if (!query) return true;

      const title = stripHtml(item?.title || "").toLowerCase();
      const slug = String(item?.slug || "").toLowerCase();
      const post = String(item?.post_number || "").toLowerCase();

      return title.includes(query) || slug.includes(query) || post.includes(query);
    });
  }, [stories, storySearch, statusFilter]);

  async function fetchStories() {
    try {
      setStoriesLoading(true);
      const res = await fetch("/api/admin_route");
      if (res.ok) {
        const result = await res.json();
        setStories(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching stories:", error);
      setNotice({ type: "error", message: "Failed to load stories." });
    } finally {
      setStoriesLoading(false);
    }
  }

  function handleEdit(story) {
    setEditingStory(story);
    setIsEditing(true);
    setShowEditor(true);
    setNotice({ type: "", message: "" });
    setVisibleBodyCount(getVisibleBodyCount(story));
    form.reset({
      post_number: story.post_number || "",
      title: story.title || "",
      slug: story.slug || "",
      author: story.author || "",
      date: story.date || story.timestamp || "",
      subtitle: story.subtitle || "",
      image: story.image || "",
      image2: story.image2 || "",
      avatar: story.avatar || "",
      introduction: story.introduction || "",
      ...Object.fromEntries(
        Array.from({ length: MAX_BODY_SECTIONS }, (_, idx) => {
          const n = idx + 1;
          return [
            [`body${n}_title`, story[`body${n}_title`] || ""],
            [`body${n}`, story[`body${n}`] || ""],
          ];
        }).flat()
      ),
      conclusion: story.conclusion || "",
      video: story.video || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCreateNew() {
    setIsEditing(false);
    setEditingStory(null);
    setNotice({ type: "", message: "" });
    setVisibleBodyCount(1);
    setShowEditor(false);
    form.reset(defaultValues);
    form.setValue("date", new Date().toISOString().split("T")[0], { shouldDirty: false });
  }

  function handleAddNewStory() {
    setIsEditing(false);
    setEditingStory(null);
    setNotice({ type: "", message: "" });
    setVisibleBodyCount(1);
    form.reset(defaultValues);
    form.setValue("date", new Date().toISOString().split("T")[0], { shouldDirty: false });
    setShowEditor(true);
  }

  function handleAddBodySection() {
    setVisibleBodyCount((prev) => Math.min(MAX_BODY_SECTIONS, prev + 1));
  }

  function handleRemoveBodySection(sectionToRemove) {
    if (sectionToRemove <= 1) return;

    const values = form.getValues();
    for (let i = sectionToRemove; i < visibleBodyCount; i += 1) {
      form.setValue(`body${i}_title`, values[`body${i + 1}_title`] || "", { shouldDirty: true });
      form.setValue(`body${i}`, values[`body${i + 1}`] || "", { shouldDirty: true });
    }

    form.setValue(`body${visibleBodyCount}_title`, "", { shouldDirty: true });
    form.setValue(`body${visibleBodyCount}`, "", { shouldDirty: true });
    setVisibleBodyCount((prev) => Math.max(1, prev - 1));
  }

  async function handlePublish(storyId) {
    try {
      const res = await fetch("/api/admin_route", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: storyId, published: true, publishDate: new Date().toISOString() }),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setNotice({ type: "error", message: errorData.error || "Failed to publish story." });
        return;
      }
      setNotice({ type: "success", message: "Story published successfully." });
      await fetchStories();
    } catch (error) {
      console.error("Error publishing story:", error);
      setNotice({ type: "error", message: "Unexpected error while publishing." });
    }
  }

  async function handleSubmit(data) {
    setLoading(true);
    setNotice({ type: "", message: "" });
    try {
      const payload = {
        ...data,
        date: data.date || new Date().toISOString().split("T")[0],
      };
      const method = isEditing ? "PUT" : "POST";
      const body = isEditing ? JSON.stringify({ ...payload, _id: editingStory._id }) : JSON.stringify(payload);

      const res = await fetch("/api/admin_route", {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setNotice({ type: "error", message: errorData.error || "Failed to save story." });
        return;
      }

      setNotice({ type: "success", message: isEditing ? "Story updated." : "Story created." });
      setShowEditor(false);
      setEditingStory(null);
      setIsEditing(false);
      form.reset(defaultValues);
      setVisibleBodyCount(1);
      await fetchStories();
    } catch (error) {
      console.error("Submit error:", error);
      setNotice({ type: "error", message: "Unexpected error while saving." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={styles.page}>
      {!showEditor ? (
        <div className={styles.storiesListLayout}>
          <div className={styles.toolbar}>
            <div>
              <h1 className={styles.toolbarTitle}>Stories</h1>
              <p className={styles.toolbarSubtitle}>Manage your blog stories</p>
            </div>
            <div className={styles.toolbarActions}>
              <Input
                value={storySearch}
                onChange={(e) => setStorySearch(e.target.value)}
                placeholder="Search title, slug, post #"
                className={styles.searchInput}
              />
              <div className={styles.toolbarFilterRow}>
                <Button type="button" size="sm" variant={statusFilter === "all" ? "default" : "outline"} onClick={() => setStatusFilter("all")}>All</Button>
                <Button type="button" size="sm" variant={statusFilter === "published" ? "default" : "outline"} onClick={() => setStatusFilter("published")}>Published</Button>
                <Button type="button" size="sm" variant={statusFilter === "draft" ? "default" : "outline"} onClick={() => setStatusFilter("draft")}>Drafts</Button>
              </div>
              <Button onClick={handleAddNewStory} className={styles.addStoryBtn}>Add New Story</Button>
            </div>
          </div>
          <div className={styles.statsRow}>
            <div><span>Total</span><strong>{storyStats.total}</strong></div>
            <div><span>Published</span><strong>{storyStats.published}</strong></div>
            <div><span>Drafts</span><strong>{storyStats.drafts}</strong></div>
          </div>
          <div className={styles.storiesGrid}>
            {storiesLoading ? (
              <p className={styles.empty}>Loading stories...</p>
            ) : filteredStories.length === 0 ? (
              <p className={styles.empty}>No stories found. Click &quot;Add New Story&quot; to create one.</p>
            ) : (
              filteredStories.map((story) => (
                <article
                  key={story._id}
                  className={styles.storyGridCard}
                  onClick={() => handleEdit(story)}
                >
                  <div className={styles.storyGridThumb}>
                    {story.image && (
                      <img src={story.image} alt="" onError={(e) => { e.target.style.display = "none"; }} />
                    )}
                  </div>
                  <div className={styles.storyGridBody}>
                    <h3>{stripHtml(story.title) || "Untitled Story"}</h3>
                    <p className={styles.storyMeta}>Post #{story.post_number || "N/A"} · /{story.slug || "no-slug"}</p>
                    <span className={story.published ? styles.published : styles.draft}>
                      {story.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className={styles.storyGridActions}>
                    <Button type="button" size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleEdit(story); }}>Edit</Button>
                    {!story.published && (
                      <Button type="button" size="sm" onClick={(e) => { e.stopPropagation(); handlePublish(story._id); }}>Publish</Button>
                    )}
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className={`${styles.layout} ${styles.layoutEditorOnly}`}>
        <div className={styles.editorCard}>
          <div className={styles.editorHeader}>
            <div>
              <h1 className={styles.title}>{isEditing ? "Editing Story" : "New Story Studio"}</h1>
              <p className={styles.subtitle}>A modern writer-first interface inspired by premium blogging tools.</p>
            </div>
            <div className={styles.headerActions}>
              <Button type="button" variant="outline" onClick={fetchStories}>Refresh</Button>
              <Button type="button" variant="outline" onClick={() => setShowEditor(false)}>Back to Stories</Button>
              {isEditing && (
                <Button type="button" variant="outline" onClick={handleCreateNew}>Cancel Edit</Button>
              )}
            </div>
          </div>

          {notice.message ? (
            <div className={notice.type === "error" ? styles.noticeError : styles.noticeSuccess}>{notice.message}</div>
          ) : null}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className={styles.formBody}>
              <div className={styles.grid2}>
                <FormField
                  control={form.control}
                  name="post_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Post Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 104" {...field} />
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
                        <Input placeholder="Author name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Write a strong headline..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className={styles.grid2}>
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="auto-generated-slug"
                          {...field}
                          onChange={(e) => field.onChange(slugify(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtitle</FormLabel>
                    <FormControl>
                      <Input placeholder="Optional subtitle" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className={styles.grid3}>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ImageUploadField
                          label="Main Image"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Or paste URL..."
                          folder="Stories_Main"
                        />
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
                      <FormControl>
                        <ImageUploadField
                          label="Secondary Image"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Or paste URL..."
                          folder="Stories_Secondary"
                        />
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
                      <FormControl>
                        <ImageUploadField
                          label="Author Avatar"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Or paste URL..."
                          folder="Stories_Avatars"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="introduction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Introduction</FormLabel>
                    <FormControl>
                      <QuillNoSSRWrapper theme="snow" value={field.value || ""} onChange={field.onChange} placeholder="Introduce the story..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className={styles.optionalGroup}>
                <h3>Body Sections</h3>
                <p className={styles.bodyHint}>
                  Add as many titled body sections as you need (up to {MAX_BODY_SECTIONS}).
                </p>

                {Array.from({ length: visibleBodyCount }, (_, idx) => {
                  const section = idx + 1;
                  const isMain = section === 1;
                  return (
                    <div key={section} className={styles.bodySectionCard} data-body-section={section}>
                      <div className={styles.bodySectionHead}>
                        <span>Section {section}</span>
                        <div className={styles.bodySectionHeadActions}>
                          {isMain ? <strong>Required</strong> : <em>Optional</em>}
                          {!isMain && (
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => handleRemoveBodySection(section)}
                              className={styles.removeBodyButton}
                            >
                              Delete
                            </Button>
                          )}
                        </div>
                      </div>
                      <FormField
                        control={form.control}
                        name={`body${section}_title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{isMain ? "Main Section Title" : "Section Title"}</FormLabel>
                            <FormControl>
                              <Input placeholder={isMain ? "Main section heading..." : "Section heading..."} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`body${section}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{isMain ? "Main Story Content" : "Section Content"}</FormLabel>
                            <p className={styles.bodyEditorHint}>
                              Use the toolbar table button (⊞) to insert a real table. You’ll be prompted for rows and columns.
                            </p>
                            <FormControl>
                              <QuillNoSSRWrapper
                                theme="snow"
                                value={field.value || ""}
                                onChange={field.onChange}
                                placeholder={isMain ? "Write your full story here..." : "Write section content..."}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  );
                })}

                <div className={styles.addBodyRow}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddBodySection}
                    disabled={visibleBodyCount >= MAX_BODY_SECTIONS}
                  >
                    {visibleBodyCount >= MAX_BODY_SECTIONS ? "Maximum body sections reached" : "Add New Body Section"}
                  </Button>
                </div>
              </div>

              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
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
                      <QuillNoSSRWrapper theme="snow" value={field.value || ""} onChange={field.onChange} placeholder="Close with key insight and CTA..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className={styles.footerActions}>
                <Button type="submit" disabled={loading}>
                  {loading ? (isEditing ? "Updating..." : "Saving...") : (isEditing ? "Update Story" : "Create Story")}
                </Button>
                <Button type="button" variant="outline" onClick={openPreviewInNewTab}>
                  Preview
                </Button>
                <Button type="button" variant="outline" onClick={handleCreateNew}>New Draft</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      )}

    </section>
  );
}
