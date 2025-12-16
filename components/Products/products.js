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

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './products.module.css';
import { Grid } from '@geist-ui/react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error(`status ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setProducts(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load products');
          setLoading(false);
        }
        console.error('Products fetch error:', err);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder}>
      <div className={styles.grid_0_main}>
        <div
          className={styles.grid_square_container}
          style={{
            gridArea: 'MAIN-AREA',
            position: 'relative',
            maxWidth: '1200px',
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

          {/* Products */}
          <div
            id={styles.PRODUCTS_HOLDER}
            aria-live="polite"
            style={{
              position: 'absolute',
              inset: '16px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: '32px',
              overflow: 'hidden',
              pointerEvents: 'auto',
            }}
          >
            {loading && <p className="text-sm text-neutral-500">Loading products…</p>}
            {error && !loading && <p className="text-sm text-red-500">{error}</p>}
            {!loading && !error && products.length === 0 && (
              <p className="text-sm text-neutral-500">No products available.</p>
            )}
            {!loading &&
              !error &&
              products.slice(0, 3).map((product) => (
                <div
                  id={styles.PRODUCT_CARD}
                  key={product._id || product.product_id}
                  style={{ minWidth: 260, maxWidth: 320 }}
                >
                  <div id={styles.PRODUCT} style={{ gridTemplateRows: '340px auto' }}>
                    <div id={styles.PRODUCT_IMAGE}>
                      <Image
                        src={product.images?.[0] || '/placeholder.png'}
                        alt={product.title || 'Product image'}
                        fill
                        sizes="(max-width: 768px) 60vw, 20vw"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div id={styles.TEXT_HOLDER}>
                      <h3 id={styles._H3} className="text-neutral-800 font-avant_garde_bold">
                        {product.title}
                      </h3>
                      <p id={styles._H5} className="text-neutral-500">
                        {product.short_description}
                      </p>
                      <div className="flex gap-2 text-sm text-neutral-700">
                        {product.student_price !== undefined && (
                          <span>Student: ${product.student_price}</span>
                        )}
                        {product.commercial_price !== undefined && (
                          <span>Commercial: ${product.commercial_price}</span>
                        )}
                      </div>
                      <Link href={`/products/${product.slug || product.product_id || ''}`}>
                        <span className="text-emerald-500 text-sm">View</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
