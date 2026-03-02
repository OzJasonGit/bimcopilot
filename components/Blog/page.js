
import { useState, useEffect } from "react";
import React from "react";
import SkeltonLoader2 from "../Loader/loader2";
import Blogpage from "./blogPage";

const Blog = () => {
  const [data, setData] = useState(null);
  const [firstStory, setFirstStory] = useState(null);
  const [topStories, setTopStories] = useState(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const res = await fetch("/api", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load stories");
        const json = await res.json();
        const responseData = json?.responseData || {};
        if (!mounted) return;
        setData(responseData);
        setFirstStory(responseData.firstStory || null);
        setTopStories(responseData.topStories || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (!mounted) return;
        setData({ data: [] });
        setFirstStory(null);
        setTopStories([]);
      } finally {
        if (mounted) setLoaded(true);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  if (!loaded) return <SkeltonLoader2 />;

  return (
    <>
      <Blogpage stories={data || { data: [] }} topStories={topStories || []} />
    </>
  );
};

export default Blog;

 