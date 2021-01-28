import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from '../styles/DraggableColorBoxStyles'

const DraggableColorBox = props => {
    const { name, removeColor, classes } = props;

    const handleRemoveColor = () => {
        removeColor(name);
    };

    return (
        <div className={classes.root}>
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon
                    className={classes.deleteIcon}
                    onClick={handleRemoveColor}
                />
            </div>
        </div>
    );
}

export default withStyles(styles)(SortableElement(DraggableColorBox));
