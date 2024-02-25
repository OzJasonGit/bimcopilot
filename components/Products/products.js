import Provider from "../../app/utils/Provider";




import styles from './products.module.css'
import React, { Component } from 'react';


import Image from "next/image";
import Link from "next/link";


export default class Products extends Component {

  render() {
    return (

    <Provider>

        <section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder}>
          <div class={styles.grid_0_main}>
            <div
              id={styles.PRODUCTS_HOLDER_MOBILE}
              styles={{ position: "absolute" }}
            >
              <div id={styles.PRODUCTS_HORIZONTAL_MOBILE}>
                  <div
                      class="rounded-2xl ...  drop-shadow-2xl ..."
                      id={styles.PRODUCT_CARD}
                      styles={{ gridArea: "1" }}>
                          <Link
                          href="/"
                          id={styles.PRODUCT_IMAGE}
                          class="bg-neutral-800 rounded-xl ... drop-shadow-2xl ...">

                          </Link>
                  <div>
                    <Link href="/">
                      <h2
                        id={styles._H2}
                        class=" text-neutral-700 ... font-avant_garde_bold"
                      >
                        This is the product title
                      </h2>
                      <h3 class=" font-avant_garde_medium">
                        {" "}
                        This the product description
                      </h3>
                    </Link>
                  </div>
                </div>
                <div
                  class="rounded-2xl ... drop-shadow-2xl ..."
                  id={styles.PRODUCT_CARD}
                  styles={{ gridArea: "2" }}
                >
                  <Link
                    href="/"
                    id={styles.PRODUCT_IMAGE}
                    class="bg-neutral-800 rounded-xl ... drop-shadow-2xl ..."
                  ></Link>
                  <div>
                    <Link href="/">
                      <h2
                        id={styles._H2}
                        class=" text-neutral-700 ... font-avant_garde_bold"
                      >
                        This is the product title
                      </h2>
                      <h3 class=" text-neutral-700 ... font-avant_garde_medium">
                        {" "}
                        This the product description
                      </h3>
                    </Link>
                  </div>
                </div>
                <div
                  class="rounded-2xl ... drop-shadow-2xl ..."
                  id={styles.PRODUCT_CARD}
                  styles={{ gridArea: "3" }}
                >
                  <Link
                    href="/"
                    id={styles.PRODUCT_IMAGE}
                    class="bg-neutral-800 rounded-xl ... drop-shadow-2xl ..."
                  ></Link>
                  <div>
                    <Link href="/">
                      <h2
                        id={styles._H2}
                        class=" text-neutral-700 ... font-avant_garde_bold"
                      >
                        This is the product title
                      </h2>
                      <h3 class=" text-neutral-700 ... font-avant_garde_medium">
                        {" "}
                        This the product description
                      </h3>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div id={styles.PRODUCTS_HOLDER}>
              <div id={styles.PRODUCT} style={{ gridArea: "AREA_1" }}>
                <Link
                  href="/"
                  id={styles.PRODUCT_IMAGE}
                  class="bg-neutral-900 rounded-xl ... drop-shadow-2xl ..."
                ></Link>
                {/*<div  id={styles.PRODUCT_SHADOW} class="bg-neutral-950 rounded-xl ...">                                                            
                                  </div>*/}
                <div>
                  <Link href="/">
                    <h2
                      id={styles._H2}
                      class=" text-neutral-700 ... font-avant_garde_bold"
                    >
                      This is the product title
                    </h2>
                    <h3 class=" text-neutral-700 ... font-avant_garde_medium">
                      {" "}
                      This the product description
                    </h3>
                  </Link>
                </div>
              </div>
              <div id={styles.PRODUCT} style={{ gridArea: "AREA_2" }}>
                <Link
                  id={styles.PRODUCT_IMAGE}
                  href="/"
                  class="bg-neutral-900 rounded-xl ... drop-shadow-2xl ..."
                ></Link>
                {/*<div  id={styles.PRODUCT_SHADOW} class="bg-neutral-950 rounded-xl ...">                                                            
                                  </div>*/}
                <div>
                  <Link href="/">
                    <h2
                      id={styles._H2}
                      class=" text-neutral-700 ... font-avant_garde_bold"
                    >
                      This is the product title
                    </h2>
                    <h3 class=" text-neutral-700 ... font-avant_garde_medium">
                      {" "}
                      This the product description
                    </h3>
                  </Link>
                </div>
              </div>
              <div id={styles.PRODUCT} style={{ gridArea: "AREA_3" }}>
                <Link
                  id={styles.PRODUCT_IMAGE}
                  href="/"
                  class="bg-neutral-900 rounded-xl ... drop-shadow-2xl ..."
                ></Link>
                {/*<div  id={styles.PRODUCT_SHADOW} class="bg-neutral-950 rounded-xl ...">                                                            
                                  </div>*/}
                <div>
                  <Link href="/">
                    <h2
                      id={styles._H2}
                      class=" text-neutral-700 ... font-avant_garde_bold"
                    >
                      This is the product title
                    </h2>
                    <h3 class=" text-neutral-700 ... font-avant_garde_medium">
                      {" "}
                      This the product description
                    </h3>
                  </Link>
                </div>
              </div>
            </div>
          </div>
      </section>

    </Provider>

    

    )
  }
}

