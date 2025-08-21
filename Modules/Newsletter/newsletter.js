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
        <div class={styles.grid_0_scroll}>
            <div id={styles.SALES_GRID_HOLDER}>

                <div  id={styles.SALES_IMAGE_HOLDER}>

                        <div id={styles.SALES_IMAGE_1}>
                            <h2  class="text-7xl ... text-stone-400 ... font-avant_garde_bold" 
                                style={{
                                paddingBottom: "0",
                                }}>
                                Newsletter
                            </h2>                                                
                        </div>  

                        <div id={styles.SALES_SUBSCRIBE}>
                            <Subscribe_2/>
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
                                     
                </div>

                <div id={styles.SALES_CHECKOUT_HOLDER}>

                    <div  id={styles.C1} class="justify-items-end">
                        <h3 class="text-md ... text-stone-200 ... font-geist_semibold text-right">
                            License Type.
                        </h3>

                        <br/> 

                        
                                              
                        <h3  class="text-md ... text-stone-200 ...font-geist_regular text-right">
                            Are you a student? Select Educational Use.
                        </h3>
                    </div>


                    <br/> 

                    <div id={styles.C2}>
                        <div id={styles.PHONE_CONTAINER} class="bg-stone-200 ... rounded-xl ..."
                             style={{
                                    position: "relative",
                                    width: "100%",
                                    height: "440px", 
                                    gridArea: "PHONE",                                 
                                    }}>
                        </div>
                    </div>

                    <br/> 


                    <div  id={styles.C7}> 
                        <Collapsed_Sales/>
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
                            Useful Tools for Designers <br/>
                            Architects and Enthusiasts  
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

                    <div class="rounded-lg ..." id={styles.SALES_IMAGE_C}>
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

                            <div class="rounded-lg ..." id={styles.SALES_IMAGE_C}>
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

export default Saleslanding;



                    

                    













