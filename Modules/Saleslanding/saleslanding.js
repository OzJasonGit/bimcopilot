'use client'

import styles from './saleslanding.module.css';

import { useRouter } from "next/navigation";

import Menu_White from "../../components/Menu_White/menu_white";
import Sides from "../../components/Sides/sides";
import Header_White from "../../components/Header_White/Header_White";
import Footer from "../../components/Footer/Footer_White";
import Collapsed from "../../components/Collapse/collapse";
import Infinite_Scroll_2 from "../../components/Carousel/Infinite_Scroll_Services";

import Services_1 from "../../components/services_1/services_1";

import Link from "next/link";
import Image from "next/image";


import bimcopilot from './Bim-copilot-logo_Horizontal.png';


const Saleslanding = ({ stories, firstStory }) => {
  const storiesToMap = stories.filter((story, i) => i != 0);
  const router = useRouter();

   return (

    <>
      <Menu_White/>
      <Header_White/>
      <Sides/>

      <Services_1/>


      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
        <div class={styles.grid_0_scroll}>
            <div id={styles.SALES_GRID_HOLDER}>

                <div id={styles.SALES_IMAGE_HOLDER}>
                </div>

                <div id={styles.SALES_CHECKOUT_HOLDER}>
                </div>

            </div>
        </div>
      </section>


      
      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_scroll}>
            <div class={styles.sub_head}>
              <div id={styles.SUBSCRIBE} class={"border-emerald-200"}>
                <div id={styles.SUB_ICON}>
                  
                </div>

                <div id={styles.MAIN_TAG}>
                  <h1
                   
                    id={styles.H2_7XL}
                    class="text-left ... text-7xl ... text-neutral-700 ... font-avant_garde_bold"
                    
                    
                  >        
                    A <a  class=" text-stone-50 ..." 
                    id={styles.TEXT_OUTLINE}>BIM,</a> <a class=" text-stone-50 ..." id={styles.TEXT_OUTLINE}>AI,</a> <a class=" text-stone-50 ..."
                    id={styles.TEXT_OUTLINE}>
                    Automation</a> and <a class="text-stone-50 ..." 
                    id={styles.TEXT_OUTLINE}>Analytics</a> Consultancy
                  </h1>
                </div>
                <div id={styles.SUB_TAG}>
                  <h3
                    id={styles._H3}
                    class="text-left ... text-lg ... text-neutral-500 ... font-avant_garde_bold"
                  >
                    {" "}
                
                    <a class="text-stone-700 ... font-avant_garde_bold"
                      >
                      Automated systems for Architects, Designers and Manufacturers.
                    </a>{" "}
                    Gain valuable insights, streamline your business, be more{" "} 
                    <a class="text-stone-700 ... font-avant_garde_bold"
                       >
                      profitable 
                    </a>, be more{" "}
                    <a class="text-stone-700 ... font-avant_garde_bold"
                      >
                      sustainable
                    </a>                  
                    . <br /> <br />{" "}


                  
                  </h3>
                </div>
              </div>
            </div>
          </div>
      </section>

     
    <Footer/>


    </>

 );
};

export default Saleslanding;



                    

                    













