import React, { Component } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/styles';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import Footer from './Footer';
import styles from '../styles/PaletteStyles';

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 500, format: 'hex', isSnackbarOpen: false };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    changeLevel(level) {
        this.setState({ level });
    }

    changeFormat(format) {
        this.setState({ format, isSnackbarOpen: true });
    }

    closeSnackbar() {
        this.setState({ isSnackbarOpen: false });
    }

    render() {
        const { colors, id, paletteName, emoji } = this.props.palette;
        const { classes } = this.props;
        const { level, format } = this.state;

        const colorBoxes = colors[level].map(c =>
            <ColorBox
                key={c.id}
                backgroundColor={c[format]}
                name={c.name}
                moreLink={`/palette/${id}/${c.id}`}
                isSingleColor={false}
            />
        );

        return (
            <div className={classes.root}>
                <div className={classes.navbar}>
                    <Navbar
                        level={level}
                        format={format}
                        changeLevel={this.changeLevel}
                        changeFormat={this.changeFormat}
                        isSingleColor={false}
                    />
                </div>
                <div className={classes.colors}>
                    {colorBoxes}
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
                            onClick={this.closeSnackbar}
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

export default withStyles(styles)(Palette);
