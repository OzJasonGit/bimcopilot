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

                <div id="burger" onclick="animation()">
                    <div id="stroke1"></div>
                    <div id="stroke2"></div>
                    <div id="stroke3"></div>
                    <div id="tap-circle"></div>
                </div>   
            </div>           
        </>     
    );
}

export default Hamburger;
