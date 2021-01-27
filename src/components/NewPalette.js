import React from 'react';
import { useHistory } from 'react-router-dom';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import NewPaletteNavbar from './NewPaletteNavbar';

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

const NewPalette = ({ palettes, addPalette, maxColors = 20 }) => {
    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();

    const [colors, setColors] = React.useState(palettes[0].colors);
    const [color, setColor] = React.useState('teal');
    const [colorName, setColorName] = React.useState('');
    const [paletteName, setPaletteName] = React.useState('');
    const [open, setOpen] = React.useState(true);

    const isPaletteFull = colors.length >= maxColors;

    React.useEffect(() => {
        ValidatorForm.addValidationRule('colorNameUnique', value =>
            colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
        );
        ValidatorForm.addValidationRule('colorUnique', () =>
            colors.every(c => c.color !== color)
        );
        ValidatorForm.addValidationRule('paletteNameUnique', value =>
            palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
        );
    });

    const handleChangeColor = color => {
        changeColor(color);
    };

    const changeColor = color => {
        setColor(color.hex);
    };

    const handleSubmit = () => {
        if (!isPaletteFull) {
            addColor({ name: colorName, color });
            clearColorName();
        }
    };

    const addColor = color => {
        setColors([...colors, color]);
    };

    const clearColorName = () => {
        setColorName('');
    }

    const handleChangeColorName = evt => {
        setColorName(evt.target.value);
    };

    const handleChangePaletteName = evt => {
        setPaletteName(evt.target.value);
    };

    const handleClear = () => {
        clearPalette();
    }

    const clearPalette = () => {
        setColors([]);
    }

    const handleRandom = () => {
        addRandomColor();
    }

    const addRandomColor = () => {
        let color;
        do {
            const paletteIndex = Math.floor(Math.random() * palettes.length);
            const colorIndex = Math.floor(Math.random() * palettes[paletteIndex].colors.length);
            color = palettes[paletteIndex].colors[colorIndex];
        } while (colors.find(({ name }) => name === color.name));
        addColor(color);
    }

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setColors(arrayMove(colors, oldIndex, newIndex));
    };

    const removeColor = name => {
        setColors(colors.filter(c => c.name !== name));
    };

    const handleSavePalette = () => {
        savePalette();
        history.push('/');
    };

    const savePalette = () => {
        const id = paletteName.replace(' ', '-').toLowerCase();
        const palette = { paletteName, colors, id }
        addPalette(palette);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <NewPaletteNavbar
                paletteName={paletteName}
                open={open}
                handleDrawerOpen={handleDrawerOpen}
                handleSavePalette={handleSavePalette}
                handleChangePaletteName={handleChangePaletteName}
                classes={classes}
            />
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
                    <Button variant="contained" color="secondary" onClick={handleClear}>
                        Clear Palette
                    </Button>
                    <Button
                        variant="cont
                        ained"
                        color="primary"
                        onClick={handleRandom}
                        disabled={isPaletteFull}
                    >
                        Random color
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
                        style={{ backgroundColor: isPaletteFull ? 'grey' : color }}
                        type="submit"
                        disabled={isPaletteFull}
                    >
                        {isPaletteFull ? 'Palette full' : 'Add color'}
                    </Button>
                </ValidatorForm>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <DraggableColorList
                    colors={colors}
                    removeColor={removeColor}
                    axis="xy"
                    onSortEnd={onSortEnd}
                />
            </main>
        </div>
    );
}

export default NewPalette;
