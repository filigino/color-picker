import React, { useEffect, useState } from 'react';
import { Picker } from 'emoji-mart'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css'

const NewPaletteModal = props => {
    const { palettes, isModalShowing, savePalette, hideModal } = props;
    const [name, setName] = useState('')

    useEffect(() => {
        ValidatorForm.addValidationRule('paletteNameUnique', value =>
            palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
        )
    })

    const handleChange = evt => {
        setName(evt.target.value);
    }

    const handleSavePalette = () => {
        savePalette(name);
    }

    return (
        <Dialog open={isModalShowing} onClose={hideModal} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
            <ValidatorForm onSubmit={handleSavePalette}>
                <DialogContent>
                    <DialogContentText>
                        Please enter a unique name for your new palette.
                    </DialogContentText>
                    <Picker />
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
                    <Button onClick={hideModal} color="primary">
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
