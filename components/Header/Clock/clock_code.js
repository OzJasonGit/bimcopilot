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

                                       
                                        
    
//Defines todays date in DOM
function date(){
    let todaysDate = new Date();

    console.log(todaysDate)

    document.getElementById("DATE").innerText = todaysDate.toDateString();
    }
    date();





export default class Header extends Component {

     render() {
        return (
            <div id={styles.CLOCK_ICON}>
                <Script id="clock"> 

                    {`document.getElementById("CLOCK").innerText = todaysDate.toDateString()`}   
                                                  
                </Script>
                <h3  class="text-center ...  text-slate-50" id={styles.CLOCK}></h3>    
                
            </div>
        )
    }
}








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

                                       
                                        
    
//Defines todays date in DOM
function date(){
    let todaysDate = new Date();

    console.log(todaysDate)

    document.getElementById("DATE").innerText = todaysDate.toDateString();
   }
   date();