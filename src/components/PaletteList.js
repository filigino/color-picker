import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import MiniPalette from './MiniPalette';
import styles from '../styles/PaletteListStyles';

class PaletteList extends Component {
    render() {
        const { palettes, deletePalette, classes } = this.props;

        const paletteList = palettes.map(p =>
            <div key={p.id} className="col-4">
                <MiniPalette {...p} deletePalette={deletePalette} />
            </div>
        )

        return (
            <div className={classes.root}>
                <div className="container">
                    <nav className={`row justify-content-between align-items-center ${classes.nav}`}>
                        <div className="col-auto">
                            <h1>Color Picker</h1>
                        </div>
                        <div className="col-auto">
                            <Link to="/palette/new">Create Palette</Link>
                        </div>
                    </nav>
                    <div className="row justify-content-between">
                        {paletteList}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PaletteList);
