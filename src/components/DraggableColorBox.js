import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        backgroundColor: props => props.color,
        cursor: 'pointer',
        display: 'inline-block',
        height: '25%',
        position: 'relative',
        width: '20%'
    }
};

const DraggableColorBox = props => {
    const { name, color, classes } = props;
    return (
        <div className={classes.root}>
            {name}
        </div>
    );
}

export default withStyles(styles)(DraggableColorBox);
