'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';
import parse from 'html-react-parser';
import styles from './products.module.css';
import Menu from '../../components/Menu/menu';
import Sides from '../../components/Sides/sides';
import Header from '../../components/Header/Header';
import Subfooter from '../../components/Subfooter2/subfooter2';
import Footer from '../../components/Footer/Footer';
import Subscribetop from '../../components/Subscribetop/subscribetop';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/products', { cache: 'no-store' });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to fetch products');
        }
        const data = await res.json();
        const fetchedProducts = Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [];
        console.log('Fetched products:', JSON.stringify(fetchedProducts, null, 2));
        setProducts(fetchedProducts.map(p => ({
          _id: p._id,
          image: p.images?.[0] || '/placeholder-image.jpg',
          title: p.title || '',
          subtitle: p.short_description || '',
          slug: p.slug || '',
        })));
      } catch (error) {
        console.error('Fetch products error:', error);
        toast.error(error.message || 'Failed to load products. Please try again.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Assign products to sections without duplicates
  const section1Product = products[0] ? [products[0]] : []; // Product 1
  const section2Product1 = products[1] ? [products[1]] : []; // Product 2
  const section2Product2 = products[2] ? [products[2]] : []; // Product 3

  console.log('Section 1 product:', JSON.stringify(section1Product, null, 2));
  console.log('Section 2 product 1:', JSON.stringify(section2Product1, null, 2));
  console.log('Section 2 product 2:', JSON.stringify(section2Product2, null, 2));

  return (
    <>
      <Menu />
      <Header />
      <Sides />
      <Subscribetop />

      {loading ? (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
        </div>
      ) : products.length === 0 ? (
        <section className={styles.center_holder}>
          <p className="text-gray-500 text-center">No products available</p>
        </section>
      ) : (
        <>
          {/* Section 1: First product */}
          {section1Product.length > 0 && (
            <section id={styles.SHADOW_SECTION_BLOG} className={styles.center_holder}>
              <div className={styles.grid_0_blogimageholder}>
                <div className={styles.grid_0_blogimage}>
                  <div id={styles.BLOGIMAGE_HOLDER}>
                    {section1Product.map((product) => (
                      <div id={styles.BLOGIMAGE} key={product._id}>
                        <div className="rounded-md" id={styles.B_IMAGE}>
                          <Link href={`/products/${product.slug}`}>
                            <Image
                              alt={product.title || 'Product image'}
                              width={500}
                              height={500}
                              src={product.image}
                              style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                              onError={(e) => { e.target.src = '/placeholder-image.jpg'; }}
                            />
                          </Link>
                        </div>
                        <div id={styles.PRODUCT_TEXT}>
                          <h2 id={styles._H2} className="text-stone-200 font-avant_garde_bold">
                            {parse(product.title)}
                          </h2>
                          <br />
                          <h3 id={styles._H3} className="text-stone-400 font-avant_garde_bold">
                            {parse(product.subtitle)}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Section 2: Second and third products in grid */}
          {(section2Product1.length > 0 || section2Product2.length > 0) && (
            <section id={styles.SHADOW_SECTION_BLOG} className={styles.center_holder}>
              <div className={styles.grid_0_blogimageholder}>
                <div className={styles.grid_0_blogimage}>
                  <div id={styles.BLOGIMAGE_HOLDER_GRID}>
                    <div id={styles.BLOGIMAGE_HOLDER_GRID_1}>
                      {section2Product1.map((product) => (
                        <div id={styles.BLOGIMAGE} key={product._id}>
                          <div className="rounded-md" id={styles.B_IMAGE}>
                            <Link href={`/products/${product.slug}`}>
                              <Image
                                alt={product.title || 'Product image'}
                                width={500}
                                height={500}
                                src={product.image}
                                style={{
                                  position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                }}
                                onError={(e) => { e.target.src = '/placeholder-image.jpg'; }}
                              />
                            </Link>
                          </div>
                          <div id={styles.PRODUCT_TEXT}>
                            <h2 id={styles._H2} className="text-stone-200 font-avant_garde_bold">
                              {parse(product.title)}
                            </h2>
                            <br />
                            <h3 id={styles._H3} className="text-stone-400 font-avant_garde_bold">
                              {parse(product.subtitle)}
                            </h3>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div id={styles.BLOGIMAGE_HOLDER_GRID_2}>
                      {section2Product2.map((product) => (
                        <div id={styles.BLOGIMAGE_2} key={`${product._id}-grid2`}>
                          <div className="rounded-md" id={styles.B_IMAGE}>
                            <Link href={`/products/${product.slug}`}>
                              <Image
                                alt={product.title || 'Product image'}
                                width={500}
                                height={500}
                                src={product.image}
                                style={{
                                  position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                }}
                                onError={(e) => { e.target.src = '/placeholder-image.jpg'; }}
                              />
                            </Link>
                          </div>
                          <div id={styles.PRODUCT_TEXT}>
                            <h2 id={styles._H2} className="text-stone-200 font-avant_garde_bold">
                              {parse(product.title)}
                            </h2>
                            <br />
                            <h3 id={styles._H3} className="text-stone-400 font-avant_garde_bold">
                              {parse(product.subtitle)}
                            </h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Sections 3, 4, 5: Hidden unless more products are added */}
        </>
      )}

      <Subfooter />
      <Footer />
    </>
  );
};

export default Products;