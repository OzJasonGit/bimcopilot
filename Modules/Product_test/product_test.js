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

import logo from './bimcopilot_logo_white.svg';
import text_logo from './bimcopilot_logo_text_horizontal_white.svg';

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
                      
                      <div id={styles.ROW_1} key={product.id} className={styles.card}>


                        <Link href={`/products/${product.slug}`}
                              className="group overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 shadow-none hover:shadow-xl"
                              style={{ position: "relative", width: "100%", height: "auto" }}>

                          <div id={styles.imageWrapper} className=" transition-transform duration-500 ease-in-out transform-gpu origin-center scale-110 group-hover:scale-100 ">
                            <Image
                              src={product.image}
                              alt={product.title}
                              fill
                              className={styles.image}
                            />
                          </div>

                          {/* Dark overlay */}
                          <div className="absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100 " />

                          {/* Icons */}
                          <div id={styles.PRODUCT_OVERLAY_GRID} style={{ position: "absolute", width: "100%", height: "100%",  left: "0px", top:"0px", zIndex:"30"}}>
                            <div style={{ gridArea: "LOGO", position: "relative", zIndex: 100}} className=" opacity-0 -translate-x-10 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                              <Image src={logo} alt="Logo" fill style={{ objectFit: "cover" }} quality={100} loading="lazy" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==" />
                            </div>
                            <div style={{ gridArea: "TEXT", position: "relative", zIndex: 100}} className=" opacity-0  translate-x-10 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" >
                              <Image src={text_logo} alt="Logo Text" fill style={{ objectFit: "cover" }} quality={100} loading="lazy" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==" />
                            </div> 
                            <div style={{ gridArea: "TITLE", position: "relative", zIndex: 100}}>
                              <h3  id={styles._H2}  className="text-center text-stone-50 font-avant_garde_bold opacity-0 translate-y-10 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">{parse(product.title)}</h3>
                            </div>   
                          </div>
                        </Link>

                        <div className={styles.text}>
                          <h2 id={styles._H2} className={styles.title} class=" text-stone-200 ... font-avant_garde_bold ...">{parse(product.title)} </h2>
                          <p id={styles._H3} className={styles.subtitle} class=" text-stone-200 ... font-avant_garde_medium ...">{parse(product.subtitle)}</p>
                        </div>
                      </div>
                    ))}






                    {/* Row 2: Small + Large (aligned left or right) */}
                    {group.length >= 5 && (
                      <>
                        {isEvenGroup ? (
                          <>
                            <div id={styles.ROW_2}  key={group[3].id} className={styles.card}>
                              <Link href={`/products/${group[3].slug}`}
                                    className="group overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 shadow-none hover:shadow-xl"
                                    style={{ position: "relative", width: "100%", height: "auto" }}>

                                <div id={styles.imageWrapper} className=" transition-transform duration-500 ease-in-out transform-gpu origin-center scale-110 group-hover:scale-100 ">
                                  <Image
                                    src={group[3].image}
                                    alt={group[3].title}
                                    fill
                                    className={styles.image}
                                  />
                                </div>

                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100 " /> 


                                {/* Icons */}
                                <div id={styles.PRODUCT_OVERLAY_GRID} style={{ position: "absolute", width: "100%", height: "100%",  left: "0px", top:"0px", zIndex:"30"}}>
                                  <div style={{ gridArea: "LOGO", position: "relative", zIndex: 100}} className=" opacity-0 -translate-x-10 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                                    <Image src={logo} alt="Logo" fill style={{ objectFit: "cover" }} quality={100} loading="lazy" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==" />
                                  </div>
                                  <div style={{ gridArea: "TEXT", position: "relative", zIndex: 100}} className=" opacity-0  translate-x-10 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" >
                                    <Image src={text_logo} alt="Logo Text" fill style={{ objectFit: "cover" }} quality={100} loading="lazy" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==" />
                                  </div> 
                                  <div style={{ gridArea: "TITLE", position: "relative", zIndex: 100}}>
                                    <h3  id={styles._H2}  className="text-center text-stone-50 font-avant_garde_bold opacity-0 translate-y-10 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">{parse(group[3].title)} </h3>
                                  </div>   
                                </div>

                              </Link>
                              <div className={styles.text}>
                                <h2 id={styles._H2} className={styles.title} class=" text-stone-200 ... font-avant_garde_bold ...">{parse(group[3].title)}</h2>
                                <p id={styles._H3} className={styles.subtitle} class=" text-stone-200 ... font-avant_garde_medium ...">{parse(group[3].subtitle)}</p>
                              </div>
                            </div>

                            <div key={group[4].id} className={`${styles.card} ${styles.cardLarge} ${styles.cardRight}`}>
                              <Link href={`/products/${group[4].slug}`}
                                    className="group overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 shadow-none hover:shadow-xl"
                                    style={{ position: "relative", width: "100%", height: "auto" }}>

                                <div id={styles.imageWrapper} className=" transition-transform duration-500 ease-in-out transform-gpu origin-center scale-110 group-hover:scale-100 ">
                                  <Image
                                    src={group[4].image}
                                    alt={group[4].title}
                                    fill
                                    className={styles.image}
                                  />
                                </div>

                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100 " /> 

                                {/* Icons */}
                                <div id={styles.PRODUCT_OVERLAY_GRID} style={{ position: "absolute", width: "100%", height: "100%",  left: "0px", top:"0px", zIndex:"30"}}>
                                  <div style={{ gridArea: "LOGO", position: "relative", zIndex: 100}} className=" opacity-0 -translate-x-10 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                                    <Image src={logo} alt="Logo" fill style={{ objectFit: "cover" }} quality={100} loading="lazy" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==" />
                                  </div>
                                  <div style={{ gridArea: "TEXT", position: "relative", zIndex: 100}} className=" opacity-0  translate-x-10 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" >
                                    <Image src={text_logo} alt="Logo Text" fill style={{ objectFit: "cover" }} quality={100} loading="lazy" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==" />
                                  </div> 
                                  <div style={{ gridArea: "TITLE", position: "relative", zIndex: 100}}>
                                    <h3  id={styles._H2}  className="text-center text-stone-50 font-avant_garde_bold opacity-0 translate-y-10 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">{parse(group[4].title)}</h3>
                                  </div>   
                                </div>

                              </Link>
                              <div className={styles.text}>
                                <h2 id={styles._H2} className={styles.title} class=" text-stone-200 ... font-avant_garde_bold ...">{parse(group[4].title)}</h2>
                                <p id={styles._H3} className={styles.subtitle} class=" text-stone-200 ... font-avant_garde_medium ...">{parse(group[4].subtitle)}</p>
                              </div>
                            </div>
                          </>
                          
                        ) : (




















                          <>
                            <div key={group[4].id} className={`${styles.card} ${styles.cardLarge} ${styles.cardLeft}`}>
                              <Link href={`/products/${group[4].slug}`}
                                    className="group overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 shadow-none hover:shadow-xl"
                                    style={{ position: "relative", width: "100%", height: "auto" }}>

                                <div id={styles.imageWrapper} className="transition-transform duration-500 ease-in-out transform-gpu origin-center scale-110 group-hover:scale-100 ">
                                  <Image
                                    src={group[4].image}
                                    alt={group[4].title}
                                    fill
                                    className={styles.image}
                                  />
                                </div>

                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100 " /> 

                                {/* Icons */}
                                <div id={styles.PRODUCT_OVERLAY_GRID} style={{ position: "absolute", width: "100%", height: "100%",  left: "0px", top:"0px", zIndex:"30"}}>
                                  <div style={{ gridArea: "LOGO", position: "relative", zIndex: 100}} className=" opacity-0 -translate-x-10 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                                    <Image src={logo} alt="Logo" fill style={{ objectFit: "cover" }} quality={100} loading="lazy" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==" />
                                  </div>
                                  <div style={{ gridArea: "TEXT", position: "relative", zIndex: 100}} className=" opacity-0  translate-x-10 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" >
                                    <Image src={text_logo} alt="Logo Text" fill style={{ objectFit: "cover" }} quality={100} loading="lazy" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==" />
                                  </div> 
                                  <div style={{ gridArea: "TITLE", position: "relative", zIndex: 100}}>
                                    <h3  id={styles._H2}  className="text-center text-stone-50 font-avant_garde_bold opacity-0 translate-y-10 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">{parse(group[4].title)} </h3>
                                  </div>   
                                </div>

                              </Link>
                              <div className={styles.text}>
                                <h2 id={styles._H2} className={styles.title} class=" text-stone-200 ... font-avant_garde_bold ...">{parse(group[4].title)}</h2>
                                <p id={styles._H3} className={styles.subtitle} class=" text-stone-200 ... font-avant_garde_medium ...">{parse(group[4].subtitle)}</p>
                              </div>
                            </div>








                            <div key={group[3].id} className={styles.card}>
                              <Link href={`/products/${group[3].slug}`}
                                  className="group overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 shadow-none hover:shadow-xl"
                                  style={{ position: "relative", width: "100%", height: "auto" }}>

                                  {/* Image wrapper */}
                                  <div id={styles.imageWrapper} className=" transition-transform duration-500 ease-in-out transform-gpu origin-center scale-110 group-hover:scale-100 ">
                                    <Image
                                      src={group[3].image}
                                      alt={group[3].title}
                                      fill
                                      className={styles.image}
                                    />
                                  </div>

                                  {/* Dark overlay */}
                                  <div className="absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100 " />

                                  {/* Icons */}
                                  <div id={styles.PRODUCT_OVERLAY_GRID} style={{ position: "absolute", width: "100%", height: "100%",  left: "0px", top:"0px", zIndex:"30"}}>
                                    <div style={{ gridArea: "LOGO", position: "relative", zIndex: 100}} className=" opacity-0 -translate-x-10 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                                      <Image src={logo} alt="Logo" fill style={{ objectFit: "cover" }} quality={100} loading="lazy" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==" />
                                    </div>
                                    <div style={{ gridArea: "TEXT", position: "relative", zIndex: 100}} className=" opacity-0  translate-x-10 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" >
                                      <Image src={text_logo} alt="Logo Text" fill style={{ objectFit: "cover" }} quality={100} loading="lazy" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==" />
                                    </div> 
                                    <div style={{ gridArea: "TITLE", position: "relative", zIndex: 100}}>
                                      <h3  id={styles._H2}  className="text-center text-stone-50 font-avant_garde_bold opacity-0 translate-y-10 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">{parse(group[3].title)} </h3>
                                    </div>   
                                  </div>

                              </Link>
                              <div className={styles.text}>
                                <h2 className={styles.title} class=" text-stone-200 ... font-avant_garde_bold ...">{parse(group[3].title)}</h2>
                                <p className={styles.subtitle} class=" text-stone-200 ... font-avant_garde_medium ...">{parse(group[3].subtitle)}</p>
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
