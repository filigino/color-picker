import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

export default class NewPaletteNavbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            paletteName,
            open,
            handleDrawerOpen,
            handleSavePalette,
            handleChangePaletteName,
            classes
        } = this.props;

        return (
            <div>
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
                            Persistent drawer
                    </Typography>
                        <ValidatorForm onSubmit={handleSavePalette}>
                            <TextValidator
                                value={paletteName}
                                onChange={handleChangePaletteName}
                                label="Palette Name"
                                validators={['required', 'paletteNameUnique']}
                                errorMessages={['Required', 'Name already used']}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Save Palette
                        </Button>
                            <Link to="/">
                                <Button variant="contained" color="secondary">
                                    Go back
                        </Button>
                            </Link>
                        </ValidatorForm>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
