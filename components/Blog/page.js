
import { useState, useEffect } from "react";
import React from "react";
// import Blogpage from "./blogPage";
import axios from "axios";
import SkeletonLoader from "../Loader/loader";
const Blogpage = React.lazy(()=> import("./blogPage"))
import "./blogPage"

const Blog = () => {
  const [data, setData] = useState(null);
  const [firstStory, setFirstStory] = useState(null);
  const [topStories, setTopStories] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://www.bimcopilot.com/api");
        const { responseData } = res.data;
        setData(responseData);
        setFirstStory(responseData.firstStory);
        setTopStories(responseData.topStories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Cleanup code if needed
    };
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

         if (!data || !firstStory || !topStories) {
     return <SkeletonLoader/>
   }
  return (
    <>
      <Blogpage stories={data} topStories={topStories} />
    </>
  );
};

export default Blog;

 