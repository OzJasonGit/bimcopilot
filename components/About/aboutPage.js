import styles from './about.module.css'
import React, { Component } from 'react';
import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import SkeletonLoader from '../Loader/loader';
import Infinite_Scroll from "../Carousel/Infinite_Scroll";
import Tab from "../Tabs/tabs";




export default class Aboutpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iframeLoaded: false,
    };
  }

  handleIframeLoad = () => {
    this.setState({ iframeLoaded: true });
  };

  render() {
    const { iframeLoaded } = this.state;
    // Use iframeLoaded here

    return (

      <section id={styles.SHADOW_SECTION_BLACK} class={styles.center_holder}>
        <div class={styles.grid_0}>
          <div class={styles.main}>
            <div id={styles.INTRO_HOLDER}>


              <div id={styles.INTRO}>
                <h2
                  id={styles._H2}
                  class=" text-stone-200 ... drop-shadow-xl ...  font-avant_garde_bold">
                  We help businesses harness BIM and AI for speed, profit and
                  sustainable success.
                </h2>

                <br />
                <h3
                  id={styles._H3}
                  class="text-xl ... text-stone-400 ... drop-shadow-xl ... font-avant_garde_bold">
                  Find out how we can help your business build{" "}
                  <a class="text-stone-200 ... font-avant_garde_bold">
                    systems
                  </a>{" "}
                  for{" "}
                  <a class="text-stone-200 ... font-avant_garde_bold">
                    automation,
                  </a>{" "}
                  <a class="text-stone-200 ... font-avant_garde_bold">
                    sustainability,
                  </a>{" "}
                  <a class="text-stone-200 ... font-avant_garde_bold">profit</a>{" "}
                  and{" "}
                  <a class="text-stone-200 ... font-avant_garde_bold">
                    growth.
                  </a>
                </h3>
              </div>

              <div class="rounded-2xl ... shadow-2xl ... " id={styles.IMAGE} style={{ backgroundColor: "#151515" }} >
                {!iframeLoaded && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#fff",
                      zIndex: 1,
                    }}
                  >
                    <SkeletonLoader/>
                  </div>
                )}
                {/* <iframe
                  loading='lazy'
                  onLoad={this.handleIframeLoad}
                  src="https://speckle.xyz/embed?stream=8c614e6658&commit=31247f8195&transparent=true&autoload=true&hidecontrols=true&hidesidebar=true&hideselectioninfo=true&commentslideshow=true"
                  width="100%" height="100%" frameborder="0">
                </iframe> */}
                <iframe 
                title="Speckle"
                onLoad={this.handleIframeLoad}
                src="https://app.speckle.systems/projects/d719234282/models/7eb698fe88#embed=%7B%22isEnabled%22%3Atrue%2C%22isTransparent%22%3Atrue%2C%22hideControls%22%3Atrue%2C%22hideSelectionInfo%22%3Atrue%7D"
                width="100%" height="110%" frameborder="0">
                </iframe>
              </div>
              
            </div>

            <div id={styles.ABOUT_HOLDER}>
              <div
                class="rounded-2xl ... bg-neutral-900 ... shadow-2xl shadow-black "
                id={styles.ABOUT_CONTAINER}
              >
                <div id={styles.ABOUT_OVERFLOW}>
                  <div class="rounded-2xl ... " id={styles.ABOUT}>
                    <div id={styles.ABOUT_TEXT_HOLDER}>
                      <div id={styles.ABOUT_TEXT}>
                        <div id={styles.ABOUT_TITLE_HOLDER}>
                          <h1
                            id={styles._H1}
                            class=" text-stone-200 ... drop-shadow-xl font-avant_garde_bold ... text-center ..."
                          >
                            <a>About</a>
                          </h1>
                        </div>

                        <div
                          class="content-center ..."
                          id={styles.MY_FACE_HOLDER}
                        >
                          <div
                            id={styles.MY_FACE}
                            class=" border-8 border-stone-200 ... rounded-full ..."
                          >
                            <Image></Image>
                          </div>
                        </div>

                        <h2
                          id={styles._H2}
                          class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold"
                        >
                          I'm Oz Jason. A registered architect and BIM
                          manager from the UK. I'm also the founder of{" "}
                          <a class="text-yellow-200 ...">bimcopilot.com</a>.
                          <br /> <br /> However, titles are becoming less important.
                          What matters is how we can help you and your business.
                          <br /> <br />
                          We can help you a lot.
                        </h2>
                        <br />
                        <p class="text-base ... text-stone-400 ... drop-shadow-xl font-avant_garde_bold"
                          id={styles._H3}>
                          At{" "}
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            bimcopilot.com
                          </a>{" "}
                          we're using Building Information modelling
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            [BIM]
                          </a>{" "}
                          and artificial intelligence
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            [AI]
                          </a>{" "}
                          to develop{" "}
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            systems
                          </a>{" "}
                          that
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            automate
                          </a>{" "}
                          tasks,{" "}
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            50x output
                          </a>{" "}
                          and
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            eliminate human errors
                          </a>{" "}
                          that result in
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            waste.{" "}
                          </a>
                          <br />
                          <br />
                          My focus and passion has always been in preserving the
                          natural world and
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            bimcopilot.com{" "}
                          </a>
                          continues to champion these values of
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            sustainability
                          </a>{" "}
                          and
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            <br />
                            waste-reduction
                          </a>
                          . We believe that
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            bigger profits
                          </a>{" "}
                          come from
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            better systems
                          </a>
                          , that
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            save time
                          </a>
                          ,
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            reduce waste
                          </a>{" "}
                          and
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            improve accuracy
                          </a>
                          . Here, we are choosing to be unafraid to challenge
                          redundant ideas, that only hold us back.
                          <br />
                          <br />
                          The future lies somewhere between
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            low-tech
                          </a>{" "}
                          solutions and
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            advanced technology
                          </a>
                          .
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            bimcopilot.com
                          </a>
                          , aims to explore where this leads.
                          <br />
                          <br />
                          Learn more about our values from our parent company,
                          <br />
                          <br />
                          <a class="text-emerald-200 drop-shadow-xl font-avant_garde_bold text-lg ...">
                            {" "}
                            <Link href="/">plasticfreebydesign.com</Link>
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id={styles.WHO_WE_WORK_WITH_HOLDER}>
              <div>
                <h2
                  id={styles._H1}
                  class="text-left ...  text-stone-400 ...  drop-shadow-xl ... font-avant_garde_bold">
                  Who We Work With
                </h2>
              </div>
              <div id={styles.CAROUSEL_HOLDER}>
                <div id={styles.CAROUSEL}>
                  <Infinite_Scroll />
                </div>
              </div>
            </div>

            <div id={styles.TESTIMONIALS}>
              <div id={styles.TESTIMONIALS_TITLE}>
                <h2
                  id={styles._H1}
                  class="text-right ... text-stone-400 ...  drop-shadow-xl font-avant_garde_bold"
                >
                  Testimonials
                </h2>
              </div>

              <div id={styles.TESTIMONIAL_AREA}>
                <div id={styles.T_CONTAINER}>
                  <Tab />
                  {/* <Tab_Horizontal /> */}
                  {/*<Tab_M/>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>





    )
  }
}

