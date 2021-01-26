import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/styles';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import Footer from './Footer';

const styles = {
    root: {
        height: '100%'
    },
    navbar: {
        height: '5%'
    },
    colors: {
        display: 'flex',
        flexWrap: 'wrap',
        height: '90%'
    },
    footer: {
        height: '5%'
    }
}

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this.state = { format: 'hex', isSnackbarOpen: false }
        this._palette = this.buildPalette();
        this.changeFormat = this.changeFormat.bind(this);
        this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    buildPalette() {
        const palette = [];
        const colors = this.props.palette.colors;
        for (let level in colors) {
            palette.push(colors[level].find(color => color.id === this.props.colorId));
        }
        return palette.slice(1);
    }

    changeFormat(format) {
        this.setState({ format, isSnackbarOpen: true });
    }

    handleCloseSnackbar() {
        this.closeSnackbar();
    }

    closeSnackbar() {
        this.setState({ isSnackbarOpen: false });
    }

    render() {
        const { paletteName, emoji, id: paletteId } = this.props.palette;
        const { classes } = this.props;
        const { format } = this.state;

        const colorBoxes = this._palette.map(color =>
            <ColorBox
                key={color.name}
                backgroundColor={color[format]}
                name={color.name}
                isSingleColor
            />
        )

        return (
            <div className={classes.root}>
                <div className={classes.navbar}>
                    <Navbar
                        format={format}
                        changeFormat={this.changeFormat}
                        isSingleColor
                    />
                </div>
                <div className={`${classes.colors} single-color-palette`}>
                    {colorBoxes}
                    <Link to={`/palette/${paletteId}`} className="ColorBox ColorBox-back-box">
                        <div className="ColorBox-back-button">
                            Go back
                        </div>
                    </Link>
                </div>
                <div className={classes.footer}>
                    <Footer name={paletteName} emoji={emoji} />
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.isSnackbarOpen}
                    autoHideDuration={3000}
                    message={<span id="message-id">Format changed to {format.toUpperCase()}!</span>}
                    ContentProps={{ 'aria-describedby': 'message-id' }}
                    action={[
                        <IconButton
                            onClick={this.handleCloseSnackbar}
                            color="inherit"
                            key="close"
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                    onClose={this.closeSnackbar}
                />
            </div>
        );
    }
}

export default withStyles(styles)(SingleColorPalette);