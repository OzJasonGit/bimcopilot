'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';
import parse from 'html-react-parser';
import styles from './saleslanding.module.css';
import Menu_White from '@/components/Menu_White/menu_white';
import Sides from '@/components/Sides/sides_white';
import Header_White from '@/components/Header_White/Header_White';
import Subfooter_White from '@/components/Subfooter_White/subfooter_white';
import Footer from '@/components/Footer/Footer_White';
import Collapsed_Sales from '@/components/Collapse_Sales/collapse_sales';
import Services_1 from '@/components/services_1/services_1';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams } from 'next/navigation';

const Products = () => {
    const { slug } = useParams();
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
          _id: p._id || '',
          product_id: p.product_id || 'Unknown',
          image: Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : '/images/placeholder.jpg',
          images: Array.isArray(p.images) && p.images.length > 0 ? p.images : ['/images/placeholder.jpg'],
          title: p.title || 'Untitled Product',
          subtitle: p.short_description || 'No description available',
          description: p.description || 'No detailed description available.',
          commercial_price: p.commercial_price || 0,
          student_price: p.student_price || 0,
          category: p.category || 'General',
          slug: p.slug || p._id || '',
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

  console.log('Products for render:', JSON.stringify(products, null, 2));

  return (
    <>
      <Menu_White />
      <Header_White />
      <Sides />
      <Services_1 />

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
          {products.slice(1).map((product) => (
            <div key={product._id}>
              <section id={styles.SHADOW_SECTION_BLOG} className={styles.center_holder}>
                <div className={styles.grid_0_scroll}>
                  <div id={styles.SALES_GRID_HOLDER}>
                    <div
                      id={styles.PRODUCT_ID_HOLDER}
                      style={{
                        gridArea: 'PRODUCT_ID',
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <h1 id={styles._H1} className="text-stone-700 font-avant_garde_bold">
                        <span className="text-md text-stone-700 font-geist_regular" style={{ marginBottom: '0px' }}>
                          Product_ID
                        </span>{' '}
                        {parse(product.product_id)}
                      </h1>
                    </div>

                    <div id={styles.SALES_IMAGE_HOLDER}>
                      <div className="rounded-xl" id={styles.SALES_IMAGE}>
                      <Link
  href={`/products/${product.slug}`}
  onClick={() => {
    localStorage.setItem('selectedSlug', product.slug);
    console.log(`Saved slug: ${product.slug}`);
  }}
>

                          <Image
                            alt={product.title || 'Product image'}
                            key={`${product._id}-main`}
                            width={500}
                            height={500}
                            src={product.image}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                            onError={() => console.log(`Image failed to load for ${product.title}: ${product.image}`)}
                          />
                        </Link>
                      </div>

                      <div id={styles.SALES_IMAGE_2}>
                        <div id={styles.SALES_IMAGE_3}>
                          {['V', 'W', 'X', 'Y', 'Z'].map((suffix, index) => (
                            <div key={suffix} className="rounded-lg" id={styles[`SALES_IMAGE_${suffix}`]}>
                              <Image
                                alt={`${product.title} image ${index + 1}`}
                                key={`${product._id}-image-${suffix}`}
                                width={500}
                                height={500}
                                src={product.images[index % product.images.length] || '/images/placeholder.jpg'}
                                style={{
                                  position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                }}
                                onError={() => console.log(`Image failed to load for ${product.title}: ${product.images[index % product.images.length] || '/images/placeholder.jpg'}`)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div id={styles.SALES_CHECKOUT_HOLDER}>
                      <div
                        style={{
                          position: 'relative',
                          gridArea: 'C1',
                        }}
                      >
                        <h2 id={styles._H2} className="text-stone-700 font-avant_garde_bold" style={{ marginBottom: '0px' }}>
                          {parse(product.title)}
                        </h2>
                      </div>

                      <div
                        id={styles.SLUG}
                        style={{
                          position: 'relative',
                          gridArea: 'SLUG',
                        }}
                      >
                        <h3 className="text-md text-stone-700 font-geist_regular" style={{ marginBottom: '0px' }}>
                          {parse(product.subtitle)}
                        </h3>
                      </div>

                      <div
                        style={{
                          position: 'relative',
                          gridArea: 'C2',
                        }}
                      >
                        <h3 className="text-md text-stone-700 font-geist_semibold" style={{ marginBottom: '0px' }}>
                          ${product.commercial_price.toFixed(2)}{' '}
                          <span className="text-md text-stone-700 font-geist_regular">Tax included.</span>
                        </h3>
                      </div>

                      <div id={styles.C3}>
                        <h3 className="text-md text-stone-700 font-geist_semibold" style={{ marginBottom: '0px' }}>
                          License Type
                        </h3>
                        <br />
                        <Tabs defaultValue="commercial" className="w-[400px]">
                          <TabsList>
                            <TabsTrigger value="educational">Educational</TabsTrigger>
                            <TabsTrigger value="commercial">Commercial</TabsTrigger>
                          </TabsList>
                        </Tabs>
                        <br />
                        <h3 className="text-md text-stone-700 font-geist_regular" style={{ marginBottom: '0px' }}>
                          Are you a student? Select Educational Use.
                        </h3>
                      </div>

                      <div id={styles.C4}>
                        <div id={styles.CHECKOUT_GRID}>
                          <div id={styles.ADD_TO_CART}>
                            <Link href="/payment">
                              <Button
                                style={{
                                  position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                }}
                              >
                                Add To Cart
                              </Button>
                            </Link>
                          </div>

                          <div id={styles.PAYPAL}>
                            <Link href="/payment">
                              <Button
                                variant="secondary"
                                className="border border-solid rounded-md border-stone-800"
                                style={{
                                  position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                }}
                              >
                                Buy With Paypal
                              </Button>
                            </Link>
                          </div>

                          <div id={styles.MORE_OPTIONS}>
                            <a></a>
                          </div>
                        </div>
                      </div>

                      <div id={styles.C5}>
                        <h3 className="text-md text-stone-700 font-geist_regular" style={{ marginBottom: '0px' }}>
                          For Educational Use (Reduced price) please send us an email with your student card and info to{' '}
                          <a href="mailto:info@bimcopilot.com">info@bimcopilot.com</a>
                        </h3>
                      </div>

                      <div id={styles.C6}>
                        <h3 className="text-md text-stone-700 font-geist_regular">
                          Digital Download
                        </h3>
                        <h3 className="text-md text-stone-700 font-geist_regular">
                          Revit Version 2020
                        </h3>
                        <h3 className="text-md text-stone-700 font-geist_regular">
                          Created By: Bimcopilot.com
                        </h3>
                        <h3 className="text-md text-stone-700 font-geist_regular">
                          Pack Category: {product.category}
                        </h3>
                      </div>

                      <div id={styles.C7}>
                        <Collapsed_Sales />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id={styles.SHADOW_SECTION_BLOG} className={styles.center_holder}>
                <div className={styles.grid_0_scroll}>
                  <div id={styles.BOUGHT_TOGETHER_GRID}>
                    <div id={styles.BOUGHT_TOGETHER_BLOCK}>
                      <div id={styles.BOUGHT_TITLE_HOLDER}>
                        <h2 id={styles._H2} className="text-4xl text-stone-700 font-avant_garde_bold">
                          Frequently Bought Together
                        </h2>
                      </div>
                      <div id={styles.BOUGHT_IMAGE_HOLDER}>
                        {['A', 'B', 'C'].map((suffix, index) => (
                          <div key={suffix} className="rounded-lg" id={styles[`SALES_IMAGE_${suffix}`]}>
                            <Image
                              alt={`${product.title} related image ${index + 1}`}
                              key={`${product._id}-related-${suffix}`}
                              width={500}
                              height={500}
                              src={product.images[index % product.images.length] || '/images/placeholder.jpg'}
                              style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                              onError={() => console.log(`Related image failed to load for ${product.title}: ${product.images[index % product.images.length] || '/images/placeholder.jpg'}`)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div id={styles.BOUGHT_IMAGE_HOLDER_MOBILE}>
                      <div id={styles.BOUGHT_TOGETHER_GRID_MOBILE}>
                        <div id={styles.BOUGHT_IMAGE_MOBILE}>
                          {['A', 'B', 'C'].map((suffix, index) => (
                            <div key={suffix} className="rounded-lg" id={styles[`SALES_IMAGE_${suffix}`]}>
                              <Image
                                alt={`${product.title} related mobile image ${index + 1}`}
                                key={`${product._id}-mobile-${suffix}`}
                                width={500}
                                height={500}
                                src={product.images[index % product.images.length] || '/images/placeholder.jpg'}
                                style={{
                                  position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                }}
                                onError={() => console.log(`Mobile image failed to load for ${product.title}: ${product.images[index % product.images.length] || '/images/placeholder.jpg'}`)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div id={styles.PRODUCT_DESCRIPTION}>
                      <div id={styles.P_TITLE}>
                        <h2 id={styles._H2} className="text-4xl text-stone-700 font-avant_garde_bold">
                          Product Description
                        </h2>
                      </div>
                      <div id={styles.P_SUBTITLE}>
                        <h3 id={styles._H3} className="text-stone-700 font-avant_garde_bold">
                          {parse(product.subtitle)}
                          <br />
                          <span className="text-stone-700 font-avant_garde_bold">
                            Automated systems for Architects, Designers and Manufacturers.
                          </span>{' '}
                          Gain valuable insights, streamline your business, be more{' '}
                          <span className="text-stone-700 font-avant_garde_bold">profitable</span>, be more{' '}
                          <span className="text-stone-700 font-avant_garde_bold">sustainable</span>
                        </h3>
                      </div>
                      <div id={styles.P_DESCRIPTION}>
                        <p id={styles._H3} className="text-base text-stone-700 font-geist_regular">
                          {parse(product.description)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ))}
        </>
      )}

      <Subfooter_White />
      <Footer />
    </>
  );
};

export default Products;