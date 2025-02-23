'use client'

import styles from './services.module.css';
import Menu_White from "../../components/Menu_White/menu_white";
import Sides from "../../components/Sides/sides_white";
import Header_White from "../../components/Header_White/Header_White";
import Footer from "../../components/Footer/Footer_White";
import Subfooter from "../../components/Subfooter_White/subfooter_white";

import Services_1 from "../../components/services_1/services_1";
import Services_2 from "../../components/services_2/services_2";
import Services_3 from "../../components/services_3/services_3";
import Services_5 from "../../components/services_5/services_5";
import Services_6 from "../../components/services_6/services_6";
import Services_7 from "../../components/services_7/services_7";
import Services_10 from "../../components/services_10/services_10";
import Image from "next/image";

const Servicesmain = ({ stories}) => {


   return (

    <>
      <Menu_White/>
      <Header_White/>
      <Sides/>

      <Services_1/>
      
      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_scroll}>
            <div class={styles.sub_head}>
              <div id={styles.SUBSCRIBE} class={"border-emerald-200"}>
                <div id={styles.SUB_ICON}>
                  
                </div>

                <div id={styles.MAIN_TAG}>
                  <h1
                   
                    id={styles._H1_2}
                    class="text-left ...  text-neutral-700 ... font-avant_garde_bold"
                                       
                  >        
                    A <a  class=" text-stone-50 ..." 
                    id={styles.TEXT_OUTLINE}>BIM,</a> <a class=" text-stone-50 ..." id={styles.TEXT_OUTLINE}>AI,</a> <a class=" text-stone-50 ..."
                    id={styles.TEXT_OUTLINE}>
                    Automation</a> and <a class="text-stone-50 ..." 
                    id={styles.TEXT_OUTLINE}>Analytics</a> Consultancy
                  </h1>
                </div>
                <div id={styles.SUB_TAG}>
                  <h3
                    id={styles._H3}
                    class="text-left ... text-neutral-500 ... font-avant_garde_bold"
                  >
                    {" "}
                
                    <a class="text-stone-700 ... font-avant_garde_bold"
                      >
                    We develop automated systems for Architects, Designers and Manufacturers.
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
                    . <br /> <br />{" "}


                  
                  </h3>
                </div>
              </div>
            </div>
          </div>
      </section>

      <Services_2/>

      <Services_3/>

      {/*<Services_4/>*/}



      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
        <div class={styles.grid_0_scroll}>  
          <div id={styles.VIDEO_HOLDER}>

            <div id={styles.COPY_TAG_HOLDER}> 
              <div id={styles.COPY_TAG}>
                <h2                  
                  id={styles._H2}
                  class="text-right ... text-4xl ... text-stone-700 ... font-avant_garde_bold">          
                  We understand the value and potential of your projects.                                  
                </h2> 
              </div>                     
            </div>
            
            <div id={styles.BG_VIDEO}  class="rounded-xl ...">  
            <video autoPlay controls playsInline muted loop src="https://res.cloudinary.com/dytsuek4h/video/upload/v1718789410/2836031_jb9p48.mp4" style={{width:"100%",
          height:"100%", objectFit:"cover", borderRadius:"0.75rem"}}></video>
  
            </div>

            <div id={styles.SUBCOPY_TAG_HOLDER}> 
              <div id={styles.SUBCOPY_TAG}>
                <h2 
                id={styles._H2_RIGHT}
                
                class="text-lg ... text-stone-500 ... font-avant_garde_bold ...">
                <br/>  
                See them realized with <a class="text-stone-700 ... font-avant_garde_bold">Automation, </a> 
                <a class="text-stone-700 ... font-avant_garde_bold">AI, </a> 
                <a class="text-stone-700 ... font-avant_garde_bold">Digital Assets </a> <br/> and bespoke
                <a class="text-stone-700 ... font-avant_garde_bold"> Systems.</a>
                </h2>
              </div>  

              <div id={styles.SECONDCOPY_TAG}>
                <h3
                    id={styles._H3_RIGHT}
                    
                    class="text-lg ... text-stone-500 ... font-avant_garde_bold"
                  >


                  Don't leave your profits on the table. Streamline your<a  class="text-stone-700 ... font-avant_garde_bold"> processes</a>, save time, and boost 
                  revenue with <a  class="text-stone-700 ... font-avant_garde_bold">efficient,</a> <a class="text-stone-700 ... font-avant_garde_bold"> automated, </a> 
                  <a class="text-stone-700 ... font-avant_garde_bold">repeatable systems</a>. 
                  <a  class="text-stone-700 ... font-avant_garde_bold">bimcopilot.com </a> lets you focus on what makes profit, what you enjoy, and what you do best.

                  {" "}
                  
                </h3>
                
              </div>                  
            </div>

          </div>                    
        </div>          
      </section>

      <Services_5/>
      <Services_6/>
      <Services_7/>
     

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
                        <h1                 
                          id={styles._H2_7XL}
                          class="text-left ... text-4xl ... text-stone-700 ... font-avant_garde_bold"
                        >         
                          Client <br/>
                          Showcase
                        </h1>
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

                  <div class="rounded-xl ..." id={styles.P8}>
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

                  <div class="rounded-xl ..." id={styles.P9}>
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




    <Services_10/>
    <Subfooter/>
    <Footer/>


    </>

 );
};

export default Servicesmain;



                    

                    













