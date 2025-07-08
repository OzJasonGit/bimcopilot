'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';
import parse from 'html-react-parser';

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

  return (
    <>
      <Menu />
      <Header />
      <Sides />
      <Subscribetop />

      {loading ? (
        <div className={styles.loader}><div className={styles.spinner}></div>
        </div>
      ) : (
        <section  id={styles.SHADOW_SECTION} class={styles.center_holder}>
            <div className={styles.grid}>
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className={`${styles.card} ${index === 4 ? styles.cardLarge : ''}`}
                  >
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
            </div>
        </section>
      )}

      <Subfooter />
      <Footer />
    </>
  );
};

export default Products;
