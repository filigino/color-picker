import React, { Component } from 'react';
import Slider from 'rc-slider';
import ColorBox from './ColorBox';
import 'rc-slider/assets/index.css';
import '../css/Palette.css';

export default class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 500 };
        this.changeColorLevel = this.changeColorLevel.bind(this);
    }

    changeColorLevel(level) {
        this.setState({ level });
    }

    render() {
        const { colors } = this.props.palette;
        const { level } = this.state;

        const colorBoxes = colors[level].map(c =>
            <ColorBox key={c.hex} backgroundColor={c.hex} name={c.name} />
        )
        return (
            <div className="Palette">
                <div className="Palette-navbar">
                    <Slider
                        defaultValue={level}
                        min={100}
                        max={900}
                        step={100}
                        onAfterChange={this.changeColorLevel} />
                </div>
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                <div className="Palette-footer"></div>
            </div>
        );
    }
}
