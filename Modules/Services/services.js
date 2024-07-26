'use client'

import styles from './services.module.css';

import { useRouter } from "next/navigation";

import Menu_White from "../../components/Menu_White/menu_white";
import Sides from "../../components/Sides/sides";
import Header_White from "../../components/Header_White/Header_White";
import Footer from "../../components/Footer/Footer_White";
import Collapsed from "../../components/Collapse/collapse";
import Infinite_Scroll_2 from "../../components/Carousel/Infinite_Scroll_Services";

import { Button } from 'antd';


import Link from "next/link";
import Image from "next/image";


import bimcopilot from './Bim-copilot-logo_Horizontal.png';


const Servicesmain = ({ stories, firstStory }) => {
  const storiesToMap = stories.filter((story, i) => i != 0);
  const router = useRouter();

   return (

    <>
      <Menu_White/>
      <Header_White/>
      <Sides/>


      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
        <div class={styles.grid_0_bimcopilot}>
          <div id={styles.BIMCOPILOT_CONTAINER}>
            <div id={styles.BIMCOPILOT}>
              <Image id={styles.CENTER}
                  src={bimcopilot}   
                  style={{objectFit: "contain"}} 
                  quality={100}
              />  
            </div>
            

          </div>
        </div>
      </section>
    

      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_scroll}>
            <div class={styles.sub_head}>
              <div id={styles.SUBSCRIBE} class={"border-emerald-200"}>
                <div id={styles.SUB_ICON}>
                  
                </div>

                <div id={styles.MAIN_TAG}>
                  <h1
                   
                    id={styles.H2_7XL}
                    class="text-left ... text-7xl ... text-neutral-700 ... font-avant_garde_bold"
                    
                    
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
                    class="text-left ... text-2xl ... text-neutral-500 ... font-avant_garde_bold"
                  >
                    {" "}
                
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
                    . <br /> <br />{" "}


                  
                  </h3>
                </div>
              </div>
            </div>
          </div>
      </section>



      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_scroll}>      
            <div id={styles.PORTFOLIO_TITLE}>

              <div id={styles.IMAGE_LAYER_1}>
                <div class="rounded-xl ... drop-shadow-2xl ... shadow-black" id={styles.P_IMAGE_1}>
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
              
              <div id={styles.IMAGE_LAYER_2}>  

                <div class="rounded-xl ... drop-shadow-2xl ... shadow-black" id={styles.P_IMAGE_2}> 
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


                <div class="rounded-xl ... " id={styles.P_IMAGE_3}>  
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
              </div>

            </div>          
          </div>
      </section>



      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_scroll}>   
            <div id={styles.CAROUSEL_HOLDER}>
                <div id={styles.CAROUSEL}>
                  <Infinite_Scroll_2 />
                </div>
              </div>            
          </div>
      </section>



      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
        <div class={styles.grid_0_scroll}>  
          <div id={styles.VIDEO_HOLDER}>

            <div id={styles.COPY_TAG_HOLDER}> 
              <div id={styles.COPY_TAG}>
                <h2                  
                  id={styles._H1}
                  class="text-left ... text-6xl ... text-stone-700 ... font-avant_garde_bold">          
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
                <h3 
                id={styles._H3}
                class="text-left ... text-2xl ... text-stone-500 ... font-avant_garde_bold">
                <br/>  
                See it realized with <a class="text-stone-700 ... font-avant_garde_bold">automation</a>.
                </h3>
              </div>  

              <div id={styles.SECONDCOPY_TAG}>
                <h3
                    id={styles._H3}
                    class="text-left ... text-2xl ... text-stone-500 ... font-avant_garde_bold"
                  >

                    To much <a  class="text-stone-700 ... font-avant_garde_bold">profit</a>  is left on the table through inefficient processes. 
                    Reduce <a  class="text-stone-700 ... font-avant_garde_bold">waste</a>, reduce <a  class="text-stone-700 ... font-avant_garde_bold"> time{" "}</a>  
                     and increase{" "}<a  class="text-stone-600 ... font-avant_garde_bold">revenue</a>  through bettecr,{" "}
                    <a  class="text-stone-700 ... font-avant_garde_bold">automated systems</a>. 
                    <br/> 
                    <a class="text-stone-700 ... font-avant_garde_bold">bimcopilot.com </a>allows you and your business to focus on what you do best. 
                    {" "}
                  
                  </h3>
                
              </div>                  
            </div>


            


          </div>                    
        </div>          
      </section>


      


      


      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_services}>

            <div id={styles.COLLAPSE_TITLE}>
              <h1                 
                    id={styles._H2_7XL}
                    class="text-left ... text-6xl ... text-stone-700 ... font-avant_garde_bold">         
                    Services
              </h1>
            </div>

            <div id={styles.COLLAPSE_MESSAGE}>
              <div id={styles.COLLAPSE_TAG}>
                  <h3
                    id={styles._H3}
                    class="text-left ... text-2xl ... text-stone-500 ... font-avant_garde_bold">
                    {" "}
                      We provide services, including <a class=" text-stone-700 ... font-avant_garde_bold">data-analytics,</a> 
                      <a class=" text-stone-700 ... font-avant_garde_bold"> automation</a> and <a class=" text-stone-700 ... font-avant_garde_bold">technical-drafting</a> for construction projects. see 
                      <a class=" text-stone-700 ... font-avant_garde_bold"><Link href={"./"}> "how we work"</Link></a> to 
                      learn how we define bespoke solutions tailored to your project specific needs.              
                    <br/> 
                    <br/>                
                  </h3>
                </div>                        
              </div>

              <div id={styles.COLLAPSE_HOLDER}>
                <Collapsed />
              </div>
              
            </div>
      </section>



      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_testimonials}> 
             <div class={styles.testimonials}>
              <div id={styles.SUBSCRIBE} class={"border-emerald-200"}>
                <div id={styles.SUB_ICON}>
                  
                </div>

                <div id={styles.MAIN_TAG}>
                  <h1
                   
                    id={styles._H1}
                    class="text-center ... text-6xl ... text-stone-700 ... font-avant_garde_bold" 
                  >
           
                    <a class="text-6xl ...">" </a>Services <a class="text-6xl ..."> " </a>
                  </h1>
                </div>
                <div id={styles.SUB_TAG}>
                  <h3
                    id={styles._H3}
                    class="text-center ... text-2xl ... text-stone-500 ... font-avant_garde_bold"
                  >
                    {" "}
                
                    <a class="text-stone-700 ... font-avant_garde_bold">
                      

                    </a>{" "}
                    The world is changing and so is{" "}
                    <a class="text-stone-700 ... font-avant_garde_bold">
                      architecture
                    </a>
                    . Discover new narratives, build better{" "}
                    <a class="text-stone-700 ... font-avant_garde_bold">
                      systems
                    </a>
                    , make more{" "}
                    <a class="text-stone-700 ... font-avant_garde_bold">money</a>,
                    be more{" "}
                    <a class="text-stone-700 ... font-avant_garde_bold">
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
          <div class={styles.grid_0_how_we_work}>   
           
              <div id={styles.HOW_WE_WORK_TAG}>
                  <h1                
                    id={styles._H2_7XL}
                    class="text-center ... text-6xl ... text-stone-700 ... font-avant_garde_bold"
                  >         
                    How we Work
                  </h1>
              </div>


              <div id={styles.WORKING_IMAGES}>  
                <div class="border-2 border-stone-600 ... rounded-2xl ..." id={styles.HOW_WE_WORK_IMAGE}>
                </div>                 
              </div> 



                    
          </div>
      </section>














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
                 
                </div>                   
              </div> 
     
          </div>
      </section>






























      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_packages}>
             
              <div  id={styles.PACKAGES_TAG}>
                  <h1                 
                    id={styles._H2_7XL}
                    class="text-center ... text-6xl ... text-stone-700 ... font-avant_garde_bold"
                  >         
                    Packages
                  </h1>
                  <br/>
              </div>

              <div id={styles.PACKAGES_IMAGES}> 

                <div class="border-2 border-stone-600 ... bg-white rounded-xl ..." id={styles.PACKAGE_1}>
                  <div id={styles.PACKAGE_GRID}>

                    <div id={styles.PRICE}>
                      <h1
                        id={styles._H2_7XL}
                        class="text-center ... text-6xl ... text-stone-200 ... font-avant_garde_bold">$37.99</h1>
                    </div>


                    <div id={styles.CARD_BULLET} class="">
                      <ul class="list-disc font-avant_garde_bold text-sm ...">
                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>
                      </ul>
                    </div>

                    <div id={styles.BUTTON_CONTAINER}>
                      <Button id={styles.BUTTON}
                          />
                    </div>
                    
                  </div>

                </div> 

                <div class="border-2 border-stone-600 ... bg-white rounded-xl ..." id={styles.PACKAGE_2}>
                  <div id={styles.PACKAGE_GRID}>

                    <div id={styles.PRICE}>
                      <h1
                       id={styles._H2_7XL}
                       class="text-center ... text-6xl ... text-stone-200 ... font-avant_garde_bold">$37.99</h1>
                    </div>


                    <div id={styles.CARD_BULLET} class="">
                      <ul class="list-disc font-avant_garde_bold text-sm ...">
                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>
                      </ul>
                    </div>


                    <div id={styles.BUTTON_CONTAINER}>
                      <Button id={styles.BUTTON}
                          />
                    </div>
                    
                    
                  </div>
                </div> 

                <div class="border-2 border-stone-600 ... bg-white rounded-xl ..." id={styles.PACKAGE_3}>
                  <div id={styles.PACKAGE_GRID}>

                    <div id={styles.PRICE}>
                      <h1
                      id={styles._H2_7XL}
                      class="text-center ... text-6xl ... text-stone-200 ... font-avant_garde_bold">$37.99</h1>
                    </div>



                    <div id={styles.CARD_BULLET} class="">
                      <ul class="list-disc font-avant_garde_bold text-sm ...">
                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>
                      </ul>
                    </div>

                    <div id={styles.BUTTON_CONTAINER}>
                      <Button id={styles.BUTTON}
                          />
                    </div>
                    
                  </div>
                </div>  

              </div> 
     
          </div>
      </section>











      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_who_weve_helped}>
             
              

              <div id={styles.HOW_WE_WORK_BLOCK}>   
                <div  id={styles.WHO_WEVE_HELPED}>
                  <div class="bg-neutral-900 rounded-xl ..."id={styles.WHO_WEVE_HELPED_TEXT}> 

                      <div id={styles.WHO_WEVE_HELPED_HOLDER}>
                        <div id={styles.WE_HELPED_TEXT}>

                          <div id={styles.ABOUT_TITLE_HOLDER}>
                          <h1
                            id={styles._H1}
                            class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold"
                          >
                            <a class="text-left ... text-4xl">My background and who <br/> I've helped.</a>
                          </h1>
                        </div>
                 
                        

                        <div
                          class="content-center ..."
                          id={styles.MY_FACE_HOLDER}
                        >
                        
                        <div>
                          <h3
                              id={styles._H3}
                              class="text-xl ... text-stone-200 ... drop-shadow-xl font-avant_garde_bold"
                            >
                              Hi, I'm Oz Jason. I'm a registered architect, BIM
                              manager and the founder of{" "}
                              <a class="text-yellow-200 ...">bimcopilot.com</a>.
                              <br/> However, I'm a firm believer that titles are
                              becoming less important. What matters is how I can
                              help you and your business. And I think <br /> I could
                              help you a lot.
                            </h3>
                        </div>
                            

                        <br/>
                        <br/>

                        <div id={styles.MY_FACE} class=" border-8 border-stone-200 ... rounded-full ...">
                            <Image></Image>
                          </div>
                        </div>
                        
                    
                   

                        </div>                       
                      </div>
                                                                                    
                  </div>
                </div>                  
              </div> 
     
          </div>
      </section>


      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_is_this_for_me}>
             
              

              <div id={styles.FAQ_BLOCK}>   

                <div  id={styles.FAQ}>
                  <div id={styles.FAQ_TITLE}>  
                      <div id={styles.CLIENT_TAG}>
                          <h1                 
                            id={styles._H2_7XL}
                            class="border-2 text-left ... text-4xl ... text-stone-200 ... font-avant_garde_bold"
                          > Frequently Asked Questions 
                          </h1>
                          <br/>
                      </div>                  
                  </div>
                  <div class="border-2 border-stone-600 ... rounded-xl ..."id={styles.FAQ_TEXT}>                                        
                  </div>
                </div>  

              </div> 
     
          </div>
      </section>






      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_is_this_for_me}>
             
              <div id={styles.CLIENT_TAG}>
                  <h1                 
                    id={styles._H2_7XL}
                    class="text-left ... text-4xl ... text-stone-200 ... font-avant_garde_bold"
                  >         
                    Is This for me?
                  </h1>
                  <br/>
              </div>

              <div id={styles.IS_THIS_FOR_ME_BLOCK}>   
                <div  id={styles.IS_THIS_FOR_ME}>
                  <div class="border-2 border-stone-600 ... rounded-xl ..."id={styles.IS_THIS_FOR_ME_TEXT}>   
                    <div class="bg-white rounded-xl ..."id={styles.IS_THIS_FOR_ME_HOLDER}>
                    </div>                
                  </div>
                </div>                  
              </div> 
     
          </div>
      </section>


      <Footer/>


    </>

 );
};

export default Servicesmain;



                    

                    













