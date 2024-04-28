"use client";



import Blogsmain from "../../../../Modules/Blog/blog";
import { useParams } from 'next/navigation'
import { useState, useEffect } from "react";
import axios from "axios";

const Blog = () => {
  const params = useParams()
  console.log(params)
  const [data, setData] = useState(null);
  const [firstStory, setFirstStory] = useState(null);
  const [topStories, setTopStories] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://www.bimcopilot.com/api/");
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
    return <p>Loading...</p>;
  }
  console.log(data, "data"," ");
  console.log(firstStory,"first")




    return (

      <Blogsmain stories={data.data} firstStory={firstStory} />
       
    )
    
}

export default Blog;