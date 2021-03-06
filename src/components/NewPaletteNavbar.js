import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import NewPaletteModal from './NewPaletteModal'
import useStyles from '../styles/NewPaletteNavbarStyles'

const NewPaletteNavbar = props => {
    const classes = useStyles();

    const { palettes, open, savePalette, handleDrawerOpen } = props;

    const [isModalShowing, setIsModalShowing] = useState(false);

    const toggleModal = () => {
        setIsModalShowing(!isModalShowing)
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                color="default"
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <ChevronRightIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Create a Palette
                    </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                    <Link to="/" className={classes.link}>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                        >
                            Go back
                        </Button>
                    </Link>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={toggleModal}
                        className={classes.button}
                    >
                        Save
                    </Button>
                </div>
            </AppBar>
            {isModalShowing &&
                <NewPaletteModal
                    palettes={palettes}
                    savePalette={savePalette}
                    toggleModal={toggleModal}
                />
            }
        </div>
    );
}

export default NewPaletteNavbar;
