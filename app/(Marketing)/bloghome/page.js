"use client";
import Bloghomemain from "../../../Modules/Bloghome/bloghomemain";
import { useState, useEffect } from "react";
import axios from "axios";
import SkeletonLoader from "@/components/Loader/loader";


const PAGE_SIZE = 9;

const Bloghome = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/bloghome_route", {
          params: { page, limit: PAGE_SIZE },
        });
        const { responseData } = res.data;
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup code if needed
    };
  }, [page]); // Refetch when page changes

  if (!data) {
    return <SkeletonLoader />;
  }

  return (
    <Bloghomemain
      stories={data.data}
      currentPage={data.page}
      totalPages={data.totalPages}
      onPageChange={(nextPage) => setPage(nextPage)}
      isLoading={isLoading}
    />
  );
};

export default Bloghome;
