"use client";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faYoutube, faDribbble, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons'
import styles from './Footer.module.css'
import React, { Component } from 'react';
// import 'antd/dist/reset.css';
import Link from 'next/link';
import Image from 'next/image';

import Subform from "../Subscribetop/Client/subform";

import logoMobile from './bimcopilot_logo_text_horizontal_white.svg';    
// import rocketShip from './giphy.gif';

import logoARB from './logo_ARB.png';
import logoRIBA from './logo_RIBA.png';

const rocketShip = "https://res.cloudinary.com/dbj8h56jj/image/upload/v1753899871/Portfolio/giphy_p528dq.gif";


export default class Footer extends Component {

  render() {
    return (
      <> 

        <section id={styles.FOOTER_SECTION} class={styles.center_holder}>     
            <div class={styles.footer_holder}>
                <footer id={styles.FOOTER}>
                    <div id={styles.IPHONE} class={styles.container}> 

                        <div id={styles.BIM_TITLE}>
                            <div id={styles.IMAGE_HOLDER}>
                              <Image
                                id={styles.IMAGE_1}
                                src={logoMobile}                    
                                style={{objectFit: "cover", objectPosition:"right"}}
                                quality={100}
                                //object-fit="cover"                      
                                alt=""/>
                            </div>                           
                        </div>

                        <div id={styles.FOOTER_MAIN}>



                            <div id={styles.CONTACT}>
                                <div>                                 
                                    <h4 id={styles._H4}  class="text-2xl ... text-slate-100 ... font-avant_garde_bold text-right">Contact
                                    </h4>                                    
                                    <Link href= "/">
                                        <h4 id={styles._H4}  class="text-sm ... text-slate-100 ... font-avant_garde_medium text-right">
                                            <a class="text-emerald-200 font-avant_garde_bold"><Link href="/">info@bimcopilot.com</Link>
                                            </a>
                                        </h4> 
                                    </Link>                             
                                </div>                         
                            </div>
                
                
                            <div id={styles.WAITING} >
                                <h3>
                                    <a 
                                        id={styles._H1_2} 
                                        class="text-stone-200 ... font-avant_garde_bold text-3xl">
                                        Join the Waiting List!
                                    </a>
                                </h3>
                                
                            </div>
                            


                            <Subform/>


                            <div id={styles.TC}>
                                <div id={styles.COMPANY}>
                                    <h4 id={styles._H4}  class=" text-xs ... text-stone-400 ...  font-avant_garde_medium text-right">Website by <a class="text-stone-100 font-avant_garde_bold">
                                    <Link  href="/">designlab.pfbd</Link> 
                                    </a>. Made with love, with a gun to our head.
                                    </h4>
                                    <br/>
                                    <h4 id={styles._H4}  class="text-stone-400 ... font-avant_garde_medium text-xs ... text-right"><a class= "text-emerald-200 ... font-avant_garde_bold"><Link href="/">bimcopilot.com</Link></a> 
                                        _ a subsidiary of <a class= "font-avant_garde_bold  text-stone-200 ...">Plastic Free By Design Ltd</a>
                                    </h4>
                                    <br/>
                                    <h4 id={styles._H4}  class="text-stone-400 ... font-avant_garde_bold text-xs ... text-right">
                                        <a class= "font-avant_garde_bold  text-stone-200 ..."> 
                                            Plastic Free By Design Ltd          
                                        </a>  A limited liability company registered in England and Wales
                                        <br></br>
                                        Company No. 15015616 
                                    </h4>
                                </div>
                                
                            </div>  
                        </div> 

                    </div>
                    <div id={styles.OTHER} class={styles.container}>
                        <div class=" rounded-md ..."  id={styles.ROCKETSHIP_HOLDER}>   
                            <Image
                                    src={rocketShip}
                                    alt="Picture of the author"
                                    width={500}
                                    height={500}
                                    loading="lazy"
                                    unoptimized
                                    style={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />                        
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









                         <div id={styles.COMPANY_TEXT}>
                            <h4 id={styles._H4}  class=" text-xs ... text-stone-400 ...  font-avant_garde_medium text-right">Website by <a class="text-stone-100 font-avant_garde_bold">
                            <Link  href="/">designlab.pfbd</Link> 
                            </a>. Made with love, with a gun to our head.
                            </h4>
                            <br/>
                            <h4 id={styles._H4}  class="text-stone-400 ... font-avant_garde_medium text-xs ... text-right"><a class= "text-emerald-200 ... font-avant_garde_bold"><Link href="/">bimcopilot.com</Link></a> 
                                _ a subsidiary of <a class= "font-avant_garde_bold  text-stone-200 ...">Plastic Free By Design Ltd</a>
                            </h4>
                            <br/>
                            <h4 id={styles._H4}  class="text-stone-400 ... font-avant_garde_bold text-xs ... text-right">
                                <a class= "font-avant_garde_bold  text-stone-200 ..."> 
                                    Plastic Free By Design Ltd          
                                </a>  A limited liability company registered in England and Wales
                                <br></br>
                                Company No. 15015616 
                            </h4>
                         </div> 
                    </div>
                </footer>
            </div>        
        </section>
      
      </>       
    )
               
  }
      
}
