import styles from './products.module.css'
import React, { Component } from 'react';
import Image from "next/image";
import Link from "next/link";
import revitBlinds from './revit_blinds.webp';
import drawingSheets from './drawing_sheets.webp';
import volumesByRoom from './volumes_by_room.webp';
import logo from './bimcopilot_logo_black.svg';
import text_logo from './bimcopilot_logo_text_horizontal_black.svg';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSignOutAlt, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/ui/button"
import { fontSize, fontStyle } from '@mui/system';


export default class Products extends Component {

  render() {
    return (

 

<section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder}>

{/* Mobile /////////////////////////////////////////////////////////////////////////// */}   
        <div class={styles.grid_0_main}>           
          <div
              id={styles.PRODUCTS_HOLDER_MOBILE}
              styles={{ position: "absolute" }}>
              <div id={styles.PRODUCTS_HORIZONTAL_MOBILE}>


              <div
                class="rounded-xl ..."
                id={styles.PRODUCT_CARD}
                styles={{ gridArea: "1" }}>
                  <Link
                    href="/sales"
                    id={styles.IMAGE_1}> 
                                            
                      <Image
                        class=" rounded-2xl ... "
                        id={styles.PRODUCT_IMAGE}
                        src={drawingSheets}                     
                        style={{objectFit: "cover"}}
                        quality={100}
                        //object-fit="cover"                      
                        alt=""/>                                                                            
                      <Image/>
                  </Link>
                  
                  <div>
                    <Link href="/sales">
                      <h3
                        id={styles._H3}
                        class=" text-neutral-700 ... font-geist_regular ...">
                        Parametric Title Block Catalogue  Colored Title Blocks (Metric + Imperial)
                      </h3>
                      
                      <h3 id={styles._H3} class=" text-neutral-700 ... font-avant_garde_bold ...">
                        {" "}
                        From $53.90
                      </h3>
                    </Link>
                  </div>
              </div>


              <div
                class="rounded-xl ..."
                id={styles.PRODUCT_CARD}
                styles={{ gridArea: "2" }}>

                  <Link 
                    href="/sales"
                    id={styles.IMAGE_1}>                   
                      <Image
                        class=" rounded-2xl ... "
                        id={styles.PRODUCT_IMAGE}
                        src={revitBlinds}                    
                        style={{objectFit: "cover"}}
                        quality={100}
                        //object-fit="cover"                      
                        alt=""/>                                                                            
                      <Image/>
                  </Link>
                  
                  <div>
                    <Link href="/sales">
                      <h3
                        id={styles._H3}
                        class=" text-neutral-700 ... font-geist_regular ...">
                        Parametric Title Block Catalogue Colored Title Blocks (Metric + Imperial)
                      </h3>
                      
                      <h3 id={styles._H3} class=" text-neutral-700 ... font-avant_garde_bold ... ">
                        {" "}
                        From $53.90
                      </h3>
                    </Link>
                  </div>
              </div>


              <div
                class="rounded-xl ..."
                id={styles.PRODUCT_CARD}
                styles={{ gridArea: "3" }}>

                  <Link 
                    href="/sales"
                    id={styles.IMAGE_1}>                 
                        <Image
                          class=" rounded-xl ... "
                          id={styles.PRODUCT_IMAGE}
                          src={volumesByRoom}                     
                          style={{objectFit: "cover"}}
                          quality={100}
                          //object-fit="cover"                      
                          alt=""/>                                                                            
                        <Image/>                
                  </Link>                    

                  <div>
                    <Link href="/sales">
                      <h3
                        id={styles._H3}
                        class=" text-neutral-700 ... font-geist_regular ..."
                        style={{
                              marginBottom: "7.5px"}}>
                        Parametric Title Block Catalogue  Colored Title Blocks (Metric + Imperial)
                        
                      </h3>
                      
                      <h3 id={styles._H3} class=" text-neutral-700 ... font-avant_garde_bold ...">
                        {" "}
                        From $53.90
                      </h3>
                    </Link>
                  </div>
              </div>
              
                          
          </div>
        </div>
{/* Mobile /////////////////////////////////////////////////////////////////////////// */}   





































{/* Desktop /////////////////////////////////////////////////////////////////////////// */}   
          <div id={styles.PRODUCTS_HOLDER}>


              <div id={styles.PRODUCT} style={{ gridArea: "AREA_1" }}>
                <Link href="/sales"
                      class=" rounded-xl ... "
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}>
                      <div                  
                        id={styles.PRODUCT_OVERLAY_GRID}
                        style={{
                          position: "absolute",
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                          zIndex: "100",}}> 
                          <div                 
                            style={{
                              gridArea:"LOGO",
                              position: "relative",
                            }}>   
                              <Image                                   
                                    src={logo}                    
                                    style={{
                                      objectFit: "cover",
                                      position: "absolute",
                                      width: "100%",
                                      height: "100%",}}
                                      quality={100}                                             
                                    alt=""/>                                                                            
                              <Image/>                       
                          </div> 
                          <div                 
                            style={{
                              gridArea:"TEXT",
                              position: "relative",
                            }}>   
                              <Image                                   
                                    src={text_logo}                    
                                    style={{
                                      objectFit: "cover",
                                      position: "absolute",
                                      width: "100%",
                                      height: "100%",}}
                                      quality={100}                                             
                                    alt=""/>                                                                            
                              <Image/>                       
                          </div>                           
                      </div>   
                      <Image
                            id={styles.PRODUCT_IMAGE}
                            src={revitBlinds}                    
                            style={{
                              objectFit: "cover",
                              position: "absolute",
                              width: "100%",
                              height: "100%",}}
                              quality={100}                                             
                            alt=""/>                                                                            
                      <Image/>               
                </Link>
                                              
                <div>
                  <Link href="/sales">
                    <h3
                      id={styles._H3}
                      class=" text-neutral-700 ... font-geist_regular ..."
                      style={{
                              marginBottom: "7.5px"
                            }}>
                      Parametric Title Block Catalogue  Colored Title Blocks (Metric + Imperial)               
                    </h3>
                    
                    <h3 id={styles._H3} class=" text-neutral-700 ... font-avant_garde_bold ...">
                      {" "}
                      From $33.00
                    </h3>
                  </Link>
                </div>

              </div>



              <div id={styles.PRODUCT} style={{ gridArea: "AREA_2" }}>               
                <Link href="/sales"
                      class=" rounded-xl ... "
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}>
                  <div                  
                    id={styles.PRODUCT_OVERLAY_GRID}
                    style={{
                      position: "absolute",
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      zIndex: "100",}}> 
                        <div                 
                          style={{
                            gridArea:"LOGO",
                            position: "relative",
                          }}>   
                            <Image                                   
                                  src={logo}                    
                                  style={{
                                    objectFit: "cover",
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",}}
                                    quality={100}                                             
                                  alt=""/>                                                                            
                            <Image/>                       
                        </div>  

                        <div                 
                            style={{
                              gridArea:"TEXT",
                              position: "relative",
                            }}>   
                              <Image                                   
                                    src={text_logo}                    
                                    style={{
                                      objectFit: "cover",
                                      position: "absolute",
                                      width: "100%",
                                      height: "100%",}}
                                      quality={100}                                             
                                    alt=""/>                                                                            
                              <Image/>                       
                        </div>                                               
                  </div> 
                  <Image
                      class=" rounded-xl ... drop-shadow-xl ... "
                      id={styles.PRODUCT_IMAGE}
                      src={drawingSheets}                    
                      style={{
                        objectFit: "cover",
                        position: "absolute",
                        width: "100%",
                        height: "100%",}}
                      quality={100}                    
                      alt=""/>                                                                            
                  <Image/>
                </Link>
                
                <div>
                  <Link href="/sales">
                    <h3
                      id={styles._H3}
                      class=" text-neutral-700 ... font-geist_regular ..."
                      style={{
                              marginBottom: "7.5px"
                            }}>
                      Parametric Colored Title Blocks Colored Title Blocks (Metric + Imperial)
                    </h3>
                    
                    <h3 id={styles._H3} class=" text-neutral-700 ... font-avant_garde_bold ...">
                      {" "}
                      From $31.90
                    </h3>
                  </Link>
                </div>
              </div>



              <div id={styles.PRODUCT} style={{ gridArea: "AREA_3" }}>
                <Link href="/sales"
                      class=" rounded-xl ... "
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}>
                  <div                  
                    id={styles.PRODUCT_OVERLAY_GRID}
                    style={{
                      position: "absolute",
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      zIndex: "100",}}>   
                      <div                 
                        style={{
                          gridArea:"LOGO",
                          position: "relative",
                        }}>   
                          <Image                                   
                                src={logo}                    
                                style={{
                                  objectFit: "cover",
                                  position: "absolute",
                                  width: "100%",
                                  height: "100%",}}
                                  quality={100}                                             
                                alt=""/>                                                                            
                          <Image/>                       
                      </div> 

                      <div                 
                        style={{
                          gridArea:"TEXT",
                          position: "relative",
                        }}>   
                          <Image                                   
                                src={text_logo}                    
                                style={{
                                  objectFit: "cover",
                                  position: "absolute",
                                  width: "100%",
                                  height: "100%",}}
                                  quality={100}                                             
                                alt=""/>                                                                            
                          <Image/>                       
                      </div>                         
                  </div> 
                  <Image
                      class="rounded-2xl ..."
                      id={styles.PRODUCT_IMAGE}
                      src={volumesByRoom}                    
                      style={{
                        objectFit: "cover",
                        position: "absolute",
                        width: "100%",
                        height: "100%",}}
                      quality={100}                  
                      alt=""/>                                                                            
                  <Image/>
                </Link>
                
                <div>
                  <Link href="/sales">
                    <h3
                      id={styles._H3}
                      class=" text-neutral-700 ... font-geist_regular ..."
                      style={{
                              marginBottom: "7.5px"
                            }}
                    >
                      Parametric External Doors Title Blocks Colored Title Blocks (Metric + Imperial)
                    </h3>
                    
                    <h3 id={styles._H3} class=" text-neutral-700 ... font-avant_garde_bold ...">
                      {" "}
                      From $53.90
                    </h3>
                  </Link>
                </div>
              </div>



              <div id={styles.TEXT_HOLDER} style={{ gridArea: "TITLE" }}>

                <br/> 
                <br/> 
                <br/> 
                <br/> 
                <br/> 
                <br/> 
                <br/> 
              
                <div id={styles.SHOP_GRID}> 
                  <div  className="flex flex-wrap items-center gap-2 md:flex-row" style={{ gridArea: "ICON",
                                                                                           position: "relative",
                                                                                           top: "1px"
                  }}>
                    <FontAwesomeIcon icon={faCartShopping} 
                                    size="3xs" className="text-stone-900"
                                    style={{ fontSize: "40px"}} />
                  </div>  

                  <div className="flex flex-wrap items-center gap-2 md:flex-row" style={{ gridArea: "BUTTON",}}>
                    <Button>
                      <Link href="/products"
                            style={{ height: "100%",
                                     width: "100%"}}>Shop
                      </Link>
                    </Button>
                  </div> 

                  <div style={{ gridArea: "TEXT",}}>
                    <h3 id={styles._H3}
                        class=" text-neutral-700 ... font-avant_garde_bold ... ">
                      Click Here! <a></a>
                    </h3>
                    <br/>                
                    <h3 id={styles._H3}
                        class=" text-neutral-700 ... font-avant_garde_bold ... ">
                      Custom designed resources to help streamline, automate and enhance your workflow in architecture, design and manufacturing. 
                    </h3>
                  </div>   
                </div>
                                     
              </div>
          
            </div>
          </div>
{/* Desktop /////////////////////////////////////////////////////////////////////////// */} 
</section>

    

    )
  }
}

