'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';
import parse from 'html-react-parser';
import React from 'react';
import Menu from '../../components/Menu/menu';
import Sides from '../../components/Sides/sides';
import Header from '../../components/Header/Header';
import Subfooter from '../../components/Subfooter2/subfooter2';
import Footer from '../../components/Footer/Footer';
import Subscribetop from '../../components/Subscribetop/subscribetop';

import styles from './products.module.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const chunkIntoGroupsOfFive = (array) => {
    const groups = [];
    for (let i = 0; i < array.length; i += 5) {
      groups.push(array.slice(i, i + 5));
    }
    return groups;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        const list = Array.isArray(data.data) ? data.data : data;
        setProducts(
          list.map(p => ({
            id: p._id,
            slug: p.slug ?? p._id,
            image: p.images?.[0] ?? '/images/placeholder.jpg',
            title: p.title ?? 'Untitled',
            subtitle: p.short_description ?? 'No description',
          }))
        );
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const productGroups = chunkIntoGroupsOfFive(products);

  return (
    <>
      <Menu />
      <Header />
      <Sides />
      <Subscribetop />

      {loading ? (
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <section className={styles.center_holder}>
          <div className={styles.grid_0_product}>
            <div className={styles.grid}>
              {productGroups.map((group, groupIndex) => {
                const isEvenGroup = groupIndex % 2 === 0;

                return (
                  <React.Fragment key={groupIndex}>
                    {/* Row 1: First 3 small cards */}
                    {group.slice(0, 3).map((product) => (
                      <div key={product.id} className={styles.card}>
                        <Link href={`/products/${product.slug}`}>
                          <div className={styles.imageWrapper}>
                            <Image
                              src={product.image}
                              alt={product.title}
                              fill
                              className={styles.image}
                            />
                          </div>
                        </Link>
                        <div className={styles.text}>
                          <h2 className={styles.title}>{parse(product.title)}</h2>
                          <p className={styles.subtitle}>{parse(product.subtitle)}</p>
                        </div>
                      </div>
                    ))}

                    {/* Row 2: Small + Large (aligned left or right) */}
                    {group.length >= 5 && (
                      <>
                        {isEvenGroup ? (
                          <>
                            <div key={group[3].id} className={styles.card}>
                              <Link href={`/products/${group[3].slug}`}>
                                <div className={styles.imageWrapper}>
                                  <Image
                                    src={group[3].image}
                                    alt={group[3].title}
                                    fill
                                    className={styles.image}
                                  />
                                </div>
                              </Link>
                              <div className={styles.text}>
                                <h2 className={styles.title}>{parse(group[3].title)}</h2>
                                <p className={styles.subtitle}>{parse(group[3].subtitle)}</p>
                              </div>
                            </div>
                            <div key={group[4].id} className={`${styles.card} ${styles.cardLarge} ${styles.cardRight}`}>
                              <Link href={`/products/${group[4].slug}`}>
                                <div className={styles.imageWrapper}>
                                  <Image
                                    src={group[4].image}
                                    alt={group[4].title}
                                    fill
                                    className={styles.image}
                                  />
                                </div>
                              </Link>
                              <div className={styles.text}>
                                <h2 className={styles.title}>{parse(group[4].title)}</h2>
                                <p className={styles.subtitle}>{parse(group[4].subtitle)}</p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div key={group[4].id} className={`${styles.card} ${styles.cardLarge} ${styles.cardLeft}`}>
                              <Link href={`/products/${group[4].slug}`}>
                                <div className={styles.imageWrapper}>
                                  <Image
                                    src={group[4].image}
                                    alt={group[4].title}
                                    fill
                                    className={styles.image}
                                  />
                                </div>
                              </Link>
                              <div className={styles.text}>
                                <h2 className={styles.title}>{parse(group[4].title)}</h2>
                                <p className={styles.subtitle}>{parse(group[4].subtitle)}</p>
                              </div>
                            </div>
                            <div key={group[3].id} className={styles.card}>
                              <Link href={`/products/${group[3].slug}`}>
                                <div className={styles.imageWrapper}>
                                  <Image
                                    src={group[3].image}
                                    alt={group[3].title}
                                    fill
                                    className={styles.image}
                                  />
                                </div>
                              </Link>
                              <div className={styles.text}>
                                <h2 className={styles.title}>{parse(group[3].title)}</h2>
                                <p className={styles.subtitle}>{parse(group[3].subtitle)}</p>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Subfooter />
      <Footer />
    </>
  );
};

export default Products;
