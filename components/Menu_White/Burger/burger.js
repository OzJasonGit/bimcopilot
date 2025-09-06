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

                <div class={styles.hamburger} id={styles.hamburger-11}>
                    <span class={styles.line}></span>
                    <span class={styles.line}></span>
                    <span class={styles.line}></span>
                </div>  
            </div>           
        </>     
    );
}

export default Hamburger;
