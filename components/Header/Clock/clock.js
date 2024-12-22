import React, { Component } from 'react';
import styles from "./clock.module.css";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString(),
    };
  }

  componentDidMount() {
    // Update time every second
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: new Date().toLocaleTimeString(),
    });

  }

  render() {
    return (

      <div id="CLOCK"  
             class="text-center ...  text-stone-700  font-avant_garde_bold"
             style={{gridArea:"CLOCK"}}>
        <h3 id={styles._H3}>
          {this.state.time}
        </h3>
      </div>
     
    );
  }
}

export default Clock;
