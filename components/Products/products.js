import styles from './products.module.css'
import React, { Component } from 'react';
import Image from "next/image";
import Link from "next/link";
import revitBlinds from './revit_blinds.webp';
import drawingSheets from './drawing_sheets.webp';
import volumesByRoom from './volumes_by_room.webp';


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
                <Link href="/sales">
                  <Image
                    class=" rounded-xl ... "
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
                <Link href="/sales">
                  <Image
                      class=" rounded-xl ... drop-shadow-xl ... "
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
                <Link href="/sales">
                  <Image
                      class="rounded-2xl ..."
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
                <h2
                    id={styles.TEXT_OUTLINE_2}>
                 <a class=" text-yellow-200 ... font-avant_garde_bold ...">
                    <Link href="/products">Shop</Link>
                 </a>
                </h2>
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
{/* Desktop /////////////////////////////////////////////////////////////////////////// */} 
</section>

    

    )
  }
}

