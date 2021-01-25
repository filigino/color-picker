import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '0.5rem',
        position: 'relative',
        overflow: 'hidden',
        width: '100%'
    },
    colors: {
        backgroundColor: '#dae1e4',
        borderRadius: '5px',
        height: '150px',
        width: '100%',
        overflow: 'hidden'
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0',
        color: 'black',
        paddingTop: '0.5rem',
        fontSize: '1rem'
    },
    emoji: {
        marginLeft: '0.5rem',
        fontSize: '1.5rem'
    },
    miniColorBox: {
        height: '25%',
        width: '20%',
        display: 'inline-block',
        margin: '0 auto',
        marginBottom: '-3.5px'
    }
}

const MiniPalette = (props) => {
    const history = useHistory();
    const { classes, colors, emoji, id, paletteName } = props;

    const handleClick = () => {
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
        <button className={classes.root} onClick={handleClick}>
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
