"use client";

import { useEffect, useState } from "react";
import Menu from "@/components/Menu/menu";
import Header from "@/components/Header/Header";
import Sides from "@/components/Sides/sides";
import Subfooter from "@/components/Subfooter2/subfooter2";
import Footer from "@/components/Footer/Footer";
import Blog_page from "@/Modules/Blog_page/blog_page";

const STORAGE_KEY = "story_preview_data";

export default function BlogPreviewPage() {
  const [story, setStory] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setStory({ ...data, slug: "preview", _id: "preview" });
      }
    } catch (e) {
      console.error("Failed to load preview story:", e);
    }
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#171717] flex items-center justify-center text-stone-400">
        Loading preview...
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-[#171717] flex flex-col items-center justify-center text-stone-400 gap-4 p-8">
        <p>No preview data. Create or edit a story and click Preview to see it here.</p>
        <a href="/admin/new-stories" className="text-blue-400 hover:underline">Go to New Stories</a>
      </div>
    );
  }

  return (
    <>
      <Menu />
      <Header />
      <Sides />
      <Blog_page initialStory={story} stories={{ data: [story] }} relatedStories={[]} />
      <Subfooter />
      <Footer />
    </>
  );
}
