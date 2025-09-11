'use client';

import styles from './products.module.css';
import React, { Component } from 'react';
import Image from "next/image";
import Link from "next/link";
import logo from './bimcopilot_logo_white.svg';
import text_logo from './bimcopilot_logo_text_horizontal_white.svg';

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      this.setState({ products: sorted.slice(0, 3) });
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }

  render() {
    const { products } = this.state;

    return (
      <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder}>

        
        <div className={styles.grid_0_main}>

          {/* Mobile View */}
          <div id={styles.PRODUCTS_HOLDER_MOBILE}>
            <div id={styles.PRODUCTS_HORIZONTAL_MOBILE}>
             {products.map((product, index) => (
              <div id={styles.PRODUCT_CARD} key={index}
                style={{
                    width: '100%',                 
                    alignItems: 'left',
                  }}>

                    <Link href={`/products/${product.slug}`}
                          style={{
                                width: '100%',
                                height: '265px',                               
                              }}>

                      <div 
                        
                        class="rounded-lg ..."
                        style={{
                          gridArea: 'IMAGE',
                          width: '100%',
                          height: '100%',
                          position: 'relative',                      
                          overflow: 'hidden',
                        
                        }}
                      >                     
                        <Image
                          src={
                            product.images?.[0] && product.images[0].startsWith('/')
                              ? product.images[0]
                              : product.images?.[0] || '/bimcopilot_logo_black.svg'
                          }
                          alt={product.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />

                          </div>
                        </Link>


                    <div 
                      style={{ 
                          textAlign: 'left', 
                          marginTop: '10px' }}>
                          <Link href={`/products/${product.slug}`}>
                            <h3 id={styles._H3} 
                                style={{ marginBottom: '4px' }} 
                                className="text-stone-50 font-avant_garde_bold" >
                              {product.short_description}
                            </h3>
                            <h3 id={styles._H3} 
                                style={{ marginTop: '4px' }}
                                className="text-stone-50 font-avant_garde_medium">
                                From ${product.commercial_price}
                            </h3>
                          </Link>
                    </div>




                  </div>
                  ))}

            </div>
          </div>

          {/* Desktop View */}
          <div id={styles.PRODUCTS_HOLDER}>
              
              {products.map((product, index) => (
                <div key={index} id={styles.PRODUCT} style={{ gridArea: `AREA_${index + 1}` }}>

                  

                  <Link
                  
                    href={`/products/${product.slug}`}
                    className="group overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 shadow-none hover:shadow-xl"
                    style={{ position: "relative", width: "100%", height: "100%" }}>

                    
                    {/* Image wrapper */}
                    <div className="relative w-full h-full transition-transform duration-500 ease-in-out transform-gpu origin-center scale-115 group-hover:scale-100 z-20">
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
                    <div className="absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-20" />


                    
                  
                  </Link>

                  
                  <div>
                    <Link href={`/products/${product.slug}`}>
                      <h4 id={styles._H4} className="text-neutral-700 font-avant_garde_medium" style={{ marginBottom: "7.5px" }}>
                        {product.description}
                      </h4>
                      <h4 id={styles._H4} className="text-neutral-700 font-avant_garde_bold">
                        From ${product.commercial_price}
                      </h4>
                    </Link>
                  </div>


                </div>
              ))}

      

              {/* CTA Section */}
              <div id={styles.TEXT_HOLDER} style={{ gridArea: "TITLE" , paddingTop: "100px" }}>
                <div id={styles.SHOP_GRID}>



                  <div style={{ gridArea: "ICON",
                                alignSelf: "center"}}>
                    <FontAwesomeIcon icon={faCartShopping} className="text-stone-900" style={{ fontSize: "40px" }} />
                  </div>

                  <div style={{ gridArea: "BUTTON",
                                alignSelf: "center"}}>
                    <Button>
                      <Link href="/products" style={{ height: "100%", width: "100%" }}>
                        Shop
                      </Link>
                    </Button>
                  </div>

                  <div style={{ gridArea: "TEXT" }}>
                    <h3 id={styles._H3} className="text-neutral-700 font-avant_garde_bold">Click Here!</h3>
                   
                    <h3 id={styles._H3} className="text-neutral-700 font-avant_garde_medium">
                      Custom designed resources to help streamline, automate and enhance your workflow in architecture, design and manufacturing.
                    </h3>
                  </div>
                </div>
              </div>

          </div>

        </div>

      </section>
    );
  }
}
