import styles from './about.module.css';
import React, { Component } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SkeletonLoader from '../Loader/loader';
import Infinite_Scroll from '../Carousel/Infinite_Scroll';
import Tab from '../Tabs/tabs';

import Oz_Jason from "./Oz_Jason_Trimmed.png";
    

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
    const { firstStory } = this.props; // Destructure firstStory from props

    return (
      <section id={styles.SHADOW_SECTION_BLACK} className={styles.center_holder}>
        <div className={styles.grid_0}>
          <div className={styles.main}>
            <div id={styles.INTRO_HOLDER}>
              <div id={styles.INTRO}>
                <h2
                  id={styles._H2}
                  className="text-stone-200 drop-shadow-xl font-avant_garde_bold"
                >
                  We help businesses harness BIM and AI for speed, profit and
                  sustainable success.
                </h2>
                <br />
                <h3
                  id={styles._H3}
                  className="text-xl text-stone-400 drop-shadow-xl font-avant_garde_medium"
                >
                  Find out how we can help your business build{' '}
                  <a className="text-stone-200 font-avant_garde_bold">systems</a>{' '}
                  for{' '}
                  <a className="text-stone-200 font-avant_garde_bold">
                    automation,
                  </a>{' '}
                  <a className="text-stone-200 font-avant_garde_bold">
                    sustainability,
                  </a>{' '}
                  <a className="text-stone-200 font-avant_garde_bold">profit</a>{' '}
                  and{' '}
                  <a className="text-stone-200 font-avant_garde_bold">growth.</a>
                </h3>
              </div>

              <div
                className="rounded-2xl shadow-2xl"
                id={styles.IMAGE}
                style={{ backgroundColor: '#151515' }}
              >
                {!iframeLoaded && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      zIndex: 1,
                    }}
                  >
                    <SkeletonLoader />
                  </div>
                )}
                <iframe
                  title="Speckle"
                  onLoad={this.handleIframeLoad}
                  src="https://app.speckle.systems/projects/d719234282/models/7eb698fe88#embed=%7B%22isEnabled%22%3Atrue%2C%22isTransparent%22%3Atrue%2C%22hideControls%22%3Atrue%2C%22hideSelectionInfo%22%3Atrue%7D"
                  width="100%"
                  height="110%"
                  frameBorder="0"
                ></iframe>
              </div>
            </div>

            <div id={styles.ABOUT_HOLDER}>
              <div
                className="rounded-2xl bg-neutral-900 shadow-2xl shadow-black"
                id={styles.ABOUT_CONTAINER}>
                <div id={styles.ABOUT_OVERFLOW}>
                  <div className="rounded-2xl" id={styles.ABOUT}>
                    <div id={styles.ABOUT_TEXT_HOLDER}>
                      <div id={styles.ABOUT_TEXT}>
                        <div id={styles.ABOUT_TITLE_HOLDER}>
                          <h1
                            id={styles._H1}
                            className="text-stone-200 drop-shadow-xl font-avant_garde_bold text-center"
                          >
                            <a>About</a>
                          </h1>
                        </div>

                        <div className="content-center ... rounded-full ... overflow-hidden ..." id={styles.MY_FACE_HOLDER}>
                          <div
                            id={styles.MY_FACE}
                            
                          >
                            {firstStory && ( // Check if firstStory exists
                              <Image
                                alt="Story Image"
                                key={firstStory._id}
                                width={500}
                                height={500}
                                src={Oz_Jason}
                                style={{
                                  position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                }}
                              />
                            )}
                          </div>
                        </div>

                        <h2
                          id={styles._H2}
                          className="text-stone-200 drop-shadow-xl font-avant_garde_bold"
                        >
                          I'm Oz Jason. A registered architect and BIM manager from
                          the UK. I'm also the founder of{' '}
                          <a className="text-yellow-200">bimcopilot.com</a>.
                          <br /> <br /> However, titles are becoming less important.
                          What matters is how we can help you and your business.
                          <br /> <br />
                          We can help you a lot.
                        </h2>
                        <br />
                        <p
                          className="text-base text-stone-400 drop-shadow-xl font-avant_garde_medium"
                          id={styles._H3}
                        >
                          At{' '}
                          <a className="text-stone-200 drop-shadow-xl font-avant_garde_medium">
                            bimcopilot.com
                          </a>{' '}
                          we're using Building Information modelling{' '}
                          <a className="text-stone-200 drop-shadow-xl font-avant_garde_medium">
                            [BIM]
                          </a>{' '}
                          and artificial intelligence{' '}
                          <a className="text-stone-200 drop-shadow-xl font-avant_garde_medium">
                            [AI]
                          </a>{' '}
                          to develop{' '}
                          <a className="text-stone-200 drop-shadow-xl font-avant_garde_medium">
                            systems
                          </a>{' '}
                          that{' '}
                          <a className="text-stone-200 drop-shadow-xl font-avant_garde_medium">
                            automate
                          </a>{' '}
                          tasks,{' '}
                          <a className="text-stone-200 drop-shadow-xl font-avant_garde_medium">
                            50x output
                          </a>{' '}
                          and{' '}
                          <a className="text-stone-200 drop-shadow-xl font-avant_garde_medium">
                            eliminate human errors
                          </a>{' '}
                          that result in{' '}
                          <a className="text-stone-200 drop-shadow-xl font-avant_garde_medium">
                            waste.
                          </a>
                          <br />
                          <br />
                          My focus and passion has always been in preserving the
                          natural world and{' '}
                          <a className="text-stone-200 drop-shadow-xl font-avant_garde_medium">
                            bimcopilot.com
                          </a>{' '}
                          continues to champion these values of{' '}
                          <a className="text-stone-200 drop-shadow-xl font-avant_garde_medium">
                            sustainability
                          </a>{' '}
                          and{' '}
                          <a className="text-stone-200 drop-shadow-xl font-avant_garde_medium">
                            waste-reduction
                          </a>
                          . We believe that{' '}
                          <a className="text-stone-200 drop-shadow-xl font-avant_garde_medium">
                            bigger profits
                          </a>{' '}
                          come from{' '}
                          <a className="text-stone-200 drop-shadow-xl font-avant_garde_medium">
                            better systems
                          </a>
                          , that{' '}
                          <a className="text-stone-200 drop-shadow-xl font-avant_garde_medium">
                            save time
                          </a>
                          ,{' '}
                          <a className="text-stone-200 drop-shadow-xl font-avant_garde_medium">
                            reduce waste
                          </a>{' '}
                          and{' '}
                          <a className="text-stone-200 drop-shadow-xl font-avant_garde_medium">
                            improve accuracy
                          </a>
                          . Here, we are choosing to be unafraid to challenge
                          redundant ideas, that only hold us back.
                          <br />
                          <br />
                          The future lies somewhere between{' '}
                          <a className="text-stone-200 drop-shadow-xl font-avant_garde_medium">
                            low-tech
                          </a>{' '}
                          solutions and{' '}
                          <a className="text-stone-200 drop-shadow-xl font-avant_garde_medium">
                            advanced technology
                          </a>
                          .{' '}
                          <a className="text-stone-200 drop-shadow-xl font-avant_garde_medium">
                            bimcopilot.com
                          </a>
                          , aims to explore where this leads.
                          <br />
                          <br />
                          Learn more about our values from our parent company,
                          <br />
                          <br />
                          <a
                            className="text-emerald-200 drop-shadow-xl font-avant_garde_bold text-lg"
                            id={styles._H2}
                          >
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
                  className="text-left text-stone-400 drop-shadow-xl font-avant_garde_bold"
                >
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
                  className="text-right text-stone-400 drop-shadow-xl font-avant_garde_bold"
                >
                  Testimonials
                </h2>
              </div>

              <div id={styles.TESTIMONIAL_AREA}>
                <div id={styles.T_CONTAINER}>
                  <Tab />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}