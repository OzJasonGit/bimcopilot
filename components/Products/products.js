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
          }}
        >
          <Grid.Container gap={0} justify="center" height="100%">
            <Grid xs={24} />
          </Grid.Container>

          <div
            className={styles.grid_square}
            aria-hidden
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
            }}
          />
        </div>
      </div>
    </section>
  );
}
