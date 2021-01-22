import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../css/Navbar.css';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleSlide = this.handleSlide.bind(this);
    }

    handleSlide(level) {
        this.props.changeColorLevel(level)
    }

    render() {
        const { colorLevel } = this.props;
        return (
            <nav className="Navbar">
                <div className="logo">
                    <a href="/">React Color Picker</a>
                </div>
                <div className="slider-container">
                    <span>Level: {colorLevel}</span>
                    <div className="slider">
                        <Slider
                            defaultValue={colorLevel}
                            min={100}
                            max={900}
                            step={100}
                            onAfterChange={this.handleSlide}
                        />
                    </div>
                </div>
            </nav>
        );
    }
}
