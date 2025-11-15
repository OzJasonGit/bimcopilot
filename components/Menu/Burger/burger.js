// Burger.js
import React, { useState } from 'react';
import styles from "./burger.module.css";


const Hamburger = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleClass = () => {
    setIsActive(!isActive);
  };

    return (
        <>
            <div
                className={`hamburger ${isActive ? "is-active" : ""}`}
                onClick={toggleClass}>

                <div className={styles.hamburger} id="hamburger-11">
                    <span className={styles.line}></span>
                    <span className={styles.line}></span>
                    <span className={styles.line}></span>
                </div>  
            </div>           
        </>     
    );
}

export default Hamburger;
