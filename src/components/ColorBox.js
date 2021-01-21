import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../css/ColorBox.css';

export default class ColorBox extends Component {
    render() {
        const { name, background } = this.props;
        return (
            <CopyToClipboard text={background}>
                <button style={{ backgroundColor: background }} className="ColorBox">
                    <div className="ColorBox-copy-button">Copy</div>
                    <div className="ColorBox-name">{name}</div>
                    <div className="ColorBox-more-button">More</div>
                </button>
            </CopyToClipboard>
        );
    }
}
