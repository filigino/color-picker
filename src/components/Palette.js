import React, { Component } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import Footer from './Footer';
import '../css/Palette.css';

export default class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 500, format: 'hex', isSnackbarOpen: false };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
        this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    changeLevel(level) {
        this.setState({ level });
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
        const { colors, paletteName, emoji } = this.props.palette;
        const { level, format } = this.state;

        const colorBoxes = colors[level].map(c =>
            <ColorBox key={c.id} backgroundColor={c[format]} name={c.name} />
        );

        return (
            <div className="Palette">
                <div className="navbar">
                    <Navbar
                        level={level}
                        format={format}
                        changeLevel={this.changeLevel}
                        changeFormat={this.changeFormat}
                    />
                </div>
                <div className="colors">
                    {colorBoxes}
                </div>
                <div className="footer">
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
