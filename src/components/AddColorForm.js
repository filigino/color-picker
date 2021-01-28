import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';

export default class AddColorForm extends Component {
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
        const { isPaletteFull } = this.props;
        const { color, name } = this.state;
        return (
            <div>
                <ChromePicker color={color} onChangeComplete={this.changeColor} />
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator
                        value={name}
                        onChange={this.handleChangeName}
                        validators={['required', 'colorUnique', 'colorNameUnique']}
                        errorMessages={['Required', 'Color already used', 'Name already used']}
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
            </div>
        );
    }
}
