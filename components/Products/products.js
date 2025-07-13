'use client';

import styles from './products.module.css';
import React, { Component } from 'react';
import Image from "next/image";
import Link from "next/link";
import logo from './bimcopilot_logo_black.svg';
import text_logo from './bimcopilot_logo_text_horizontal_black.svg';

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
              <div id={styles.PRODUCT_CARD} key={index}>
                    <Link href={`/products/${product.slug}`}>
                      <div
                        style={{
                          width: '100%',
                          height: '220px',
                          position: 'relative',
                          background: '#eee',
                          minWidth: '220px', // ← Add this!
                          borderRadius: '12px',
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
                          className="rounded-2xl"
                          priority
                        />
                      </div>
                    </Link>

                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                      <Link href={`/products/${product.slug}`}>
                        <h3 id={styles._H3} style={{ marginBottom: '4px' }}>
                          {product.short_description}
                        </h3>
                        <h3 id={styles._H3} style={{ marginTop: '4px' }}>
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
                  <Link href={`/products/${product.slug}`} className="rounded-xl" style={{ position: "relative", width: "100%", height: "100%" }}>
                    <div id={styles.PRODUCT_OVERLAY_GRID} style={{ position: "absolute", width: "100%", height: "100%", zIndex: 100 }}>
                      <div style={{ gridArea: "LOGO", position: "relative" }}>
                        <Image src={logo} alt="Logo" fill style={{ objectFit: "cover" }} quality={100} />
                      </div>
                      <div style={{ gridArea: "TEXT", position: "relative" }}>
                        <Image src={text_logo} alt="Logo Text" fill style={{ objectFit: "cover" }} quality={100} />
                      </div>
                    </div>
                    <Image
                      id={styles.PRODUCT_IMAGE}
                      src={product.images?.[0] || "/fallback.jpg"}
                      alt={product.title}
                      style={{ objectFit: "cover", position: "absolute", width: "100%", height: "100%" }}
                      fill
                      className="rounded-xl"
                      quality={100}
                    />
                  </Link>
                  <div>
                    <Link href={`/products/${product.slug}`}>
                      <h3 id={styles._H3} className="text-neutral-700 font-geist_regular" style={{ marginBottom: "7.5px" }}>
                        {product.description}
                      </h3>
                      <h3 id={styles._H3} className="text-neutral-700 font-avant_garde_bold">
                        From ${product.commercial_price}
                      </h3>
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
