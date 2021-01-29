import React from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete'
import styles from '../styles/MiniPaletteStyles';

const MiniPalette = (props) => {
    const history = useHistory();
    const { classes, colors, emoji, id, paletteName } = props;

    const openPalette = () => {
        history.push(`/palette/${id}`);
    }

    const miniColorBoxes = colors.map(color =>
        <div
            key={color.name}
            className={classes.miniColorBox}
            style={{ backgroundColor: color.color }}
        />
    )

    if (miniColorBoxes.length !== 20) miniColorBoxes.push(
        <div
            key="Blank"
            className={classes.miniColorBox}
            style={{ backgroundColor: 'transparent' }}
        />
    )

    return (
        <button className={classes.root} onClick={openPalette}>
            <div className={classes.delete}>
                <DeleteIcon
                    className={classes.deleteIcon}
                    style={{ transition: 'all 0.3s ease-in-out' }}
                />
            </div>
            <div className={classes.colors}>
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>
                {paletteName} <span className={classes.emoji}>{emoji}</span>
            </h5>
        </button>
    );
}

export default withStyles(styles)(MiniPalette);
