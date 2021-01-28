import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const NewPaletteModal = props => {
    const [name, setName] = useState('')
    const [open, setOpen] = useState(true)

    useEffect(() => {
        ValidatorForm.addValidationRule('paletteNameUnique', value =>
            props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
        )
    })

    const handleChange = evt => {
        setName(evt.target.value);
    }

    const handleSavePalette = () => {
        props.savePalette(name);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
            <ValidatorForm onSubmit={handleSavePalette}>
                <DialogContent>
                    <DialogContentText>
                        Please enter a unique name for your new palette.
                        </DialogContentText>
                    <TextValidator
                        value={name}
                        onChange={handleChange}
                        label="Palette Name"
                        fullWidth
                        margin="normal"
                        validators={['required', 'paletteNameUnique']}
                        errorMessages={['Required', 'Name already used']}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                        </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Save Palette
                        </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
    );
}

export default NewPaletteModal
