import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slider from 'rc-slider';
import { withStyles } from '@material-ui/styles';
import styles from '../styles/NavbarStyles';
import 'rc-slider/assets/index.css';
import '../css/Navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSlide = this.handleSlide.bind(this);
    }

    handleChange(evt) {
        this.props.changeFormat(evt.target.value);
    }

    handleSlide(level) {
        this.props.changeLevel(level)
    }

    render() {
        const { level, format, isSingleColor, classes } = this.props;
        return (
            <nav className={classes.navbar}>
                <div className={classes.logo}>
                    <Link to="/">Color Picker</Link>
                </div>
                {!isSingleColor &&
                    <div>
                        <span>Level: {level}</span>
                        <div className={classes.slider}>
                            <Slider
                                defaultValue={level}
                                min={100}
                                max={900}
                                step={100}
                                onAfterChange={this.handleSlide}
                            />
                        </div>
                    </div>
                }
                <div className={classes.selectContainer}>
                    <Select value={format} onChange={this.handleChange}>
                        <MenuItem value="hex">
                            HEX - #ffffff
                        </MenuItem>
                        <MenuItem value="rgb">
                            RGB - rgb(255, 255, 255)
                        </MenuItem>
                        <MenuItem value="rgba">
                            RGBA - rgba(255, 255, 255, 1.0)
                        </MenuItem>
                    </Select>
                </div>
            </nav>
        );
    }
}

export default withStyles(styles)(Navbar);
