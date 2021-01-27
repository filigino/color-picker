import React from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
    root: {
        backgroundColor: props => props.color,
        cursor: 'pointer',
        display: 'inline-block',
        height: '25%',
        position: 'relative',
        width: '20%',
        '&:hover svg': {
            color: 'white',
            transform: 'scale(1.5)'
        }
    },
    boxContent: {
        bottom: 0,
        color: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        fontSize: '12px',
        justifyContent: 'space-between',
        left: 0,
        letterSpacing: '1px',
        padding: '10px',
        position: 'absolute',
        textTransform: 'uppercase',
        width: '100%'
    },
    deleteIcon: {
        transition: 'all 0.3s ease-in-out'
    }
};

const DraggableColorBox = props => {
    const { name, classes } = props;
    return (
        <div className={classes.root}>
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon className={classes.deleteIcon} />
            </div>
        </div>
    );
}

export default withStyles(styles)(DraggableColorBox);
