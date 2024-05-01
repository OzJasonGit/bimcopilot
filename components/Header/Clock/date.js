// Date.js
import React, { Component } from 'react';

class DateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toDateString(),
    };
  }

  render() {
    return (
      <div>
        <h3>{this.state.date}</h3>
      </div>
    );
  }
}

export default DateComponent;
