"use client";

import Copilot_Dashboard from "../../../Modules/Copilot_Dashboard/copilot_dashboard";
import { useState, useEffect } from "react";
import axios from "axios";
import SkeletonLoader from "@/components/Loader/loader";
const copilot_dashboard = () => {
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

        <Copilot_Dashboard stories={data.data} firstStory={firstStory} />

    ) 
}

export default copilot_dashboard;