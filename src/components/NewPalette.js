import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { arrayMove } from 'react-sortable-hoc';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import AddColorForm from './AddColorForm';
import DraggableColorList from './DraggableColorList';
import NewPaletteNavbar from './NewPaletteNavbar';
import useStyles from '../styles/NewPaletteStyles'

const NewPalette = ({ palettes, addPalette, maxColors = 20 }) => {
    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();

    const [colors, setColors] = useState(palettes[0].colors);
    const [open, setOpen] = useState(true);

    const isPaletteFull = colors.length >= maxColors;

    const addColor = color => {
        setColors([...colors, color]);
    };

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

    const savePalette = (paletteName, emoji) => {
        const id = paletteName.replace(' ', '-').toLowerCase();
        const palette = { paletteName, id, emoji, colors }
        addPalette(palette);
        history.push('/')
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
                palettes={palettes}
                open={open}
                savePalette={savePalette}
                handleDrawerOpen={handleDrawerOpen}
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
                <div className={classes.container}>
                    <Typography variant="h4" gutter="bottom">
                        Design Your Palette
                    </Typography>
                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={clearPalette}
                            className={classes.button}
                        >
                            Clear Palette
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleRandom}
                            disabled={isPaletteFull}
                            className={classes.button}
                        >
                            Random color
                    </Button>
                    </div>
                    <AddColorForm
                        colors={colors}
                        isPaletteFull={isPaletteFull}
                        addColor={addColor}
                    />
                </div>
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
