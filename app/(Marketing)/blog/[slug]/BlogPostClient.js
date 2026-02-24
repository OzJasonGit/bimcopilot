"use client";

import Blog_page from "@/Modules/Blog_page/blog_page";
import Menu from "@/components/Menu/menu";
import Header from "@/components/Header/Header";
import Sides from "@/components/Sides/sides";
import Subfooter from "@/components/Subfooter2/subfooter2";
import Footer from "@/components/Footer/Footer";

export default function BlogPostClient({ story, relatedStories }) {
  return (
    <>
      <Menu />
      <Header />
      <Sides />
      <Blog_page initialStory={story} relatedStories={relatedStories || []} />
      <Subfooter />
      <Footer />
    </>
  );
}
