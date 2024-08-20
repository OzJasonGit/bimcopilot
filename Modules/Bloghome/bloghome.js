'use client'

import styles from './bloghome.module.css';

import { useRouter } from "next/navigation";

import Menu from "../../components/Menu/menu";
import Sides from "../../components/Sides/sides";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Subscribetop from "../../components/Subscribetop/subscribetop";

import Link from "next/link";
import Image from "next/image";

import logoImage from "./Bim-copilot-logo_2.png";




const Bloghomemain = ({ stories, firstStory }) => {
  const storiesToMap = stories.filter((story, i) => i != 0);
  const router = useRouter();

   return (

    <>
      <Menu/>
      <div id={styles.main}></div>
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
                                          }}/>
                                        </Link>                                 
                                        
                                      </div> 

                                      <div id={styles.BLOG_TEXT}> 
                                        <h2 id={styles._H3} class="text-stone-300 ...  text-2xl ... font-avant_garde_bold">
                                          {story.title}
                                        </h2>
                                      

                                        
                                      
                                        <h3 id={styles._H3} class="text-stone-400 ... font-avant_garde_bold">
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

export default Bloghomemain;
