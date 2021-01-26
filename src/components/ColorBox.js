import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import '../css/ColorBox.css';

export default class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = { isCopying: false };
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState() {
        this.setState({ isCopying: true }, () => {
            setTimeout(() => this.setState({ isCopying: false }), 1500);
        });
    }

    render() {
        const { moreLink, name, backgroundColor, isSingleColor } = this.props;
        return (
            <div className="ColorBox">
                <div
                    style={{ backgroundColor }}
                    className={`ColorBox-background${this.state.isCopying ? ' ColorBox-copy-overlay' : ''}`}
                />
                <div className={`ColorBox-copy-overlay-text${this.state.isCopying ? ' active' : ''}`}>
                    <h1>Copied!</h1>
                    <p>{backgroundColor}</p>
                </div>
                <CopyToClipboard text={backgroundColor} onCopy={this.changeCopyState}>
                    <button className="ColorBox-button-box">
                        <div className="ColorBox-copy-button">Copy</div>
                        <div className="ColorBox-name">{name}</div>
                    </button>
                </CopyToClipboard>
                {!isSingleColor &&
                    <Link to={moreLink} className="ColorBox-more-button">More</Link>
                }
            </div>
        );
    }
}
