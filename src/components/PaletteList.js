import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import MiniPalette from './MiniPalette';
import styles from '../styles/PaletteListStyles';

class PaletteList extends Component {
    render() {
        const { palettes, classes } = this.props;

        const paletteList = palettes.map(p =>
            <div key={p.id} className="col-4">
                <MiniPalette {...p} />
            </div>
        )

        return (
            <div className={classes.root}>
                <div className="container">
                    <nav className={`row justify-content-between ${classes.nav}`}>
                        <div className="col-auto">
                            <h1>Color Picker</h1>
                        </div>
                        <div className="col-auto">
                            <h1>hatdog</h1>
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
