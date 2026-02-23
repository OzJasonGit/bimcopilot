"use client";
import Bloghomemain from "../../../Modules/Bloghome/bloghomemain";
import { useState, useEffect } from "react";
import axios from "axios";
import SkeletonLoader from "@/components/Loader/loader";

const Bloghome = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const res = await axios.get("/api/bloghome_route");
        const { responseData } = res.data;
        if (!responseData || !Array.isArray(responseData.data)) {
          setData({ data: [] });
          return;
        }
        setData(responseData);
      } catch (err) {
        console.error("Error fetching bloghome data:", err);
        const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Failed to load stories";
        setError(msg);
        setData({ data: [] });
      }
    };

    fetchData();
  }, []);

  if (error && !data) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", minHeight: "40vh" }}>
        <p style={{ color: "#ef4444", marginBottom: "0.5rem" }}>Stories could not be loaded.</p>
        <p style={{ color: "#888", fontSize: "0.9rem" }}>{error}</p>
      </div>
    );
  }

  if (!data) {
    return <SkeletonLoader />;
  }

  return <Bloghomemain stories={Array.isArray(data.data) ? data.data : []} />;
};

export default Bloghome;
