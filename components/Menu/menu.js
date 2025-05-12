"use client";

const Drawer = dynamic(() => import("antd/lib/drawer"), { ssr: false });
import React, { useState } from "react";
import styles from './Menu.module.css'


import bimcopilot_icon from "./Tesseract_Logo_2.png";
import dynamic from "next/dynamic";

const Hamburger = dynamic(() => import("./Burger/burger"), { ssr: false });


import Image from "next/image";
import Link from 'next/link';
import pfbdImage from './_pfbd_.svg';
import dlpfbdImage from './_dlpfbd_.svg';
import logoARB from './logoARB_DARK.png';
import logoRIBA from './logoRIBA_Dark.png';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faYoutube, faDribbble, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons'


const Menu = () => {


  const [open, setOpen] = useState(false);

    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };

    return (  
    <> 

      <section id={styles.SHADOW_SECTION_DRAWER} class={styles.center_holder}>  

          <Drawer
              class="bg-indigo-600 bg-opacity-50 ..."
              id={styles.DRAWER_LEFT  }


                title= {<h1  id={styles.H_3} class="text-right ...  text-stone-700 font-avant_garde_bold">
                        <Link class="text-4xl" href="/services">
                           <div>
                            <Image 
                              id={styles.CENTER}
                              src={pfbdImage}   
                              loading="lazy"
                              style={{objectFit: "contain"}} 
                              quality={100}
                            />  
                           </div>
                        </Link>                        
                      </h1>
                     }

              placement="left"
              onClose={onClose}
              open={open}>  

              <div id={styles.DRAWER_MENU}>

                <Link class="content-center ..." id={styles.SERVICES} href="/services"> 
                    <h3 id={styles._H2} class="text-right ...  text-stone-700 font-avant_garde_bold"><a class="">Services</a></h3>
                </Link>  

                <Link id={styles.COPILOT_DASHBOARD} href="/copilot_dashboard"> 
                  <h3 id={styles._H2} class="text-right ...  text-stone-700  font-avant_garde_bold"><a class="">Copilot_Dashboard</a></h3>
                </Link>  

                <Link id={styles.STORIES} href="/bloghome"> 
                  <h3 id={styles._H2} class="text-right ...  text-stone-700 font-avant_garde_bold"><a class="">Stories</a></h3>
                </Link>  

                <Link id={styles.SHOP} href="/products"> 
                  <h3 id={styles._H2} class="text-right ...  text-stone-700  font-avant_garde_bold"><a class="">Shop</a></h3>
                </Link>  



                <div id={styles.DRAWER_ICONS}>
                  <div id={styles.PFBD_ICON} class={styles.icon}>
                      <Link id={styles.PFBD_LINK} href= "/" target="_blank">
                          <div id={styles._PFBD_}>
                              <Image id={styles.CENTER}
                                      src={pfbdImage}   
                                      loading="lazy"
                                      style={{objectFit: "contain"}} 
                                      quality={100}
                                />                     
                          </div> 
                      </Link>
                  </div>


                  <div id={styles.DESIGN_LAB_ICON} class={styles.icon}>
                      <Link id={styles.PFBD_LINK} href= "/" target="_blank">
                          <div id={styles._PFBD_}>
                              <Image id={styles.CENTER}
                                      src={dlpfbdImage} 
                                      loading="lazy"  
                                      style={{objectFit: "contain"}} 
                                      quality={100}
                                />                     
                          </div> 
                      </Link>
                  </div>


                  <div id={styles.PFBD_ICON_2} class={styles.icon}>
                      <Link id={styles.PFBD_LINK} href= "/" target="_blank">
                          <div id={styles._PFBD_}>
                              <Image id={styles.CENTER}
                                      src={pfbdImage}   
                                      loading="lazy"  
                                      style={{objectFit: "contain"}} 
                                      quality={100}
                                />                     
                          </div> 
                      </Link>
                  </div>
                </div>





             

                 <div id={styles.SOCIAL}>

                  <div id={styles.ARB_ICONS}>

                      <div class=" rounded-md ..." id={styles.ARB}>
                          <Link href= "/">
                              <Image
                                  src={logoARB}
                                  alt="Picture of the author"
                                  width={500}
                                  height={500}
                                  loading="lazy"  
                                  style={{
                                      position: "relative",
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                  }}
                              /> 
                          </Link>
                      </div>


                      <div class=" rounded-md ..." id={styles.RIBA}>
                          <Link href= "/">
                              <Image
                                  src={logoRIBA}
                                  alt="Picture of the author"
                                  width={500}
                                  height={500}
                                  loading="lazy"  
                                  style={{
                                      position: "relative",
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                  }}
                              /> 
                          </Link>
                      </div>  

                  </div>

                  <div id={styles.MEDIUM_ICON} class={styles.icon}>
                      <a id={styles.PFBD_LINK} href="https://github.com/OzJasonGit" target="_blank">
                                <FontAwesomeIcon class={styles.medium} id={styles.CENTER} icon={faMedium} size="2xs" />
                      </a>
                  </div>  
                  <div id={styles.LINKEDIN_ICON} class={styles.icon}>
                      <a id={styles.PFBD_LINK} href="https://github.com/OzJasonGit" target="_blank">
                                <FontAwesomeIcon class={styles.linkedin} id={styles.CENTER} icon={faLinkedin} size="2xs" />
                      </a>
                  </div>   
                  <div id={styles.YOUTUBE_ICON} class={styles.icon}>
                      <a id={styles.PFBD_LINK} href="https://github.com/OzJasonGit" target="_blank">
                                <FontAwesomeIcon class={styles.youtube} id={styles.CENTER} icon={faYoutube} size="2xs" />
                      </a>
                  </div>   
                  <div id={styles.DRIBBLE_ICON} class={styles.icon}>
                      <a id={styles.PFBD_LINK} href="https://github.com/OzJasonGit" target="_blank">
                                <FontAwesomeIcon class={styles.dribbble} id={styles.CENTER} icon={faDribbble} size="2xs" />
                      </a>
                  </div>   
                  <div id={styles.GITHUB_ICON} class={styles.icon}>
                      <a id={styles.PFBD_LINK} href="https://github.com/OzJasonGit" target="_blank">
                                <FontAwesomeIcon class={styles.github} id={styles.CENTER} icon={faGithub} size="2xs" />
                      </a>
                  </div>                     
              </div>

                <div id={styles.TEXT}>
                  <div id={styles.COMPANY}>
                      <h4 id={styles._H4}  class=" text-xs ... text-stone-700 ... font-avant_garde_bold text-left">Website by <a class="text-stone-400 font-avant_garde_bold">
                      <Link  href="/">designlab.pfbd</Link> 
                      </a>. Made with love, with a gun to our head.
                      </h4>
                      <br/>
                      <h4 id={styles._H4}  class="text-stone-700 ... font-avant_garde_bold text-xs ... text-left"><a class= "text-emerald-400 ... font-avant_garde_bold"><Link href="/">bimcopilot.com</Link></a> 
                          _ a subsidiary of <a class= "font-avant_garde_bold  text-stone-400 ...">Plastic Free By Design Ltd</a>
                      </h4>
                      <br/>
                      <h4 id={styles._H4}  class="text-stone-700 ... font-avant_garde_bold text-xs ... text-  left">
                          <a class= "font-avant_garde_bold  text-stone-400 ..."> 
                              Plastic Free By Design Ltd          
                          </a>  A limited liability company registered in England and Wales
                          <br></br>
                          Company No. 15015616 
                      </h4>
                  </div>
                </div>
                
              </div>
           
                        
          </Drawer> 


        


          <div class={styles.HEADER_HOLDER}>


             <div id={styles.header}>   
                
                <header id={styles.FIXED_HEADER}> 


                    <div id={styles.BUTTON_HOLDER_RIGHT} class={styles.container}>
                        <div id={styles.HEADER_MENU_2}>   
                            <div id={styles.BURGER_HOLDER} class={styles.container_right}>

                            <div id={styles.BUTTON_HOLDER_RIGHT} class={styles.container}>
                              <div id={styles.HEADER_MENU_2}>   
                                <div id={styles.BURGER_HOLDER} class={styles.container_right}>
                                  <a id={styles.BURGER} onClick={showDrawer}>
                                    <Hamburger/> 
                                  </a>
                                </div>   
                              </div>
                            </div> 

                          </div>   
                        </div>
                    </div> 


                    <div id={styles.LOGO_MOB} class={styles.container}>
                      <Image
                          src={bimcopilot_icon}   
                          alt="Picture of the author"
                          loading="lazy"
                          width={500}
                          height={500}
                          style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                    </div>
                </header>
              
              </div>           
            </div>        
      </section> 
      
    </>
        )
    };



export default Menu;









