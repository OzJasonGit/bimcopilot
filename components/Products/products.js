// 'use client';

// import styles from './products.module.css';
// import React, { Component } from 'react';
// import Image from "next/image";
// import Link from "next/link";
// import logo from './bimcopilot_logo_white.svg';
// import text_logo from './bimcopilot_logo_text_horizontal_white.svg';

// import { useState } from "react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
// import { Button } from "@/components/ui/button";
// import { formatPriceWithCurrencySync } from '@/app/utils/currency';

// export default class Products extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       products: [],
//       currency: typeof window !== 'undefined' ? localStorage.getItem('selectedCurrency') || 'USD' : 'USD',
//     };
//   }

//   async componentDidMount() {
//     try {
//       const res = await fetch('/api/products');
//       const data = await res.json();
//       const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       this.setState({ products: sorted.slice(0, 3) });
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     }

//     // Listen for currency changes
//     if (typeof window !== 'undefined') {
//       this.handleCurrencyChange = (event) => {
//         this.setState({ currency: event.detail.currency });
//       };
//       window.addEventListener('currencyChanged', this.handleCurrencyChange);
//     }
//   }

//   componentWillUnmount() {
//     if (typeof window !== 'undefined' && this.handleCurrencyChange) {
//       window.removeEventListener('currencyChanged', this.handleCurrencyChange);
//     }
//   }

//   render() {
//     const { products, currency } = this.state;

//     return (

      

//       <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder}>

//         <div className={styles.grid_0_main}>

//           <div
//             className={styles.grid_square_container}
//             style={{
//               gridArea: "MAIN-AREA",
//               position: "relative",
//             }}
//           >
//                       <div className={styles.grid_square}
//                         style={{
//                           height:"100%",  
//                           width:"100%",
//                           position:"absolute"                    
//                         }}>

//                       </div>

//           </div>

//         </div>
       
//       </section>




//     );
//   }
// }



'use client';


import styles from './products.module.css';
import { Grid } from '@geist-ui/react';
import Link from "next/link";
import Image from "next/image";

import logo from './bimcopilot_logo_white.svg';
import text_logo from './bimcopilot_logo_text_horizontal_white.svg';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { formatPriceWithCurrencySync } from '@/app/utils/currency';

import React, { Component } from 'react';
import { useState } from "react";





export default class Products extends Component {
   constructor(props) {
    super(props);
    this.state = {
      products: [],
             currency: typeof window !== 'undefined' ? localStorage.getItem('selectedCurrency') || 'USD' : 'USD',
      }      
    };  
      
      

    async componentDidMount() {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      this.setState({ products: sorted.slice(0, 3) });
    } catch (err) 
      
      
    {
      console.error("Error fetching products:", err);
    }



    // Listen for currency changes
    if (typeof window !== 'undefined') {
        this.handleCurrencyChange = (event) => {
          this.setState({ currency: event.detail.currency });
              };
        window.addEventListener('currencyChanged', this.handleCurrencyChange);
      }
    }



    componentWillUnmount() {
      if (typeof window !== 'undefined' && this.handleCurrencyChange) {
        window.removeEventListener('currencyChanged', this.handleCurrencyChange);
      }
    }


    render() {
    const { products, currency } = this.state;

    return (

      <section id={styles.SHADOW_SECTION_TITLE} 
               className={styles.center_holder}
               style={{
                      alignItems: 'center'
                      }}>

      <div className={styles.grid_0_main}
              style={{
                    gridArea:'MAIN-AREA',
                    width: '100%'
                    }}>  

        <div className={styles.holder}
              style={{
                    gridArea:'MAIN-AREA',
                    alignItems:'center',
                    position:'relative',
                    width:'100%',    
                    zIndex:'5'                
                    }}>


                    <div className={styles.products_holder}>
                      <div className={styles.grid_0_products}>
                        <div className={styles.products}
                            style={{
                                height: '100%',
                                width: '100%',
                                position: 'relative',
                                gridArea: 'MAIN-AREA',
                                zIndex: '2'
                                }}>












                                  
{/* Desktop View */}
                                <div id={styles.PRODUCTS_HOLDER}>
                                    
                                    {products.map((product, index) => (
                                      <div key={index} id={styles.PRODUCT} style={{ gridArea: `AREA_${index + 1}` }}>    


                                        <Link                                      
                                          href={`/products/${product.slug}`}
                                          className="group overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 shadow-none hover:shadow-xl"
                                          style={{ position: "relative", width: "100%", height: "100%" }}> 

                                          {/* Image wrapper */}
                                          <div className="relative w-full h-full transition-transform duration-500 ease-in-out transform-gpu origin-center scale-110 group-hover:scale-100 ">
                                            <Image
                                              src={product.images?.[0] || "/fallback.jpg"}
                                              alt={product.title}
                                              fill
                                              sizes="(max-width: 640px) 100vw, 256px"
                                              className="object-cover"
                                              priority={false}
                                            />
                                          </div>

                                          {/* Dark overlay */}
                                          <div className="absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100 " />

                                          {/* Icons */}
                                          <div id={styles.PRODUCT_OVERLAY_GRID} style={{ position: "absolute", width: "100%", height: "100%",  left: "0px", top:"0px", zIndex:"30"}}>
                                            <div style={{ gridArea: "LOGO", position: "relative", zIndex: 100}} className=" opacity-0 -translate-x-10 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                                              <Image src={logo} alt="Logo" fill style={{ objectFit: "cover" }} quality={100} loading="lazy" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==" />
                                            </div>
                                            <div style={{ gridArea: "TEXT", position: "relative", zIndex: 100}} className=" opacity-0  translate-x-10 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" >
                                              <Image src={text_logo} alt="Logo Text" fill style={{ objectFit: "cover" }} quality={100} loading="lazy" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==" />
                                            </div> 
                                            <div style={{ gridArea: "TITLE", position: "relative", zIndex: 100}}>
                                              <h3  id={styles._H2}  className="text-center text-stone-50 font-avant_garde_bold opacity-0 translate-y-10 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">{product.description} </h3>
                                            </div>   
                                          </div>
                                        
                                        </Link>

                                      </div>
                                    ))}
                                  
                                </div>

                                
                        </div>
                      </div>
                    </div>                   
        </div>

        <div className={styles.gradient}>
        </div>

        <div className={styles.horizontal_lines}
          style={{
                    height: '100%',
                    width: '100%',
                    position: 'relative',
                    gridArea: 'MAIN-AREA'
                  }}>
                  <div  id={styles.BORDER}
                        class="border-t border-stone-900 ... border-dashed ..."
                        style={{
                        height: '100%',
                        width: '100%',                      
                        gridArea: '2',
                        position: 'relative',
                        top: '-.5px'
                      }}>                  
                  </div>
                  <div  id={styles.BORDER}
                        class="border-t border-stone-900 ... border-dashed ..."
                        style={{
                        height: '100%',
                        width: '100%',                      
                        gridArea: '9'
                      }}>                  
                  </div>
        </div>

        <div
          className={styles.grid_square_container}
          style={{
            gridArea: 'MAIN-AREA',
            position: 'relative',
            maxWidth: '100%',
            margin: '0 auto',
          }}
        >

          {/* Geist scaffold */}
          <Grid.Container gap={0} justify="center" height="100%">
            <Grid xs={24} />
          </Grid.Container>

          {/* Overlay guide */}
          <div
            className={styles.grid_square}
              aria-hidden
              style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
            }}
            
            />          
        </div>
      </div>


      

      



      </section>

      

    )
  } 
};









































































