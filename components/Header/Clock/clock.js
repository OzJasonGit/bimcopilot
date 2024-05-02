import React, { Component } from 'react';

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
        <div id="CLOCK">
        {this.state.time}
      </div>
    );
  }
}

export default Clock;
