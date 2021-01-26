import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import styles from '../styles/ColorBoxStyles';

class ColorBox extends Component {
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
        const { moreLink, name, backgroundColor, isSingleColor, classes } = this.props;

        return (
            <div className={classes.colorBox}>
                <div
                    className={`${classes.background} ${this.state.isCopying ? classes.copyOverlay : ''}`}
                />
                <div className={this.state.isCopying ? classes.copyOverlayTextActive : classes.copyOverlayTextInActive}>
                    <h1 className={classes.copyOverlayTextHeading}>Copied!</h1>
                    <p className={classes.copyText}>{backgroundColor}</p>
                </div>
                <CopyToClipboard text={backgroundColor} onCopy={this.changeCopyState}>
                    <button className={classes.buttonBox}>
                        <div className={classes.copyButton}>Copy</div>
                        <div className={classes.name}>{name}</div>
                    </button>
                </CopyToClipboard>
                {!isSingleColor &&
                    <Link to={moreLink} className={classes.moreButton}>More</Link>
                }
            </div>
        );
    }
}

export default withStyles(styles)(ColorBox);
