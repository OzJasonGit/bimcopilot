

import Video from "./client/Video/video";



import styles from './mainvideo.module.css'
import React, { Component } from 'react';


import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";



const Mainvideopage = ({ stories, firstStory }) => {
  const storiesToMap = stories.filter((story, i) => i != 0);
  const router = useRouter();

    return (

      

        <section id={styles.SHADOW_SECTION} class={styles.center_holder}>
        <div class={styles.grid_0_main}>
          <div class={styles.video_section}>
            <div id={styles.VIDEO_LATEST_HOLDER}>


              <div id={styles.VIDEO_LATEST} class="rounded ...">
                 <Video />
              </div>

             

              <div id={styles.VIDEO_TEXT_HOLDER} class="rounded ...">
                <div id={styles.V_TITLE_HOLDER}>






                  <h2
                    id={styles._H2}
                    class="text-4xl ... text-slate-100 ... drop-shadow-xl font-avant_garde_bold">
                    {stories[0].title}
                  </h2>
                  
                  <h3
                    id={styles._H3}
                    class="text-xl ... text-stone-400 ... drop-shadow-xl font-avant_garde_medium">
                    {stories[0].subtitle}
                  </h3>
                

           
                  
                </div>
                <div class="rounded ..." id={styles.SHARE}></div>
              </div>
            </div>

            <div class="rounded-xl ... " id={styles.GRAPHIC}></div>

            <div id={styles.SERVICES_HOLDER}>
              <div id={styles.SERVICES}>
                <div id={styles.SERVICES_TITLE}>
                  <h2
                    id={styles._H2}
                    class="text-4xl ... text-stone-400 ... drop-shadow-xl font-avant_garde_bold">
                    Services
                  </h2>
                  <br/>
                  <h4 class="text-xl ... text-stone-400 ... drop-shadow-xl font-avant_garde_bold">
                    A limited liability company registered in England and Wales
                    A limited liability company registered in England and Wales
                    A limited liability company 
                   
                  </h4>
                </div>
              </div>
            </div>


            <div id={styles.TAG}>
                <h1
                    id={styles._H1}
                    class="text-7xl ... text-stone-400 ... font-avant_garde_bold">
                    {" "}
                    You're the <a class="text-stone-100 ...">pilot</a>... We are your{" "}
                    <a class="text-emerald-200 ...">copilot</a>.
                </h1>
                </div>
          </div>
        </div>
      </section>

     

        

    )
  }

export default Mainvideopage;
