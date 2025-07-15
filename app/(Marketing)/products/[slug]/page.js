'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
import handleCheckout from '@/components/Payment/payment';
import ApplePayButton from '@/components/Payment/ApplePayButton';
import PayPalButton from '@/components/Payment/PayPalButton';
import { CartContext } from '@/components/Context/CartContext';
import { useContext } from 'react';





const ProductDetailpage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [licenseType, setLicenseType] = useState('commercial');
const { addToCart } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/products', { cache: 'no-store' });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to fetch products');
        }
        const data = await res.json();
        const fetchedProducts = Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [];

        const foundProduct = fetchedProducts.find(p => p.slug === slug);

        if (!foundProduct) {
          throw new Error('Product not found');
        }

        const formattedProduct = {
          _id: foundProduct._id || '',
          product_id: foundProduct.product_id || 'Unknown',
          image: Array.isArray(foundProduct.images) && foundProduct.images.length > 0
            ? foundProduct.images[0]
            : '/images/placeholder.jpg',
          images: Array.isArray(foundProduct.images) && foundProduct.images.length > 0
            ? foundProduct.images
            : ['/images/placeholder.jpg'],
          title: foundProduct.title || 'Untitled Product',
          subtitle: foundProduct.short_description || 'No description available',
          description: foundProduct.description || 'No detailed description available.',
          commercial_price: foundProduct.commercial_price || 0,
          student_price: foundProduct.student_price || 0,
          category: foundProduct.category || 'General',
          slug: foundProduct.slug || foundProduct._id || '',
        };

        setProduct(formattedProduct);

        const related = fetchedProducts
          .filter(p => p._id !== foundProduct._id && p.category === foundProduct.category)
          .slice(0, 3)
          .map(p => ({
            _id: p._id || '',
            image: Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : '/images/placeholder.jpg',
            title: p.title || 'Untitled Product',
            slug: p.slug || p._id || '',
          }));

        setRelatedProducts(related);
      } catch (error) {
        console.error('Fetch product error:', error);
        toast.error(error.message || 'Failed to load product. Please try again.');
        router.push('/products');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug, router]);

  const handleLicenseChange = (value) => {
    setLicenseType(value);
  };

  const currentPrice = licenseType === 'commercial'
    ? product?.commercial_price
    : product?.student_price;

  if (loading) {
    return (
      <>
        <Menu_White />
        <Header_White />
        <Sides />
        <Services_1 />
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
        </div>
        <Subfooter_White />
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Menu_White />
        <Header_White />
        <Sides />
        <Services_1 />
        <section className={styles.center_holder}>
          <p className="text-gray-500 text-center">Product not found</p>
        </section>
        <Subfooter_White />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Menu_White />
      <Header_White />
      <Sides />
      <Services_1 />

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
                </div>

                <div id={styles.SALES_IMAGE_2}>
                  <div id={styles.SALES_IMAGE_3}>
                    {product.images.slice(0, 5).map((image, index) => (
                      <div key={`image-${index}`} className="rounded-lg" id={styles[`SALES_IMAGE_${String.fromCharCode(86 + index)}`]}>
                        <Image
                          alt={`${product.title} image ${index + 1}`}
                          key={`${product._id}-image-${index}`}
                          width={500}
                          height={500}
                          src={image || '/images/placeholder.jpg'}
                          style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                          onError={() => console.log(`Image failed to load for ${product.title}: ${image || '/images/placeholder.jpg'}`)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div id={styles.SALES_CHECKOUT_HOLDER}>
                <div style={{ position: 'relative', gridArea: 'C1' }}>
                  <h2 id={styles._H2} className="text-stone-700 font-avant_garde_bold" style={{ marginBottom: '0px' }}>
                    {parse(product.title)}
                  </h2>
                </div>

                <div id={styles.SLUG} style={{ position: 'relative', gridArea: 'SLUG' }}>
                  <h3 className="text-md text-stone-700 font-geist_regular" style={{ marginBottom: '0px' }}>
                    {parse(product.subtitle)}
                  </h3>
                </div>

                <div style={{ position: 'relative', gridArea: 'C2' }}>
                  <h3 className="text-md text-stone-700 font-geist_semibold" style={{ marginBottom: '0px' }}>
                    ${currentPrice?.toFixed(2)}{' '}
                    <span className="text-md text-stone-700 font-geist_regular">Tax included.</span>
                  </h3>
                </div>

                <div id={styles.C3}>
                  <h3 className="text-md text-stone-700 font-geist_semibold" style={{ marginBottom: '0px' }}>
                    License Type
                  </h3>
                  <br />
                  <Tabs
                    value={licenseType}
                    onValueChange={handleLicenseChange}
                    className="w-[400px]"
                  >
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
                      <Button
                        onClick={() => {
                          addToCart({
                            _id: product._id,
                            title: product.title,
                            price: licenseType === 'commercial' ? product.commercial_price : product.student_price,
                            image: product.image,
                          });
                          toast.success(' Product added to cart!');
                        }}
                        style={{ width: '100%', height: '100%' }}
                      >
                        Add To Cart
                      </Button>
                    </div>
                    <div id={styles.STRIPE}>
                      <Button
                        variant="secondary"
                        className="border border-solid rounded-md border-stone-800"
                        style={{ width: '100%', height: '100%' }}
                        onClick={() => {
                          handleCheckout({
                            products: [{
                              title: product.title,
                              price: currentPrice,
                              image: product.image,
                              quantity: 1
                            }],
                            currency: 'USD',
                          });
                        }}
                      >
                        Buy with Stripe
                      </Button>
                    </div>
                    <div id={styles.APPLE_PAY}>
                      <ApplePayButton
                        amount={currentPrice}
                        currency="USD"
                        product={{
                          title: product.title,
                          price: currentPrice,
                          image: product.image,
                          quantity: 1
                        }}
                        onError={(error) => {
                          toast.error(error || 'Apple Pay payment failed');
                        }}
                      />
                    </div>
                    <div id={styles.PAYPAL}>
                      <PayPalButton
                        amount={currentPrice}
                        products={[{
                          title: product.title,
                          price: currentPrice,
                          image: product.image,
                          quantity: 1
                        }]}
                        currency="USD"
                      />
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
              {relatedProducts.length > 0 && (
                <div id={styles.BOUGHT_TOGETHER_BLOCK}>
                  <div id={styles.BOUGHT_TITLE_HOLDER}>
                    <h2 id={styles._H2} className="text-4xl text-stone-700 font-avant_garde_bold">
                      Frequently Bought Together
                    </h2>
                  </div>
                  <div id={styles.BOUGHT_IMAGE_HOLDER}>
                    {relatedProducts.map((relatedProduct, index) => (
                      <Link key={relatedProduct._id} href={`/products/${relatedProduct.slug}`}>
                        <div className="rounded-lg" id={styles[`SALES_IMAGE_${String.fromCharCode(65 + index)}`]}>
                          <Image
                            alt={relatedProduct.title || 'Related product'}
                            width={500}
                            height={500}
                            src={relatedProduct.image}
                            style={{
                              position: 'absolute',
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                            onError={() => console.log(`Related image failed to load: ${relatedProduct.image}`)}
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

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

      <Subfooter_White />
      <Footer />
    </>
  );
};

export default ProductDetailpage;