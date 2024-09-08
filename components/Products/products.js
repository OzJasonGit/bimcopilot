import Provider from "../../app/utils/Provider";




import styles from './products.module.css'
import React, { Component } from 'react';


import Image from "next/image";
import Link from "next/link";

import revitBlinds from './revit_blinds.webp';
import rocketShip from './giphy.gif';
import drawingSheets from './drawing_sheets.webp';
import externalDoors from './external_doors_graphic.webp';
import volumesByRoom from './volumes_by_room.webp';


export default class Products extends Component {

  render() {
    return (

 

        <section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder}>
          <div class={styles.grid_0_main}>
            <div
              id={styles.PRODUCTS_HOLDER_MOBILE}
              styles={{ position: "absolute" }}>
              <div id={styles.PRODUCTS_HORIZONTAL_MOBILE}>



              

                  










                <div
                      class="rounded-md ..."
                      id={styles.PRODUCT_CARD}
                      styles={{ gridArea: "2" }}>




                      <div 
                        id={styles.IMAGE_1}>
                        
                          <Image
                            class=" rounded-md ... "
                            id={styles.PRODUCT_IMAGE}
                            src={revitBlinds}                    
                            style={{objectFit: "cover"}}
                            quality={100}
                            //object-fit="cover"                      
                            alt=""/>                                                                            
                          <Image/>

                      </div>
                      



                      <div>
                        <Link href="/">
                          <h2
                            id={styles._H2}
                            class=" text-neutral-700 ... font-avant_garde_bold">
                            Parametric Title Block Catalogue (Metric + Imperial)
                          </h2>
                          <br/>
                          <h4 class=" text-neutral-700 ... font-avant_garde_bold">
                            {" "}
                            From $53.90
                          </h4>
                        </Link>
                      </div>


                </div>



                <div
                      class="rounded-md ..."
                      id={styles.PRODUCT_CARD}
                      styles={{ gridArea: "1" }}>




                              <div 
                                id={styles.IMAGE_1}>
                                
                                  <Image
                                    class=" rounded-md ... "
                                    id={styles.PRODUCT_IMAGE}
                                    src={drawingSheets}                     
                                    style={{objectFit: "cover"}}
                                    quality={100}
                                    //object-fit="cover"                      
                                    alt=""/>                                                                            
                                  <Image/>

                              </div>
                              



                              <div>
                                <Link href="/">
                                  <h2
                                    id={styles._H2}
                                    class=" text-neutral-700 ... font-avant_garde_bold">
                                    Parametric Title Block Catalogue (Metric + Imperial)
                                  </h2>
                                  <br/>
                                  <h4 class=" text-neutral-700 ... font-avant_garde_bold">
                                    {" "}
                                    From $53.90
                                  </h4>
                                </Link>
                              </div>


                </div>













              <div
                      class="rounded-md ..."
                      id={styles.PRODUCT_CARD}
                      styles={{ gridArea: "3" }}>




                              <div 
                                id={styles.IMAGE_1}>
                                
                                  <Image
                                    class=" rounded-md ... "
                                    id={styles.PRODUCT_IMAGE}
                                    src={volumesByRoom}                     
                                    style={{objectFit: "cover"}}
                                    quality={100}
                                    //object-fit="cover"                      
                                    alt=""/>                                                                            
                                  <Image/>

                              </div>
                              



                              <div>
                                <Link href="/">
                                  <h2
                                    id={styles._H2}
                                    class=" text-neutral-700 ... font-avant_garde_bold">
                                    Parametric Title Block Catalogue (Metric + Imperial)
                                  </h2>
                                  <br/>
                                  <h4 class=" text-neutral-700 ... font-avant_garde_bold">
                                    {" "}
                                    From $53.90
                                  </h4>
                                </Link>
                              </div>


                </div>










              </div>
            </div>










            <div id={styles.PRODUCTS_HOLDER}>


              <div id={styles.PRODUCT} style={{ gridArea: "AREA_1" }}>
                
                <Image
                    class=" rounded-md ... "
                    id={styles.PRODUCT_IMAGE}
                    src={revitBlinds}                    
                    style={{objectFit: "cover"}}
                    quality={100}
                    //object-fit="cover"                      
                    alt=""/>                                                                            
                <Image/>
                               
                <div>
                  <Link href="/">
                    <h2
                      id={styles._2H2}
                      class=" text-neutral-700 ... font-avant_garde_bold ... text-xl ...">
                      Parametric Title Block Catalogue (Metric + Imperial)
                    </h2>
                    <h3 class=" text-neutral-700 ... font-avant_garde_bold text-md ...">
                      {" "}
                      From $33.00
                    </h3>
                  </Link>
                </div>

              </div>



              <div id={styles.PRODUCT} style={{ gridArea: "AREA_2" }}>

                <Image
                    class=" rounded-md ... drop-shadow-xl ... "
                    id={styles.PRODUCT_IMAGE}
                    src={drawingSheets}                    
                    style={{objectFit: "cover"}}
                    quality={100}
                    //object-fit="cover"                      
                    alt=""/>                                                                            
                <Image/>

                <div>
                  <Link href="/">
                    <h2
                      id={styles._2H2}
                      class=" text-neutral-700 ... font-avant_garde_bold ... text-xl ..."
                    >
                      Parametric Colored Title Blocks (Metric + Imperial)
                    </h2>
                    <h3 class=" text-neutral-700 ... font-avant_garde_bold text-md ...">
                      {" "}
                      From $31.90
                    </h3>
                  </Link>
                </div>

              </div>




              <div id={styles.PRODUCT} style={{ gridArea: "AREA_3" }}>

                <Image
                    class="bg-neutral-900 rounded-md ..."
                    id={styles.PRODUCT_IMAGE}
                    src={volumesByRoom}                    
                    style={{objectFit: "cover"}}
                    quality={100}
                    //object-fit="cover"                      
                    alt=""/>                                                                            
                <Image/>


                <div>
                  <Link href="/">
                    <h2
                      id={styles._2H2}
                      class=" text-neutral-700 ... font-avant_garde_bold ... text-xl ..."
                    >
                      Parametric External Doors (Metric + Imperial)
                    </h2>
                    <h3 class=" text-neutral-700 ... font-avant_garde_bold text-md ...">
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
                        <Link href="https://www.bimcopilot.com/products">Shop</Link>
                      </a>
                </h2>
              </div>


            </div>
          </div>
      </section>

    

    )
  }
}

