"use client";


import Bloghomemain from "../../../Modules/Bloghome/bloghomemain";
import { useState, useEffect } from "react";
import axios from "axios";

const Bloghome = () => {
  const [data, setData] = useState(null);
  const [firstStory, setFirstStory] = useState(null);
  const [topStories, setTopStories] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://www.bimcopilot.com/api/bloghome_route");
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

        <Bloghomemain stories={data.data} firstStory={firstStory} />

    )
    
}

export default Bloghome;