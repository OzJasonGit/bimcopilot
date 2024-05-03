import React, { Component } from 'react';
import Script from 'next/script'
import styles from './date.module.css'


export default class DateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date().toDateString()
        };
    }

    componentDidMount() {
        // Update the date every second
        this.interval = setInterval(() => {
            this.setState({
                currentDate: new Date().toDateString()
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className={styles.dateTimeContainer}>
                <div id={styles.DATE_ICON}>
                    <Script id="date" /> 
                    <h3 className={`text-center ...  text-slate-50 ${styles.DATE_TEXTt}`}>{this.state.currentDate}</h3>    
                </div>
            </div>
        )
    }
}
