

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

            <div class="rounded-xl ...  border-4 ... border-stone-200" id={styles.GRAPHIC}></div>

            <div id={styles.SERVICES_HOLDER}>
              <div id={styles.SERVICES}>
                <div id={styles.SERVICES_TITLE}>
                  <h2
                    id={styles._H2}
                    class="text-4xl ... text-stone-400 ... drop-shadow-xl font-avant_garde_bold">
                    Services
                  </h2>
                  <br/>
                  

                  <h3 class="text-xl ... text-stone-400 ... drop-shadow-xl font-avant_garde_bold">       
                    We identify <a  class="text-stone-200">problems and systems</a> that can be <a class="text-stone-200">improved or eliminated</a> with <a  class="text-emerald-200">Automation</a>, <a class="text-emerald-200">AI</a> and <a class="text-emerald-200">Building Information Modelling</a>. 
                    <br/> <br/>
                    <p  
                      id={styles._H3}
                      class="text-base ...">
                      This involves first learning and assessing you business processes and then developing a unique solution.
                    <br/><br/>
                    Although our focus and background are aimed towards the <a class="text-stone-200">built environment</a>, our services can also be applied effectively within
                    <a  class="text-stone-200"> gitother industries</a>. See our <a class="text-emerald-200"><Link href="/">case studies</Link></a> to see how we've helped businesses <a class="text-stone-200">50X</a> their <a class="text-stone-200">productivity</a>.  
                    <br/><br/>
                    <a  class="text-stone-200">Artificial Intelligence</a> is a new technology that's rapidly evolving. We keep our <a  class="text-stone-200">finger on the pulse</a> and explore <a  class="text-stone-200">solutions that can help you</a>. 
                    <br/><br/>
                    Click below to learn more about how <br/> <a class="text-stone-200">we can help you</a>.  
                    </p>                        
                  </h3>

                </div>
              </div>
            </div>
           
          </div>
        </div>
      </section>
     

    )
  }

export default Mainvideopage;
