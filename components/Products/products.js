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

import React from 'react';
import styles from './products.module.css';
import { Grid } from '@geist-ui/react';

export default function Products() {
  return (

    
    <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder}>
      <div className={styles.grid_0_main}>

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

    










  );
}
