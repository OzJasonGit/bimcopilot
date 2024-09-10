'use client'


import styles from './products.module.css';

import { useRouter } from "next/navigation";

import Menu from "../../components/Menu/menu";
import Sides from "../../components/Sides/sides";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Subscribetop from "../../components/Subscribetop/subscribetop";
import Image from "next/image";
import Link from "next/link";

const Productsmain = ({ stories, firstStory }) => {
  const storiesToMap = stories.filter((story, i) => i != 0);
  const storiesSolo_1 = stories.filter((story, i) => i == 3)
  const storiesSolo_2 = stories.filter((story, i) => i == 2)
  const router = useRouter();

   return (

    <>
      <Menu/>
      <Header/>
      <Sides/>
      <Subscribetop/>

      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_blogimageholder}>
             <div class={styles.grid_0_blogimage}>
              <div id={styles.BLOGIMAGE_HOLDER}>
                {storiesToMap.map((story, index) => {
                                  return (

                                    <div id={styles.BLOGIMAGE}>

                                      <div class="rounded-md ..." id={styles.B_IMAGE}> 

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
                                            }}
                                            />
                                         </Link>
                                        
                                      </div> 

                                        <div id={styles.PRODUCT_TEXT}> 

                                          <h2 id={styles._H2} class="text-xl ... text-stone-200 ... font-geist_semibold ...">
                                            {story.title}
                                          </h2>                                      
                                          <h3 id={styles._H3} class="text-stone-400 ... font-geist_regular ...">
                                            {story.subtitle}
                                          </h3>

                                        </div>
                                      </div>                               
                )})}
              </div>              
            </div>
          </div>
      </section>







      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
        <div class={styles.grid_0_blogimageholder}>
          <div class={styles.grid_0_blogimage}>
            <div id={styles.BLOGIMAGE_HOLDER_GRID}>

              <div id={styles.BLOGIMAGE_HOLDER_GRID_1}>
                {storiesSolo_1.map((story, index) => {
                                  return (

                                    <div id={styles.BLOGIMAGE}>

                                      <div class="rounded-md ..." id={styles.B_IMAGE}> 

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
                                            }}
                                            />
                                         </Link>
                                        
                                      </div> 

                                        <div id={styles.PRODUCT_TEXT}> 

                                          <h2 id={styles._H2} class="text-xl ... text-stone-200 ... font-geist_semibold ...">
                                            {story.title}
                                          </h2>                                      
                                          <h3 id={styles._H3} class="text-stone-400 ... font-geist_regular ...">
                                            {story.subtitle}
                                          </h3>

                                        </div>
                                      </div>                               
                )})}
              </div>


              <div id={styles.BLOGIMAGE_HOLDER_GRID_2}>
                {storiesSolo_1.map((story, index) => {
                                  return (

                                    <div id={styles.BLOGIMAGE_2}>

                                      <div class="rounded-md ..." id={styles.B_IMAGE}> 

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
                                            }}
                                            />
                                         </Link>
                                        
                                      </div> 

                                        <div id={styles.PRODUCT_TEXT}> 

                                          <h2 id={styles._H2} class="text-xl ... text-stone-200 ... font-geist_semibold ...">
                                            {story.title}
                                          </h2>                                      
                                          <h3 id={styles._H3} class="text-stone-400 ... font-geist_regular ...">
                                            {story.subtitle}
                                          </h3>

                                        </div>
                                      </div>                               
                )})}
              </div>

            </div>
          </div>
        </div>
      </section>















      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
            <div class={styles.grid_0_blogimageholder}>
              <div class={styles.grid_0_blogimage}>
                <div id={styles.BLOGIMAGE_HOLDER}>
                  {storiesToMap.map((story, index) => {
                                    return (

                                      <div id={styles.BLOGIMAGE}>

                                        <div class="rounded-md ..." id={styles.B_IMAGE}> 

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
                                              }}
                                              />
                                          </Link>
                                          
                                        </div> 

                                          <div id={styles.PRODUCT_TEXT}> 

                                            <h2 id={styles._H2} class="text-xl ... text-stone-200 ... font-geist_semibold ...">
                                              {story.title}
                                            </h2>                                      
                                            <h3 id={styles._H3} class="text-stone-400 ... font-geist_regular ...">
                                              {story.subtitle}
                                            </h3>

                                          </div>
                                        </div>                               
                  )})}
                </div>              
              </div>
            </div>
        </section>




















        




      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
        <div class={styles.grid_0_blogimageholder}>
          <div class={styles.grid_0_blogimage}>
            <div id={styles.BLOGIMAGE_HOLDER_GRID_TWO}>

              <div id={styles.BLOGIMAGE_HOLDER_GRID_1}>
                {storiesSolo_2.map((story, index) => {
                                  return (

                                    <div id={styles.BLOGIMAGE}>

                                      <div class="rounded-md ..." id={styles.B_IMAGE}> 

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
                                            }}
                                            />
                                         </Link>
                                        
                                      </div> 

                                        <div id={styles.PRODUCT_TEXT}> 

                                          <h2 id={styles._H2} class="text-xl ... text-stone-200 ... font-geist_semibold ...">
                                            {story.title}
                                          </h2>                                      
                                          <h3 id={styles._H3} class="text-stone-400 ... font-geist_regular ...">
                                            {story.subtitle}
                                          </h3>

                                        </div>
                                      </div>                               
                )})}
              </div>


              <div id={styles.BLOGIMAGE_HOLDER_GRID_2}>
                {storiesSolo_2.map((story, index) => {
                                  return (

                                    <div id={styles.BLOGIMAGE_2}>

                                      <div class="rounded-md ..." id={styles.B_IMAGE}> 

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
                                            }}
                                            />
                                         </Link>
                                        
                                      </div> 

                                        <div id={styles.PRODUCT_TEXT}> 

                                          <h2 id={styles._H2} class="text-xl ... text-stone-200 ... font-geist_semibold ...">
                                            {story.title}
                                          </h2>                                      
                                          <h3 id={styles._H3} class="text-stone-400 ... font-geist_regular ...">
                                            {story.subtitle}
                                          </h3>

                                        </div>
                                      </div>                               
                )})}
              </div>

            </div>
          </div>
        </div>
      </section>
























        <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_blogimageholder}>
             <div class={styles.grid_0_blogimage}>
              <div id={styles.BLOGIMAGE_HOLDER}>
                {storiesToMap.map((story, index) => {
                                  return (

                                    <div id={styles.BLOGIMAGE}>

                                      <div class="rounded-md ..." id={styles.B_IMAGE}> 

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
                                            }}
                                            />
                                         </Link>
                                        
                                      </div> 

                                        <div id={styles.PRODUCT_TEXT}> 

                                          <h2 id={styles._H2} class="text-xl ... text-stone-200 ... font-geist_semibold ...">
                                            {story.title}
                                          </h2>                                      
                                          <h3 id={styles._H3} class="text-stone-400 ... font-geist_regular ...">
                                            {story.subtitle}
                                          </h3>

                                        </div>
                                      </div>                               
                )})}
              </div>              
            </div>
          </div>
      </section>






















        
      

      <Footer/>
      
    </>

    

 );
};

export default Productsmain;