import React, { Component } from 'react';
import ColorBox from './ColorBox';
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        height: '100%'
    },
    navbar: {
        height: '5%'
    },
    colors: {
        display: 'flex',
        flexWrap: 'wrap',
        height: '90%'
    },
    footer: {
        height: '5%'
    }
}

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this.state = { format: 'hex' }
        this._palette = this.buildPalette();
    }

    buildPalette() {
        const palette = [];
        const colors = this.props.palette.colors;
        for (let level in colors) {
            palette.push(colors[level].find(color => color.id === this.props.colorId));
        }
        return palette.slice(1);
    }

    render() {
        const { classes } = this.props;

        const colorBoxes = this._palette.map(color =>
            <ColorBox
                key={color.name}
                backgroundColor={color[this.state.format]}
                name={color.name}
                showMoreLink={false}
            />
        )

        return (
            <div className={classes.root}>
                <div className={classes.navbar}>

                </div>
                <div className={classes.colors}>
                    {colorBoxes}
                </div>
                <div className={classes.footer}>

                </div>
            </div>
        );
    }
}

export default withStyles(styles)(SingleColorPalette);
