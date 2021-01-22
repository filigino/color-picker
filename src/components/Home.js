import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

export default class Home extends Component {
    render() {
        const { palettes } = this.props;

        const paletteLinks = palettes.map(p =>
            <Link key={p.id} to={`/palette/${p.id}`}>{p.paletteName}</Link>
        )
        return (
            <div className="Home">
                {paletteLinks}
            </div>
        );
    }
}
