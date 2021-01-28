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
    const { palettes, savePalette, toggleModal } = props;
    const [page, setPage] = useState(0)
    const [name, setName] = useState('')

    useEffect(() => {
        ValidatorForm.addValidationRule('paletteNameUnique', value =>
            palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
        )
    })

    const nextPage = () => {
        setPage(page + 1)
    }

    const handleChange = evt => {
        setName(evt.target.value);
    }

    const handleSavePalette = emoji => {
        savePalette(name, emoji.native)
    }

    return (
        <div>
            <Dialog open={true} onClose={toggleModal} aria-labelledby="form-dialog-title">
                {page === 0 ?
                    <>
                        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                        <ValidatorForm onSubmit={nextPage}>
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
                                <Button onClick={toggleModal} color="primary">
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
                    </>
                    :
                    <>
                        <Picker onSelect={handleSavePalette} />
                    </>
                }
            </Dialog>
        </div>
    );
}

export default NewPaletteModal
