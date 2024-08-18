'use client'


import { useRouter } from "next/navigation";
import styles from './other_blogs.module.css';

import Link from "next/link";
import Image from "next/image";


const Other_blogs = ({ stories, firstStory }) => {
  const storiesToMap = stories.filter((story, i) => i != 0);
  const router = useRouter();


   return (

    <>

    {storiesToMap.map((story, index) => {
        return (
        <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_tag}>


            <div class={styles.sub_head}>
              <div id={styles.SUBSCRIBE} class={"border-emerald-200"}>
                <div id={styles.SUB_ICON}>                 
                </div>
         
                <div id={styles.MAIN_TAG}>
                  <h1
                    id={styles._H1}
                    class="text-6xl ... text-stone-700 ... font-avant_garde_bold"
                  >
                  {story.title}
                    Sustainable, Richer Architects through Technology and
                    Automation
                  </h1>
                  <br/>
                  <p class="text-xl ... text-stone-400 ... font-avant_garde_medium">
                  {story.subtitle}
                    This is the paragraph Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor. 
                  </p>
                </div>                
              </div>



              <div class={styles.grid_0_blogimage_foot}>
                      <div id={styles.BLOGIMAGE_HOLDER_FOOT}>
                       
                        <div id={styles.BLOGIMAGE_FOOT}>

                          <div class="rounded-md ..." id={styles.B_IMAGE_FOOT}> 
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

                          <div id={styles.BLOG_TEXT_FOOT}> 
                            <h2 id={styles._H2} class="text-stone-700 ...  text-xl ... font-avant_garde_bold">
                              {story.title}
                            </h2>                                             
                            <h3 id={styles._H3} class="text-stone-400 ... font-avant_garde_bold">
                              {story.subtitle}
                            </h3>
                          </div>
                                    
                    </div>  
                  </div>              
                </div>

            </div>
          </div>
        </section>  
        )})}
   
    </>

    )
}


export default Other_blogs;

