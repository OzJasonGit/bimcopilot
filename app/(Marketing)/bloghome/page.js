"use client";
import Bloghomemain from "../../../Modules/Bloghome/bloghomemain";
import { useState, useEffect } from "react";
import axios from "axios";
import SkeletonLoader from "@/components/Loader/loader";


const Bloghome = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://www.bimcopilot.com/api/bloghome_route");
        const { responseData } = res.data;
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      // Cleanup code if needed
    };
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  if (!data) {
    return <SkeletonLoader />;
  }

  return <Bloghomemain stories={data.data} />;
};

export default Bloghome;
