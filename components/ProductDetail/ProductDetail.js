'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import parse from 'html-react-parser';
import Menu from '../Menu/menu';
import Sides from '../Sides/sides';
import Header from '../Header/Header';
import Subfooter from '../Subfooter2/subfooter2';
import Footer from '../Footer/Footer';
import Subscribetop from '../Subscribetop/subscribetop';
import CheckoutButton from '../Payment/checkoutButton';
import styles from './ProductDetail.module.css';

const ProductDetail = ({ slug }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLicense, setSelectedLicense] = useState('student');
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${slug}`, { cache: 'no-store' });
        if (!res.ok) {
          if (res.status === 404) {
            router.push('/products');
            return;
          }
          throw new Error('Failed to fetch product');
        }
        const data = await res.json();
        if (data.success) {
          setProduct(data.product);
        } else {
          throw new Error(data.message || 'Failed to fetch product');
        }
      } catch (err) {
        toast.error(err.message);
        router.push('/products');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug, router]);

  const handleAddToCart = async () => {
    try {
      const cartItem = {
        id: product._id,
        title: product.title,
        price: selectedLicense === 'student' ? product.student_price : product.commercial_price,
        image: product.images[0],
        quantity: quantity,
        license_type: selectedLicense
      };

      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(cartItem),
      });

      if (response.status === 401) {
        toast.error('Please sign in to add items to cart');
        router.push('/signin');
        return;
      }

      if (response.ok) {
        toast.success('Added to cart successfully!');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to add to cart');
      }
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const handleBuyNow = async () => {
    try {
      const productForPayment = {
        id: product._id,
        title: product.title,
        price: selectedLicense === 'student' ? product.student_price : product.commercial_price,
        image: product.images[0],
        quantity: quantity,
        license_type: selectedLicense
      };

      const response = await fetch('/api/payment_route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          products: [productForPayment],
          currency: 'USD'
        }),
      });

      if (response.status === 401) {
        toast.error('Please sign in to make a purchase');
        router.push('/signin');
        return;
      }

      if (response.ok) {
        const session = await response.json();
        const stripe = await import('@stripe/stripe-js').then(m => m.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY));
        const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
        if (error) {
          toast.error('Payment redirect failed');
        }
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to create payment session');
      }
    } catch (error) {
      toast.error('Failed to process payment');
    }
  };

  if (loading) {
    return (
      <>
        <Menu />
        <Header />
        <Sides />
        <Subscribetop />
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
        </div>
        <Subfooter />
        <Footer />
      </>
    );
  }

  if (!product) {
    return null;
  }

  const currentPrice = selectedLicense === 'student' ? product.student_price : product.commercial_price;
  const totalAmount = currentPrice * quantity;

  return (
    <>
      <Menu />
      <Header />
      <Sides />
      <Subscribetop />
      
      <section className={styles.center_holder}>
        <div className={styles.grid_0_product}>
          <div className={styles.product_detail}>
            <div className={styles.product_images}>
              <div className={styles.main_image}>
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className={styles.image}
                />
              </div>
              {product.images.length > 1 && (
                <div className={styles.thumbnail_images}>
                  {product.images.slice(1, 4).map((image, index) => (
                    <div key={index} className={styles.thumbnail}>
                      <Image
                        src={image}
                        alt={`${product.title} ${index + 2}`}
                        fill
                        className={styles.thumbnail_image}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className={styles.product_info}>
              <h1 className={styles.title}>{parse(product.title)}</h1>
              <p className={styles.short_description}>{parse(product.short_description)}</p>
              
              <div className={styles.license_selection}>
                <h3>Select License Type:</h3>
                <div className={styles.license_options}>
                  <label className={styles.license_option}>
                    <input
                      type="radio"
                      name="license"
                      value="student"
                      checked={selectedLicense === 'student'}
                      onChange={(e) => setSelectedLicense(e.target.value)}
                    />
                    <span className={styles.license_label}>
                      Student License - ${product.student_price}
                    </span>
                  </label>
                  <label className={styles.license_option}>
                    <input
                      type="radio"
                      name="license"
                      value="commercial"
                      checked={selectedLicense === 'commercial'}
                      onChange={(e) => setSelectedLicense(e.target.value)}
                    />
                    <span className={styles.license_label}>
                      Commercial License - ${product.commercial_price}
                    </span>
                  </label>
                </div>
              </div>
              
              <div className={styles.quantity_selection}>
                <label htmlFor="quantity">Quantity:</label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className={styles.quantity_select}
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              
              <div className={styles.price_display}>
                <span className={styles.price_label}>Total Price:</span>
                <span className={styles.price_amount}>${totalAmount.toFixed(2)}</span>
              </div>
              
              <div className={styles.action_buttons}>
                <button
                  onClick={handleAddToCart}
                  className={styles.add_to_cart_btn}
                >
                  Add to Cart
                </button>
                
                <CheckoutButton
                  amount={totalAmount}
                  currency="USD"
                  product={{
                    id: product._id,
                    title: product.title,
                    price: currentPrice,
                    image: product.images[0],
                    quantity: quantity,
                    license_type: selectedLicense
                  }}
                />
              </div>
              
              <div className={styles.description}>
                <h3>Description</h3>
                <div className={styles.description_content}>
                  {parse(product.description)}
                </div>
              </div>
              
              {product.tags && (
                <div className={styles.tags}>
                  <h3>Tags</h3>
                  <div className={styles.tag_list}>
                    {product.tags.split(',').map((tag, index) => (
                      <span key={index} className={styles.tag}>
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Subfooter />
      <Footer />
    </>
  );
};

export default ProductDetail; 