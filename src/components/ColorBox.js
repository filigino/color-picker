import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../css/ColorBox.css';

export default class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = { isBeingCopied: false };
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState() {
        this.setState({ isBeingCopied: true }, () => {
            setTimeout(() => this.setState({ isBeingCopied: false }), 1500);
        });
    }

    render() {
        const { name, background } = this.props;
        return (
            <div style={{ backgroundColor: background }} className="ColorBox">
                <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                    <button className="ColorBox-button-box">
                        <div className="ColorBox-copy-button">Copy</div>
                        <div className="ColorBox-name">{name}</div>
                    </button>
                </CopyToClipboard>
                <button className="ColorBox-more-button">More</button>
            </div>

        );
    }
}
