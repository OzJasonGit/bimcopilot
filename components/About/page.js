
import { useState, useEffect } from "react";
import Aboutpage from "./aboutPage";
import axios from "axios";
import SkeletonLoader from "../Loader/loader";


const About = () => {
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
      <Aboutpage stories={data.data} firstStory={firstStory} />
    </>
  );
};

export default About;
