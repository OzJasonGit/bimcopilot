
import styles from "./infinite_scroll_portfolio.module.css";
import Image from "next/image";
import logoImage from "./Bim-copilot-logo_Mobile_2.png";


import logoNike from "./logoNike.png";
import logoPopulous from "./logoPopulous.png";
import logoPerkinsWill from "./logoPerkinsWill.png";

import logoAutodesk from "./logoAutodesk.png";
import logoBenoy from "./logoBenoy.png";
import logoPFBD from "./logoPFBD.png";




const COLORS = ['#bbf7d0', '#99f6e4', '#bfdbfe', '#ddd6fe', '#f5d0fe', '#fed7aa', '#fee2e2'];
const TAGS = [ 

                <div className="bg-stone-800 ... rounded-xl ... " 
                     style={{
                              padding: "15px",
                              width: "800px",
                              height: "1000px"
                           }}>
                          <div className="bg-stone-800 ... rounded-xl ... " 
                                style={{                                       
                                        width: "100%",
                                        height: "100%"
                                      }}>
                          </div>              
                </div>, 

                <div className="bg-stone-800 ... rounded-xl ... " 
                     style={{
                              padding: "15px",
                              width: "800px",
                              height: "1000px"
                           }}>
                          <div className="bg-stone-800 ... rounded-xl ... " 
                                style={{                                       
                                        width: "100%",
                                        height: "100%"
                                      }}>
                          </div>  
                </div>, 

                 <div className="bg-stone-800 ... rounded-xl ... " 
                     style={{
                              padding: "15px",
                              width: "800px",
                              height: "1000px"
                           }}>
                          <div className="bg-stone-800 ... rounded-xl ... " 
                                style={{                                       
                                        width: "100%",
                                        height: "100%"
                                      }}>
                          </div> 
                </div>, 

                <div className="bg-stone-800 ... rounded-xl ... " 
                     style={{
                              padding: "15px",
                              width: "800px",
                              height: "1000px"
                           }}>
                          <div className="bg-stone-800 ... rounded-xl ... " 
                                style={{                                       
                                        width: "100%",
                                        height: "100%"
                                      }}>
                          </div> 
                </div>, 

                <div className="bg-stone-800 ... rounded-xl ... " 
                     style={{
                              padding: "15px",
                              width: "800px",
                              height: "1000px"
                           }}>
                          <div className="bg-stone-800 ... rounded-xl ... " 
                                style={{                                       
                                        width: "100%",
                                        height: "100%"
                                      }}>
                          </div> 
                </div>,

                 <div className="bg-stone-800 ... rounded-xl ... " 
                     style={{
                              padding: "15px",
                              width: "800px",
                              height: "1000px"
                           }}>
                          <div className="bg-stone-800 ... rounded-xl ... " 
                                style={{                                       
                                        width: "100%",
                                        height: "100%"
                                      }}>
                          </div> 
                </div>,


                <div className="bg-stone-800 ... rounded-xl ... " 
                     style={{
                              padding: "15px",
                              width: "800px",
                              height: "1000px"
                           }}>
                          <div className="bg-stone-800 ... rounded-xl ... " 
                                style={{                                       
                                        width: "100%",
                                        height: "100%"
                                      }}>
                          </div> 
                </div>, 

                <div className="bg-stone-800 ... rounded-xl ... " 
                     style={{
                              padding: "20px",
                              width: "800px",
                              height: "1000px"
                           }}>
                          <div className="bg-stone-800 ... rounded-xl ... " 
                                style={{                                       
                                        width: "100%",
                                        height: "100%"
                                      }}>
                          </div> 
                </div>, 

                 <div className="bg-stone-800 ... rounded-xl ... " 
                     style={{
                              padding: "15px",
                              width: "800px",
                              height: "1000px"
                           }}>
                          <div className="bg-stone-800 ... rounded-xl ... " 
                                style={{                                       
                                        width: "100%",
                                        height: "100%"
                                      }}>
                          </div> 
                </div>, 

                <div className="bg-stone-800 ... rounded-xl ... " 
                     style={{
                              padding: "15px",
                              width: "800px",
                              height: "1000px"
                           }}>
                          <div className="bg-stone-800 ... rounded-xl ... " 
                                style={{                                       
                                        width: "100%",
                                        height: "100%"
                                      }}>
                          </div> 
                </div>, 

                <div className="bg-stone-800 ... rounded-xl ... " 
                     style={{
                              padding: "15px",
                              width: "800px",
                              height: "1000px"
                           }}>
                          <div className="bg-stone-800 ... rounded-xl ... " 
                                style={{                                       
                                        width: "100%",
                                        height: "100%"
                                      }}>
                          </div> 
                </div>,

                <div className="bg-stone-800 ... rounded-xl ... " 
                     style={{
                              padding: "15px",
                              width: "800px",
                              height: "1000px"
                           }}>
                          <div className="bg-stone-800 ... rounded-xl ... " 
                                style={{                                       
                                        width: "100%",
                                        height: "100%"
                                      }}>
                          </div> 
                </div>,
                ];


const DURATION = 150000;
const ROWS = 1;
const TAGS_PER_ROW = 7;

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const shuffle = (arr) => [...arr].sort( () => .7 - Math.random() );

const InfiniteLoopSlider = ({children, duration, reverse = false}) => {
  return (
    <div className={styles.loop_slider} style={{
        '--duration': `${duration}ms`,
        '--direction': reverse ? 'reverse' : 'normal'
      }}>
      <div className={styles.inner}>
        {children}
        {children}
      </div>
    </div>
  );
};

const Tag = ({ text }) => (
  <div className={styles.tag}>{text}</div>
);

const Infinite_Scroll = () => (
  <div className={styles.app}>
    
    
    
    
    
    <div className={styles.tag_list}>
      {[...new Array(ROWS)].map((_, i) => (
        <InfiniteLoopSlider key={i} duration={random(DURATION - 5000, DURATION + 5000)} reverse={i % 2}>
          {shuffle(TAGS).slice(0, TAGS_PER_ROW).map(tag => (
            <Tag text={tag} key={tag}/>
          ))}
        </InfiniteLoopSlider>
      ))}
      <div className={styles.fade}/>
    </div>
    
    
  </div>
);

export default Infinite_Scroll;