import React from 'react';
import { useHistory } from 'react-router-dom';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import DraggableColorBox from './DraggableColorBox';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
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
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        height: 'calc(100vh - 64px)'
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

const NewPalette = props => {
    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    const [colors, setColors] = React.useState([{ name: 'purple', color: 'purple' }]);
    const [color, setColor] = React.useState('teal');
    const [colorName, setColorName] = React.useState('');
    const [paletteName, setPaletteName] = React.useState('');
    const [open, setOpen] = React.useState(true);

    React.useEffect(() => {
        ValidatorForm.addValidationRule('colorNameUnique', value =>
            colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
        );
        ValidatorForm.addValidationRule('colorUnique', () =>
            colors.every(c => c.color !== color)
        );
        ValidatorForm.addValidationRule('paletteNameUnique', value =>
            props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
        );
    });

    const handleChangeColor = color => {
        changeColor(color);
    };

    const changeColor = color => {
        setColor(color.hex);
    };

    const handleSubmit = () => {
        addColor();
    };

    const addColor = () => {
        setColors([...colors, { name: colorName, color }]);
    };

    const handleChangeColorName = evt => {
        setColorName(evt.target.value);
    };

    const handleChangePaletteName = evt => {
        setPaletteName(evt.target.value);
    };

    const deleteColor = name => {
        setColors(colors.filter(c => c.name !== name));
    };

    const handleSavePalette = () => {
        savePalette();
        history.push('/');
    };

    const savePalette = () => {
        const id = paletteName.replace(' ', '-').toLowerCase();
        const palette = { paletteName, colors, id }
        props.savePalette(palette);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const colorBoxes = colors.map(c =>
        <DraggableColorBox key={c.name} {...c} deleteColor={deleteColor} />
    );

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
                    </ValidatorForm>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <Typography variant="h4">
                    Design Your Palette
                </Typography>
                <div>
                    <Button variant="contained" color="secondary">
                        Clear Palette
                    </Button>
                    <Button variant="contained" color="primary">
                        Random Color
                    </Button>
                </div>
                <ChromePicker color={color} onChangeComplete={handleChangeColor} />
                <ValidatorForm onSubmit={handleSubmit}>
                    <TextValidator
                        value={colorName}
                        onChange={handleChangeColorName}
                        validators={['required', 'colorNameUnique', 'colorUnique']}
                        errorMessages={['Required', 'Name already used', 'Color already used']}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: color }}
                        type="submit"
                    >
                        Add Color
                </Button>
                </ValidatorForm>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {colorBoxes}
            </main>
        </div>
    );
}

export default NewPalette;
