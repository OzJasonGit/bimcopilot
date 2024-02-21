"use client";

import React, { Component } from 'react';
import Script from 'next/script'
import styles from './Date.module.css'



//Define date parameters 
function clock() {
    let clock = new Date();



                                                                            
//Defines todays date in DOM
function date(){
    let todaysDate = new Date();

    console.log(todaysDate)
   };
   
   date();
}



export default class Date extends Component {

     render() {
        return (
            <div id={styles.DATE_ICON}>
                <Script id="date"> 

                    {`document.getElementById("DATE_TEXT").innerText = todaysDate.toDateString()`}   
                                                  
                </Script>
                <h3  class="text-center ...  text-slate-50" id={styles.DATE_TEXT}></h3>    
                
            </div>
            
        )
    }
}

