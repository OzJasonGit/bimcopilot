
import styles from "./infinite_scroll_portfolio.module.css";
import Image from "next/image";

// Array of Portfolio images from Cloudinary
const portfolioImages = [
  "https://res.cloudinary.com/dbj8h56jj/image/upload/v1753610789/Portfolio/pexels-arantxa-treva-351075-959323_prenop.jpg",
  "https://res.cloudinary.com/dbj8h56jj/image/upload/v1753718464/Portfolio/pexels-mikhail-nilov-8107943_largis.jpg",
  "https://res.cloudinary.com/dbj8h56jj/image/upload/v1753718779/Portfolio/pexels-roman-odintsov-4553618_hce2eh.jpg",
  "https://res.cloudinary.com/dbj8h56jj/image/upload/v1753718466/Portfolio/pexels-thisisengineering-3861969_ks4ail.jpg",
  "https://res.cloudinary.com/dbj8h56jj/image/upload/v1753718465/Portfolio/pexels-sidesimagery-3102320_pdzkzr.jpg",
  "https://res.cloudinary.com/dbj8h56jj/image/upload/v1753718465/Portfolio/pexels-cax0000-1786758_wcae28.jpg",
  "https://res.cloudinary.com/dbj8h56jj/image/upload/v1753718465/Portfolio/pexels-cottonbro-8679906_azwqvt.jpg",
  "https://res.cloudinary.com/dbj8h56jj/image/upload/v1753718465/Portfolio/pexels-mikhail-nilov-6835973_y6hkic.jpg"
];

const COLORS = ['#bbf7d0', '#99f6e4', '#bfdbfe', '#ddd6fe', '#f5d0fe', '#fed7aa', '#fee2e2'];
const TAGS = [ 

                <div className=""                    
                     style={{
                     padding: "0px",
                     width: "750px",
                     height: "1100px"
                     }}>
                      <div 
                           id={styles.CAROUSEL_GRID_1}
                           style={{                                       
                              width: "100%",
                              height: "100%"
                           }}>
                            
                           <div className=" rounded-xl ... " 
                                style={{   
                                overflow:"hidden",  
                                position: "relative",                                  
                                gridArea: "P1",
                                width: "100%",
                                height: "100%"
                                }}>
                                  <Image
                                    src={portfolioImages[0]}   
                                    alt="Portfolio Image 1"
                                    width={500}
                                    height={500}
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                    style={{    
                                      position: "absolute",                                   
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                           </div>  

                           <div className=" rounded-xl ... " 
                                id={styles.CAROUSEL_GRID_1_1}
                                style={{  
                                overflow:"hidden",
                                position: "relative",                                     
                                gridArea: "P2",
                                width: "100%",
                                height: "100%"
                                }}>

                                  <div className=" rounded-xl ... " 
                                        style={{   
                                        overflow:"hidden",  
                                        position: "relative",                                  
                                        gridArea: "P1",
                                        width: "100%",
                                        height: "100%"
                                        }}>
                                          <Image
                                            src={portfolioImages[1]}   
                                            alt="Portfolio Image 2"
                                            width={500}
                                            height={500}
                                            loading="lazy"
                                            placeholder="blur"
                                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                            style={{    
                                              position: "absolute",                                   
                                              width: "100%",
                                              height: "100%",
                                              objectFit: "cover",
                                            }}
                                          />
                                  </div> 

                                  <div className=" rounded-xl ... " 
                                        style={{   
                                        overflow:"hidden",  
                                        position: "relative",                                  
                                        gridArea: "P2",
                                        width: "100%",
                                        height: "100%"
                                        }}>
                                          <Image
                                            src={portfolioImages[2]}   
                                            alt="Portfolio Image 3"
                                            width={500}
                                            height={500}
                                            loading="lazy"
                                            placeholder="blur"
                                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                            style={{    
                                              position: "absolute",                                   
                                              width: "100%",
                                              height: "100%",
                                              objectFit: "cover",
                                            }}
                                          />
                                  </div> 
                                 
                           </div> 

                           <div className=" rounded-xl ... " 
                                style={{  
                                overflow:"hidden",
                                position: "relative",                                     
                                gridArea: "P3",
                                width: "100%",
                                height: "100%"
                                }}>
                                  <Image
                                    src={portfolioImages[3]}   
                                    alt="Portfolio Image 4"
                                    width={500}
                                    height={500}
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                    style={{
                                      position: "absolute",   
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                           </div>  
                                                   
                      </div>              
                </div>, 

                <div className="" 
                     style={{
                        padding: "0px",
                        width: "750px",
                        height: "1100px"
                      }}>
                      <div 
                        id={styles.CAROUSEL_GRID_2}
                        style={{                                       
                            width: "100%",
                            height: "100%"
                        }}>
                          <div className=" rounded-xl ... " 
                              style={{   
                              overflow:"hidden",
                              position: "relative",                                    
                              gridArea: "P1",
                              width: "100%",
                              height: "100%"
                              }}>
                                <Image
                                    src={portfolioImages[4]}   
                                    alt="Portfolio Image 5"
                                    width={500}
                                    height={500}
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                    style={{   
                                      position: "absolute",                                     
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                          </div>  
                          <div className=" rounded-xl ... " 
                                style={{ 
                                overflow:"hidden",  
                                position: "relative",                                    
                                gridArea: "P2",
                                width: "100%",
                                height: "100%"
                                }}>
                                  <Image
                                    src={portfolioImages[5]}   
                                    alt="Portfolio Image 6"
                                    width={500}
                                    height={500}
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                    style={{  
                                      position: "absolute",                                     
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                          </div> 
                          <div className=" rounded-xl ... " 
                                style={{ 
                                overflow:"hidden",
                                position: "relative",                                      
                                gridArea: "P3",
                                width: "100%",
                                height: "100%"
                                }}>
                                  <Image
                                    src={portfolioImages[6]}   
                                    alt="Portfolio Image 7"
                                    width={500}
                                    height={500}
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                    style={{  
                                      position: "absolute",                                       
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                        </div> 
                      </div>                        
                </div>, 

                <div className="" 
                     style={{
                        padding: "0px",
                        width: "750px",
                        height: "1100px"
                      }}>
                      <div 
                        id={styles.CAROUSEL_GRID_3}
                        style={{                                       
                            width: "100%",
                            height: "100%"
                        }}>
                          <div className=" rounded-xl ... " 
                              style={{ 
                              overflow:"hidden", 
                              position: "relative",                                     
                              gridArea: "P1",
                              width: "100%",
                              height: "100%"
                              }}>
                                <Image
                                    src={portfolioImages[7]}   
                                    alt="Portfolio Image 8"
                                    width={500}
                                    height={500}
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                    style={{  
                                      position: "absolute",                                      
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                          </div>  
                          <div className=" rounded-xl ... " 
                                style={{ 
                                overflow:"hidden", 
                                position: "relative",                                     
                                gridArea: "P2",
                                width: "100%",
                                height: "100%"
                                }}>
                                  <Image
                                    src={portfolioImages[0]}   
                                    alt="Portfolio Image 1"
                                    width={500}
                                    height={500}
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                    style={{  
                                      position: "absolute",                                     
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                          </div>                          
                      </div>                        
                </div>   
                
             ];


const DURATION = 150000;
const ROWS = 1;
const TAGS_PER_ROW = 3;

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const shuffle = (arr) => [...arr].sort( () => .3 - Math.random() );

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