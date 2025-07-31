import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu/menu";
import Header from "../../components/Header/Header";
import Sides from "../../components/Sides/sides";
import Footer from "../../components/Footer/Footer";
import Subscribetop from "../../components/Subscribetop/subscribetop";
import Astronaut from "@/components/Astronaut/astronaut";
import Tiktoktop from "../../components/Tiktoktop/tiktoktop";
import Herotitle from "@/components/Herotitle/herotitle";
import Products from "@/components/Products/products";
import About from "@/components/About/page";
import Blog from "@/components/Blog/page";
import Mainvideo from "@/components/Mainvideo/page";
import Subfooter from "@/components/Subfooter/subfooter";
import Subfooter2 from "@/components/Subfooter2/subfooter2";
import SkeletonLoader from "@/components/Loader/loader";
import SkeletonLoader2 from "@/components/Loader/loader2";


const Main = ({ }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for content loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay as per your API response time

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <>
          <Menu />

          <Header />
          <Sides />
          <Subscribetop />
          <div style={{ minHeight: "1080px", width: "100%" }}>
            {loading ? <SkeletonLoader2 /> : <Blog />}
          </div>
          {/* <Tiktoktop /> */}
          <div style={{ position: "relative", zIndex: 1, marginTop: "-50px" }}>
            <Tiktoktop />
          </div>
          <Herotitle />
          <Products />
          <Astronaut />
          <About />
          <Mainvideo />
          <Subfooter /> 
          <Subfooter2 />
          <Footer />

        </>
      )}
    </>
  );
};

export default Main;
