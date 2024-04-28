
import styles from "./infinite_scroll.module.css";
import Image from "next/image";
import logoImage from "./Bim-copilot-logo_Mobile_2.png";


import logoNike from "./logoNike.png";
import logoPopulous from "./logoPopulous.png";
import logoPerkinsWill from "./logoPerkinsWill.png";

import logoAutodesk from "./logoAutodesk.png";
import logoBenoy from "./logoBenoy.png";
import logoPFBD from "./logoPFBD.png";




const COLORS = ['#bbf7d0', '#99f6e4', '#bfdbfe', '#ddd6fe', '#f5d0fe', '#fed7aa', '#fee2e2'];
const TAGS = [ <div id={styles.IMAGE_C_HOLDER}>
                  <Image
                      id={styles.IMAGE_1}
                      src={logoBenoy}
                      style={{ objectFit: "contain" }}
                      quality={100}
                      //object-fit="cover"
                      alt=""
                  />
                </div>, 

                <div id={styles.IMAGE_C_HOLDER}>
                  <Image
                      id={styles.IMAGE_1}
                      src={logoPopulous}
                      style={{ objectFit: "contain" }}
                      quality={100}
                      //object-fit="cover"
                      alt=""
                  />
                </div>, 

                 <div id={styles.IMAGE_C_HOLDER}>
                  <Image
                      id={styles.IMAGE_1}
                      src={logoPerkinsWill}
                      style={{ objectFit: "contain" }}
                      quality={100}
                      //object-fit="cover"
                      alt=""
                  />
                </div>, 

                <div id={styles.IMAGE_C_HOLDER}>
                  <Image
                      id={styles.IMAGE_1}
                      src={logoNike}
                      style={{ objectFit: "contain" }}
                      quality={100}
                      //object-fit="cover"
                      alt=""
                  />
                </div>, 

                <div id={styles.IMAGE_C_HOLDER}>
                  <Image
                      id={styles.IMAGE_1}
                      src={logoAutodesk}
                      style={{ objectFit: "contain" }}
                      quality={100}
                      //object-fit="cover"
                      alt=""
                  />
                </div>,

                 <div id={styles.IMAGE_C_HOLDER}>
                  <Image
                      id={styles.IMAGE_1}
                      src={logoPFBD}
                      style={{ objectFit: "contain" }}
                      quality={100}
                      //object-fit="cover"
                      alt=""
                  />
                </div>,


                <div id={styles.IMAGE_C_HOLDER}>
                  <Image
                      id={styles.IMAGE_1}
                      src={logoBenoy}
                      style={{ objectFit: "contain" }}
                      quality={100}
                      //object-fit="cover"
                      alt=""
                  />
                </div>, 

                <div id={styles.IMAGE_C_HOLDER}>
                  <Image
                      id={styles.IMAGE_1}
                      src={logoPopulous}
                      style={{ objectFit: "contain" }}
                      quality={100}
                      //object-fit="cover"
                      alt=""
                  />
                </div>, 

                 <div id={styles.IMAGE_C_HOLDER}>
                  <Image
                      id={styles.IMAGE_1}
                      src={logoPerkinsWill}
                      style={{ objectFit: "contain" }}
                      quality={100}
                      //object-fit="cover"
                      alt=""
                  />
                </div>, 

                <div id={styles.IMAGE_C_HOLDER}>
                  <Image
                      id={styles.IMAGE_1}
                      src={logoNike}
                      style={{ objectFit: "contain" }}
                      quality={100}
                      //object-fit="cover"
                      alt=""
                  />
                </div>, 

                <div id={styles.IMAGE_C_HOLDER}>
                  <Image
                      id={styles.IMAGE_1}
                      src={logoAutodesk}
                      style={{ objectFit: "contain" }}
                      quality={100}
                      //object-fit="cover"
                      alt=""
                  />
                </div>,

                <div id={styles.IMAGE_C_HOLDER}>
                  <Image
                      id={styles.IMAGE_1}
                      src={logoPFBD}
                      style={{ objectFit: "contain" }}
                      quality={100}
                      //object-fit="cover"
                      alt=""
                  />
                </div>,
                ];


const DURATION = 15000;
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

const Infinite_Scroll_2 = () => (
  <div className={styles.app_2}>
    
    
    
    
    
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

export default Infinite_Scroll_2;