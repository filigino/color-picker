import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const styles = {
    addColor: {
        fontSize: '2rem',
        marginTop: '1rem',
        padding: '1rem',
        width: '100%'
    },
    colorNameInput: {
        height: '70px',
        width: '100%'
    },
    picker: {
        marginTop: '2rem',
        width: '100% !important'
    }
}

class AddColorForm extends Component {
    constructor(props) {
        super(props);
        this.state = { color: 'teal', name: '' };
    }

    componentDidMount() {
        const { colors } = this.props;
        ValidatorForm.addValidationRule('colorUnique', () =>
            colors.every(c => c.color !== this.state.color)
        );
        ValidatorForm.addValidationRule('colorNameUnique', value =>
            colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
        );
    }

    componentDidUpdate() {
        const { colors } = this.props;
        ValidatorForm.addValidationRule('colorUnique', () =>
            colors.every(c => c.color !== this.state.color)
        );
        ValidatorForm.addValidationRule('colorNameUnique', value =>
            colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
        );
    }

    changeColor = color => {
        this.setState({ color: color.hex });
    };

    handleChangeName = evt => {
        this.setState({ name: evt.target.value });
    };

    handleSubmit = () => {
        if (!this.props.isPaletteFull) {
            const color = { name: this.state.name, color: this.state.color };
            this.props.addColor(color);
            this.setState({ name: '' });
        }
    };

    render() {
        const { isPaletteFull, classes } = this.props;
        const { color, name } = this.state;
        return (
            <div>
                <ChromePicker
                    color={color}
                    onChangeComplete={this.changeColor}
                    className={classes.picker}
                />
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator
                        variant="filled"
                        margin="normal"
                        placeholder="Color Name"
                        value={name}
                        onChange={this.handleChangeName}
                        validators={['required', 'colorUnique', 'colorNameUnique']}
                        errorMessages={['Required', 'Color already used', 'Name already used']}
                        className={classes.colorNameInput}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: isPaletteFull ? 'grey' : color }}
                        type="submit"
                        disabled={isPaletteFull}
                        className={classes.addColor}
                    >
                        {isPaletteFull ? 'Palette full' : 'Add color'}
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}

export default withStyles(styles)(AddColorForm);
