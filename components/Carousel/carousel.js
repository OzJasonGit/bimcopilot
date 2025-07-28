"use client";

import React, { Component, useState } from "react";
import styles from "./carousel.module.css";

import Image from "next/image";
import perkinsWill from "./Bim-copilot-logo_Mobile_2.png";

import { Carousel } from "antd";

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const Carousels = () => {

    return (
        <>
            <Carousel
                autoplay={true}
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                }}
            >
                <div class={styles.SLIDE_CONTAINER}>
                    <div class={styles.SLIDE_1}>
                        <div id={styles.HOLDER_1}>
                            <Image
                                src={perkinsWill}
                                alt="Picture of the author"
                                width={500}
                                height={500}
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                style={{
                                    gridArea: "MAIN",
                                    position: "relative",
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />

                        </div>

                    </div>
                </div>


                <div class={styles.SLIDE_1}>
                    <div id={styles.HOLDER_2}>
                        <Image
                            src={perkinsWill}
                            alt="Picture of the author"
                            width={500}
                            height={500}
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                            style={{
                                gridArea: "MAIN",
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />

                    </div>




                </div>



                <div class={styles.SLIDE_3}>

                    <div id={styles.HOLDER_3}>
                        <Image
                            src={perkinsWill}
                            alt="Picture of the author"
                            width={500}
                            height={500}
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                            style={{
                                gridArea: "MAIN",
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />

                    </div>


                </div>
            </Carousel>


        </>
    )
}


export default Carousels;
