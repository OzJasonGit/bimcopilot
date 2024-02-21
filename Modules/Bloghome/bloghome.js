'use client'

import styles from './bloghome.module.css';

import { useRouter } from "next/navigation";

import Menu from "../../components/Menu/menu";
import Sides from "../../components/Sides/sides";
import Header from "../../components/Header/Header";

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

      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_subscribe}>
            <div class={styles.sub_head}>
              <div id={styles.SUBSCRIBE} class={"border-emerald-200"}>
                <div id={styles.SUB_ICON}></div>

                <div id={styles.MAIN_TAG}>
                  <h1
                   
                    id={styles._H1}
                    class="text-6xl ... text-stone-200 ... font-avant_garde_bold"
                  >
           
                    Sustainable, Richer Architects through Automation
                  </h1>
                </div>
                <div id={styles.SUB_TAG}>
                  <h3
                    id={styles._H3}
                    class="text-left ... text-xl ... text-stone-400 ... font-avant_garde_medium"
                  >
                    {" "}
                
                    <a class="text-stone-200 ... font-avant_garde_bold">
                      Join the design revolution!
                    </a>{" "}
                    The world is changing and so is{" "}
                    <a class="text-stone-200 ... font-avant_garde_bold">
                      architecture
                    </a>
                    . Discover new narratives, build better{" "}
                    <a class="text-stone-200 ... font-avant_garde_bold">
                      systems
                    </a>
                    , make more{" "}
                    <a class="text-stone-200 ... font-avant_garde_bold">money</a>,
                    be more{" "}
                    <a class="text-stone-200 ... font-avant_garde_bold">
                      sustainable
                    </a>
                    . <br /> <br />{" "}
                  
                  </h3>
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
                                      </div> 

                                      <div> 
                                        <h2 id={styles._H2} class="text-stone-300 ...  text-xl ... font-avant_garde_bold">
                                          {story.title}
                                        </h2>

                                        <br/>
                                      
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
      
    </>

    

 );
};

export default Bloghomemain;