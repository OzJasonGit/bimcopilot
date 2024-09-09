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
  const storiesSolo_1 = stories.filter((story, i) => i == 3)
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

                <div  id={styles.SALES_IMAGE_HOLDER}>
                    
                        <div class="rounded-xl ..." id={styles.SALES_IMAGE}>
                            {storiesSolo_1.map((story, index) => {
                                  return (
                            <Link href="/services">
                                <Image
                                alt="Picture of the author"
                                key={story._id}
                                width={500}
                                height={500}
                                src={story.image}
                                style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                }}/>
                            </Link>
                            )})} 
                        </div>   

                        <div id={styles.SALES_IMAGE_2}>
                            <div id={styles.SALES_IMAGE_3}>

                            </div>
                        </div>                     
                                     
                </div>

                <div id={styles.SALES_CHECKOUT_HOLDER}>
                    <div  id={styles.C1}>
                        <h3 class="text-4xl ... text-stone-700 ... font-avant_garde_bold">
                            This is a test title
                        </h3>
                    </div>

                    <div  id={styles.C2}>
                        <h3 class="text-md ... text-stone-700 ... font-geist_semibold">
                            $12.99
                        </h3>

                        <h3 class="text-md ... text-stone-700 ... font-geist_semibold">
                            Tax included. 
                        </h3>
                    </div>

                    <div  id={styles.C3}>
                        <h3 class="text-md ... text-stone-700 ... font-geist_semibold">
                            License Type.
                        </h3>

                        

                        <h3  class="text-md ... text-stone-700 ... font-geist_regular">
                            Are you a student? Select Educational Use.
                        </h3>
                    </div>

                    <div  id={styles.C4}>
                       <div  id={styles.CHECKOUT_GRID}>
                            <div id={styles.ADD_TO_CART}>                              
                            </div>

                            <div id={styles.PAYPAL}>                               
                            </div>

                            <div id={styles.MORE_OPTIONS}>                               
                            </div>
                        </div>
                    </div>


                    <div  id={styles.C5}>
                        <h3 class="text-md ... text-stone-700 ... font-geist_regular">
                           For Educational Use (Reduced price) please send us an email with your 
                           student card and info to <a>info@bimcopilot.com</a>
                        </h3>
                    </div>


                    <div  id={styles.C6}>
                        <h3 class="text-md ... text-stone-700 ... font-geist_regular">
                           <a></a> Digital Download
                        </h3>

                        <h3 class="text-md ... text-stone-700 ... font-geist_regular">
                           <a></a> Revit Version 2020
                        </h3>

                        <h3 class="text-md ... text-stone-700 ... font-geist_regular">
                           <a></a> Created By: Bimcopilot.com
                        </h3>

                        <h3 class="text-md ... text-stone-700 ... font-geist_regular">
                           <a></a> Pack Category: <a></a>
                        </h3>
                    </div>


                    <div  id={styles.C7}> 
                        <Collapsed/>
                    </div>
                    
                </div>

            </div>
        </div>
      </section>



      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
        <div class={styles.grid_0_scroll}>
            <div id={styles.BOUGHT_TOGETHER_GRID}> 

                <div id={styles.BOUGHT_TOGETHER_BLOCK}>
                    <div id={styles.BOUGHT_TITLE_HOLDER}>
                        <h3 id={styles._H3} class="text-4xl ... text-stone-700 ... font-avant_garde_bold">
                            Frequently Bought Together
                        </h3>
                    </div>

                    <div id={styles.BOUGHT_IMAGE_HOLDER}>
                    </div>
                </div>

                <div id={styles.PRODUCT_DESCRIPTION}>
                    <div id={styles.P_TITLE}>
                    </div>

                    <div  id={styles.P_DESCRIPTION}>                         
                    </div>

                    <div  id={styles.P_IMAGES}>                           
                    </div>
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



                    

                    













