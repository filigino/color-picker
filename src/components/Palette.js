import React, { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import Footer from './Footer';
import '../css/Palette.css';

export default class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 500, format: 'hex' };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }

    changeLevel(level) {
        this.setState({ level });
    }

    changeFormat(format) {
        this.setState({ format });
    }

    render() {
        const { colors } = this.props.palette;
        const { level, format } = this.state;

        const colorBoxes = colors[level].map(c =>
            <ColorBox key={c.hex} backgroundColor={c[format]} name={c.name} />
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
                    <Footer />
                </div>
            </div>
        );
    }
}
