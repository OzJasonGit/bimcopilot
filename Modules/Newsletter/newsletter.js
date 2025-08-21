'use client'

import styles from './newsletter.module.css';

import { useRouter } from "next/navigation";

import Menu from "../../components/Menu/menu";

import Subscribe_2 from "../../components/Subscribetop/subscribe_2";
import Sides from "../../components/Sides/sides";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Collapsed_Sales from "../../components/Collapse_Sales/collapse_sales";

import Services_1 from "../../components/services_bimcopilot/services_1";


import Image from "next/image";


const Saleslanding = ({ stories, firstStory }) => {
  const storiesSolo_1 = stories.filter((story, i) => i == 3)
  const storiesToMap = stories.filter((story, i) => i != 0);
  const router = useRouter();

   return (

    <>
      <Menu/>
      <Header/>
      <Sides/>

      <Services_1/>



      

      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
        <Subscribe_2/>     
      </section>


      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
        <div class={styles.grid_0_scroll}>
            <div id={styles.SALES_GRID_HOLDER}>

                <div  id={styles.SALES_IMAGE_HOLDER}>


                        

                        <div id={styles.SALES_IMAGE_1}>
                            <h2  class="text-6xl ... text-stone-400 ... font-avant_garde_bold" 
                                style={{
                                paddingBottom: "0",
                                }}>
                                Newsletter
                            </h2>                                                
                        </div>  

                        
                    
                        <div class="rounded-xl ..." id={styles.SALES_IMAGE_2}>
                            <div>
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


                        <div id={styles.BODY_HOLDER}>
                            <div 
                                style={{
                                    gridArea: 'TITLE'                                  
                                }}>
                                    <h3 class="text-3xl ... text-stone-200 ... font-avant_garde_bold">
                                        What the hell does this mean 

                                    </h3>
                            </div>
                            <div 
                                style={{
                                    gridArea: 'BODY'                                  
                                }}>
                                    <p class="text-lg ... text-stone-400 ... font-avant_garde_medium">
                                        This is the paragraph who are you? 
                                        
                                    </p>
                            </div>
                        </div>                                          
                                     
                </div>

              

            </div>
        </div>
      </section>



      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
        <div class={styles.grid_0_scroll}>

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


                <div class="rounded-lg ..." id={styles.SALES_IMAGE_B}>
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



            <div id={styles.BOUGHT_TOGETHER_GRID}> 

                <div id={styles.BOUGHT_TOGETHER_BLOCK}>


                      



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


                            <div class="rounded-lg ..." id={styles.SALES_IMAGE_B}>
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

                    

                </div>

            </div>
        </div>
      </section>
    
    <Footer/>


    </>

 );
};

export default Saleslanding;



                    

                    













