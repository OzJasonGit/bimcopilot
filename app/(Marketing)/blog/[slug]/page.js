"use client";

import Blog from "@/Modules/Blog/blog";
import Blog_page from "@/Modules/Blog_page/blog_page"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "@/components/Menu/menu";
import Header from "@/components/Header/Header";
import Subfooter from "@/components/Subfooter2/subfooter2";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import Sides from "@/components/Sides/sides";
import parse from "html-react-parser";
import SkeletonLoader from "@/components/Loader/loader";

const BlogPost = () => {
  const params = useParams();
  const slug = params?.slug;
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStory = async () => {
      if (!slug) return;
      try {
        const res = await axios.get(`/api/blog/${slug}`);
        if (res.data?.story) {
          setStory(res.data.story);
        } else {
          setError("Story data format is invalid");
        }
      } catch (error) {
        console.error("Error fetching story:", error);
        setError("Failed to load story");
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [slug]);

  if (loading) return <SkeletonLoader />;
  if (error) return <div className="error-message">{error}</div>;
  if (!story) return <div>Story not found</div>;

  return (
    <>
      <Menu />
      <Header />
      <Sides />
      
    <Blog_page/>
    {/* <Blog/> */}

      <Subfooter />
      <Footer />
    </>
  );
};

export default BlogPost;