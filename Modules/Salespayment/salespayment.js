'use client'

import styles from './salespayment.module.css';

import { useRouter } from "next/navigation";

import Menu_White from "../../components/Menu_White/menu_white";
import Sides from "../../components/Sides/sides";
import Header_White from "../../components/Header_White/Header_White";
import Footer from "../../components/Footer/Footer_White";
import Collapsed_Sales from "../../components/Collapse_Sales/collapse_sales";

import Services_1 from "../../components/services_1/services_1";

import Link from "next/link";
import Image from "next/image";


import { Button } from "@/components/ui/button"


import bimcopilot from './Bim-copilot-logo_Horizontal.png';


const Salespayment = ({ stories, firstStory }) => {
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

                        <div id={styles.SALES_IMAGE_2}>
                            <div id={styles.SALES_IMAGE_3}>

                                 <div class="rounded-xl ..." id={styles.SALES_IMAGE_V}>
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

                                 <div class="rounded-xl ..." id={styles.SALES_IMAGE_W}>
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

                                <div class="rounded-xl ..." id={styles.SALES_IMAGE_X}>
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

                                <div class="rounded-xl ..." id={styles.SALES_IMAGE_Y}>
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

                                <div class="rounded-xl ..." id={styles.SALES_IMAGE_Z}>
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
                                <Button style={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",}}> Add To Cart 
                                </Button>                  
                            </div>

                            <div id={styles.PAYPAL}>  
                                <Button variant="secondary"  style={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",}}>Buy With Paypal
                                </Button>                                 
                            </div>

                            <div id={styles.MORE_OPTIONS}>    
                                <a>
                                </a>                           
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
                        <h3 id={styles._H3} class="text-4xl ... text-stone-700 ... font-avant_garde_bold">
                            Frequently Bought Together
                        </h3>
                    </div>

                    <div id={styles.BOUGHT_IMAGE_HOLDER}>

                    <div class="rounded-xl ..." id={styles.SALES_IMAGE_A}>
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


                    <div class="rounded-xl ..." id={styles.SALES_IMAGE_B}>
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

                    <div class="rounded-xl ..." id={styles.SALES_IMAGE_C}>
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

                            <div class="rounded-xl ..." id={styles.SALES_IMAGE_A}>
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


                            <div class="rounded-xl ..." id={styles.SALES_IMAGE_B}>
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

                            <div class="rounded-xl ..." id={styles.SALES_IMAGE_C}>
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
                        <h2 id={styles._H3} class="text-4xl ... text-stone-700 ... font-avant_garde_bold">
                            This is the description title 
                        </h2>
                    </div>

                    <div  id={styles.P_SUBTITLE}>   
                        <h3 id={styles._H3} class="text-lg ... text-stone-700 ... font-avant_garde_bold">
                            This is the description title 
                            Delta compression using up to 12 threads
                            Compressing objects: 100% (5/5), done.     

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
                        </h3>
                    </div>

                    <div  id={styles.P_DESCRIPTION}>  
                         <h3 id={styles._H3} class="text-md ... text-stone-700 ... font-geist_regular">
                            Delta compression using up to 12 threads
                            Compressing objects: 100% (5/5), done.
                            Writing objects: 100% (5/5), 440 bytes | 440.00 KiB/s, done.
                            Total 5 (delta 4), reused 0 (delta 0), pack-reused 0
                            remote: Resolving deltas: 100% (4/4), completed with 4 local objects.
                            Compressing objects: 100% (5/5), done.
                            Writing objects: 100% (5/5), 440 bytes | 440.00 KiB/s, done.
                            Total 5 (delta 4), reused 0 (delta 0), pack-reused 0
                            remote: Resolving deltas: 100% (4/4), completed with 4 local objects.
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

export default Salespayment;



                    

                    













