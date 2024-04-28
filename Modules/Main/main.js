import styles from "./main.module.css";

import "antd/dist/reset.css";


import Menu from "../../components/Menu/menu";
import Header from "../../components/Header/Header";
import Sides from "../../components/Sides/sides";
import Footer from "../../components/Footer/Footer";


import Subscribetop from "../../components/Subscribetop/subscribetop";
import Astronaut from "@/components/Astronaut/astronaut";
import World from "@/components/World/world";
import Tiktoktop from "../../components/Tiktoktop/tiktoktop";
import Herotitle from "@/components/Herotitle/herotitle";
import Products from "@/components/Products/products";
import About from "@/components/About/page";
import Blog from "@/components/Blog/page";
import Process from "@/components/Process/process";
import Mainvideo from "@/components/Mainvideo/page";
import Subfooter from "@/components/Subfooter/subfooter";
import Subfooter2 from "@/components/Subfooter2/subfooter2";


import { useRouter } from "next/navigation";








const Main = ({ stories, firstStory }) => {
  const storiesToMap = stories.filter((story, i) => i != 0);
  const router = useRouter();

  return (
    <>

      <Menu />
      <Header />
      <Sides />
      <Subscribetop/>

      <Blog/>


      <Tiktoktop/>
      <Herotitle/>
      <Products/>
      <Astronaut/>
      {/*<World/>*/}
      <About/>
      {/*<Process/>*/}
      <Mainvideo/>
      <Subfooter/>
      <Subfooter2/>
      
      <Footer/>

    </>
  );
};

export default Main;
