'use client'

import styles from './copilot_dashboard.module.css';

import { useRouter } from "next/navigation";

import Menu from "../../components/Menu/menu";


import Subscribetop from "../../components/Subscribetop/subscribetop";
import Subscribe_2 from "../../components/Subscribetop/subscribe_2";
import Sides from "../../components/Sides/sides";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Collapsed_Sales from "../../components/Collapse_Sales/collapse_sales";

import Services_1 from "../../components/services_1/services_black";

import Link from "next/link";
import Image from "next/image";


import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


import bimcopilot from './Bim-copilot-logo_Horizontal.png';


const Copilot_Dashboard = ({ stories, firstStory }) => {
  const storiesSolo_1 = stories.filter((story, i) => i == 3)
  const storiesSolo_2 = stories.filter((story, i) => i == 1)
  const storiesToMap = stories.filter((story, i) => i != 0);
  const router = useRouter();

   return (

    <>
      <Menu/>
      <Header/>
      <Sides/>

      <Services_1/>
      <Subscribe_2/>
      


      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
        <div class={styles.grid_0_main_image}>
            <div id={styles.MAIN_IMAGE_GRID_HOLDER}>

                <div class="rounded-xl ..." style={{
                     position: "relative",
                     gridArea: "IMAGE",
                     overflow: "hidden",  
                     }}>
                    <iframe
                    
                    style={{
                     position: "relative",
                     gridArea: "IMAGE",
                     overflow: "hidden", 
                     height: "700px", 
                     }}
                    src="https://speckle.xyz/embed?stream=8c614e6658&commit=31247f8195&transparent=true&autoload=true&hidecontrols=true&hidesidebar=true&hideselectioninfo=true&commentslideshow=true" width="100%" frameborder="0"></iframe>   {/* src={rocketShip}
                    {/*<div style={{
                        position: "relative",
                        width: "100%",
                        height: "700px",                                      
                        }} class="rounded-xl ..." id={styles.MAIN_IMAGE}>
                            {storiesSolo_2.map((story, index) => {
                                return (                
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
                            )})}
                    </div>*/}
                </div>




                <div id={styles.CHARTS_CONTAINER} class="rounded-xl ..." style={{
                     position: "relative",
                     gridArea: "CHARTS",
                     overflow: "hidden", 
                     width: "100%",
                     height: "100%"
                     }}>

                        <div id={styles.CHARTS_1} class="rounded-xl ... bg-stone-300" style={{
                            position: "relative",
                            gridArea: "CHART_1",
                            overflow: "hidden", 
                            width: "100%",
                            height: "100%"
                            }}>
                        </div>

                        <div id={styles.CHARTS_2} class="rounded-xl ... bg-stone-300" style={{
                            position: "relative",
                            gridArea: "CHART_2",
                            overflow: "hidden", 
                            width: "100%",
                            height: "100%"
                            }}>
                        </div>                   
                </div>


                <div id={styles.CHARTS_3} class="rounded-xl ... bg-stone-300" style={{
                    position: "relative",
                    gridArea: "CHARTS_III",
                    overflow: "hidden", 
                    width: "100%",
                    height: "320px"
                    }}>
                </div>



                <div id={styles.CHARTS_4} class="rounded-xl ... bg-stone-300" style={{
                    position: "relative",
                    gridArea: "CHARTS_IIII",
                    overflow: "hidden", 
                    width: "100%",
                    height: "450px"
                    }}>
                </div>



                <div id={styles.CHARTS_CONTAINER_2} class="rounded-xl ... bg-stone-300" style={{
                    position: "relative",
                    gridArea: "CHARTS_V",
                    overflow: "hidden", 
                    width: "100%",
                    height: "100%"
                    }}>

                        <div id={styles.CHARTS_5} class="rounded-xl ... bg-stone-300" style={{
                            position: "relative",
                            gridArea: "CHARTS_5",
                            overflow: "hidden", 
                            width: "100%",
                            height: "100%",                    
                            }}>
                        </div>

                        <div id={styles.CHARTS_5} class="rounded-xl ... bg-stone-300" style={{
                            position: "relative",
                            gridArea: "CHARTS_6",
                            overflow: "hidden", 
                            width: "100%",
                            height: "100%",                    
                            }}>
                        </div>

                </div>

                                
            </div>
        </div>
      </section>


      



      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
        <div class={styles.grid_0_main_image}>
            <div id={styles.COMMUNITIES_HOLDER}>

                <div class="rounded-xl ..." style={{
                     position: "relative",
                     gridArea: "COMMUNITIES",
                     overflow: "hidden",  
                     }}>
                    <div style={{
                        position: "relative",
                        width: "100%",
                        height: "300px",                                      
                        }} class="rounded-xl ..." id={styles.COMMUNITIES}>
                            {storiesSolo_2.map((story, index) => {
                                return (                
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
                            )})}
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
                        <h3 id={styles._H3} class="text-4xl ... text-stone-400 ... font-avant_garde_bold">
                            Current Listings <br/>
                            
                        </h3>
                    </div>

                    <div id={styles.BOUGHT_IMAGE_HOLDER}>

                        <div class="rounded-lg ..." id={styles.SALES_IMAGE_A}>
                            {storiesSolo_1.map((story, index) => {
                                  return (                      
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
                            )})} 
                        </div>  

                        <div  id={styles.SALES_TEXT_HOLDER}
                              style={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                gridArea: "SALES_TEXT_HOLDER",                               
                                }}>

                                    
                        </div>

                    </div>  
                </div>


                <div id={styles.BOUGHT_IMAGE_HOLDER_MOBILE}>
                    <div id={styles.BOUGHT_TOGETHER_GRID_MOBILE}> 

                        <div id={styles.BOUGHT_IMAGE_MOBILE}>

                            <div class="rounded-lg ..." id={styles.SALES_IMAGE_A}>
                                {storiesSolo_1.map((story, index) => {
                                        return (                      
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
                                )})} 
                            </div>                 

                        </div> 

                    </div>                                     
                </div>

                <div id={styles.PRODUCT_DESCRIPTION}>
                    <div id={styles.P_TITLE}>
                        <h2 id={styles._H3} class="text-4xl ... text-stone-400 ... font-avant_garde_bold">
                            Shop Here 
                        </h2>
                    </div>

                    <div  id={styles.P_SUBTITLE}>   
                        <h3 id={styles._H3} class="text-lg ... text-stone-200 ... font-avant_garde_bold">
                            This is the description title 
                            Delta compression using up to 12 threads
                            Compressing objects: 100% (5/5), done.     

                            <a class="text-stone-200 ... font-avant_garde_bold"
                            >
                            Automated systems for Architects, Designers and Manufacturers.
                            </a>{" "}                                               
                        </h3>
                    </div>

                    <div  id={styles.P_DESCRIPTION}>  
                         <h3 id={styles._H3} class="text-md ... text-stone-200 ... font-geist_regular">
                            Delta compression using up to 12 threads
                            Compressing objects: 100% (5/5), done.
                            Writing objects: 100% (5/5), 440 bytes | 440.00 KiB/s, done.
                            Total 5 (delta 4), reused 0 (delta 0), pack-reused 0
                            remote: Resolving deltas: 100% (4/4), completed with 4 local objects.
                            Compressing objects: 100% (5/5), done.
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

export default Copilot_Dashboard;



                    

                    













