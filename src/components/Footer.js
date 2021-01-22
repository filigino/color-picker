import React, { Component } from 'react'
import '../css/Footer.css';

export default class Footer extends Component {
    render() {
        const { name, emoji } = this.props;
        return (
            <div className="Footer">
                {name} <span className="emoji">{emoji}</span>
            </div>
        )
    }
}
