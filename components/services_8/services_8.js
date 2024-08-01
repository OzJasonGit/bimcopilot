'use client'

import styles from './services_8.module.css';

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Services_8 = ({ stories, firstStory }) => {
const storiesToMap = stories.filter((story, i) => i != 0);
const router = useRouter();

return (

    <>

         <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_client_showcase}>
             
              

              <div id={styles.PORTFOLIO_IMAGES}>  
                <div class="" id={styles.PORTFOLIO_CLIENT}>



                  <div class="border-2 border-stone-600 ... rounded-xl ..." id={styles.P1}>
                 
                  </div>


                  <div class="rounded-xl ... " id={styles.P2}> 
                    <div id={styles.IMAGE_POST}>
                      <Image
                        src={stories[1].image}
                        alt="Picture of the author"
                        width={500}
                        height={500}
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                  </div>

                  <div class="" id={styles.P3}>   
                    <div id={styles.CLIENT_TAG_1}>
                        <h2                 
                          id={styles._H2_7XL}
                          class="text-left ... text-4xl ... text-stone-700 ... font-avant_garde_bold"
                        >         
                          Client <br/>
                          Showcase
                        </h2>
                        <br/>
                    </div>                 
                  </div>

                  <div class="border-2 border-stone-600 ... rounded-xl ..." id={styles.P4}>
                    
                  </div>

                  <div class="rounded-xl ..." id={styles.P5}>
                    <div id={styles.IMAGE_POST}>
                      <Image
                        src={stories[3].image}
                        alt="Picture of the author"
                        width={500}
                        height={500}
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>

                  <div class="rounded-xl ..." id={styles.P6}>
                    <div id={styles.IMAGE_POST}>
                      <Image
                        src={stories[2].image}
                        alt="Picture of the author"
                        width={500}
                        height={500}
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>

                  <div class="rounded-xl ..." id={styles.P7}>
                    <div id={styles.IMAGE_POST}>
                      <Image
                        src={stories[0].image}
                        alt="Picture of the author"
                        width={500}
                        height={500}
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                 
                </div>                   
              </div> 
     
          </div>
      </section>

    </>

);
};


export default Services_8;