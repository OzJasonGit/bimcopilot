// Date.js
import React, { Component } from 'react';
import styles from "./clock.module.css";

class DateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toDateString().toUpperCase()
    };
  }

  render() {
    return (
      <div id={styles.DATE}>
        <h3 id={styles._H3} class="text-center ...  text-slate-50 font-geistmono_regular"
        style={{marginBottom:"0px"}}>{this.state.date}</h3>
      </div>
    );
  }
}

export default DateComponent;
