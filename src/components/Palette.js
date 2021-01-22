import React, { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import Footer from './Footer';
import '../css/Palette.css';

export default class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { colorLevel: 500 };
        this.changeColorLevel = this.changeColorLevel.bind(this);
    }

    changeColorLevel(colorLevel) {
        this.setState({ colorLevel });
    }

    render() {
        const { colors } = this.props.palette;
        const { colorLevel } = this.state;

        const colorBoxes = colors[colorLevel].map(c =>
            <ColorBox key={c.hex} backgroundColor={c.hex} name={c.name} />
        )
        return (
            <div className="Palette">
                <div className="navbar">
                    <Navbar colorLevel={colorLevel} changeColorLevel={this.changeColorLevel} />
                </div>
                <div className="colors">
                    {colorBoxes}
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </div>
        );
    }
}
