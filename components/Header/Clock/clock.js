


import Provider from "../../../app/utils/Provider";
import styles from './clock.module.css'

import React, { Component } from 'react';





//Define clock parameters 
function clock() {
    let date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    let millisecs = date.getMilliseconds();

    //define 12 hour clock 
    hrs = hrs < 10 ? `0${hrs}` : hrs;
    mins = mins < 10 ? `0${mins}` : mins;
    secs = secs < 10 ? `0${secs}` : secs;
    millisecs = millisecs < 10 ? `0${millisecs}` : millisecs;

    //add second intervals to clock ticker 
    let time = `${hrs}:${mins}:${secs}:${millisecs}`;
    setInterval(clock, 10);

    //render clock in html 
    document.getElementById("CLOCK").innerText = time;
    }
    clock();




export default class Clock extends Component {

  render() {
    return (
      
            <> 
                <Provider id={styles.CLOCK_HOLDER}>                  
                    <h3 id={styles.CLOCK} class="text-center ...  text-slate-50 font-avant_garde_bold">

                    </h3>               
                </Provider>       
            </>
        )
    }
}
