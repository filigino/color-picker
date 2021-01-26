import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';
import styles from '../styles/FooterStyles';

class Footer extends Component {
    render() {
        const { name, emoji, classes } = this.props;
        return (
            <div className={classes.footer}>
                {name} <span className={classes.emoji}>{emoji}</span>
            </div>
        )
    }
}

export default withStyles(styles)(Footer);
