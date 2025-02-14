import React from 'react';
import styles from "./loader.module.css"

const SkeletonLoader = () => {
  return (
  <span className={styles.loader}>bimcopilot</span>
  )

}

export default  SkeletonLoader ;



  // <div style={{ padding: "20px" }}>
  //   {[...Array(6)].map((_, index) => (
  //     <div
  //       key={index}
  //       style={{
  //         backgroundColor: "#e0e0e0",
  //         height: "150px",
  //         marginBottom: "20px",
  //         borderRadius: "8px",
  //       }}
  //     ></div>
  //   ))}
  // </div>





  
