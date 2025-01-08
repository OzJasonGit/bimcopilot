"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faYoutube, faDribbble, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons'
import styles from './Footer.module.css'
import React, { Component } from 'react';
import Link from 'next/link';
import Image from 'next/image';



import logoMobile from './Bim-copilot-logo_Mobile_3.png';    
import rocketShip from './giphy.gif';


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
                              style={{objectFit: "contain"}}
                      	      quality={100}
                              //object-fit="cover"                      
                              alt=""/>
                            </div>                           
                        </div>

                        <div id={styles.FOOTER_MAIN}>



                            <div id={styles.CONTACT}>
                                <div>                                 
                                    <h4 id={styles._H4}  class="text-4xl ... text-slate-100 ... font-avant_garde_bold">Contact</h4>                                   
                                </div>
                                <div >
                                    <Link href= "/">
                                        <h4 id={styles._H4}  class="text-2xl ... text-slate-100 ... font-avant_garde_medium">
                                            <a class="text-yellow-200 font-avant_garde_bold"><Link href="/">info@bimcopilot.com</Link>
                                            </a>
                                        </h4> 
                                    </Link>
                                </div>
                            </div>



                            <div id={styles.TAGLINE}>
                                <h1 id={styles._H1} class="text-4xl ... text-slate-100 ... font-avant_garde_bold">Exploring new frontiers in <a class="text-stone-400 ...  underline  decoration-4 ... decoration-red-300 ...">architecture </a>, <a class="text-stone-400 ...  underline decoration-4 ... decoration-amber-300 ...">design </a> and <a class="text-stone-400 ... underline decoration-4 ... decoration-sky-300 ... ">technology</a>.</h1>
                            </div>
                            <div id={styles.WEBSITE}>
                                <h4 id={styles._H4}  class=" text-sm ... text-slate-100 ...  font-avant_garde_medium">Website by <a class="text-red-200 font-avant_garde_bold">
                                    <Link  href="/">designlab.pfbd</Link> 
                                    </a>. Made with love, with a gun to our head.</h4>
                            </div>
                            <div id={styles.COMPANY}>
                                <h4 id={styles._H4}  class="text-stone-400 ... font-avant_garde_medium text-sm ..."><a class= "text-amber-200 ... font-avant_garde_bold"><Link href="/">bimcopilot.com</Link></a> _ a subsidiary of Plastic Free By Design Ltd</h4>
                            </div>



                            





                            <div id={styles.ARB_ICONS}>
                                <div class=" rounded-md ... bg-slate-100 ..." id={styles.ARB}>
                                    <Link href= "/">
                                    </Link>
                                </div>
                                <div class=" rounded-md ... bg-slate-100 ..." id={styles.RIBA}>
                                    <Link href= "/">
                                    </Link>
                                </div>                               
                            </div>




                            <div id={styles.TC}>
                                <div id={styles.COMPANY}>
                                    <h4 id={styles._H4}  class="text-stone-400 ... font-avant_garde_medium text-sm ...">
                                        <a class= "font-avant_garde_bold"> 
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
                                    style={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />                        
                        </div>

                        <div id={styles.SOCIAL}>
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
                    </div>
                </footer>
            </div>        
        </section>
      </>       
    )
               
  }
      
}
