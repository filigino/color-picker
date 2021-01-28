import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import NewPaletteModal from './NewPaletteModal'

const DRAWER_WIDTH = 400;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '64px',
        alignItems: 'center'
    },
    appBarShift: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    navBtns: {
        marginRight: '1rem',
        '& a': {
            textDecoration: 'none'
        }
    },
    button: {
        margin: '0 0.5rem'
    }
}));

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
                        <MenuIcon />
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
