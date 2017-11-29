/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Input, {InputLabel} from 'material-ui/Input';
import {FormControl, FormHelperText} from 'material-ui/Form';
import randonstring from 'randomstring';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%'
    },
    formControl: {
        margin: theme.spacing.unit,
        width: '100%'
    },
    input: {
        width: '100%'
    }
});

class InputTextField extends React.Component {

    render() {
        const {classes} = this.props;

        let inputId = this.props.id;
        if (!inputId || typeof inputId === 'undefined') {
            inputId = randonstring.generate({
                length: 12,
                charset: 'alphabetic'
            });
        }

        let disabled = false;
        if (typeof this.props.disabled !== 'undefined' && this.props.disabled) {
            disabled = true;
        }

        return (
            <div className={classes.container}>
                <FormControl className={classes.formControl} disabled={disabled}>
                    <InputLabel
                        htmlFor={inputId}>{this.props.labelText !== 'undefined' ? this.props.labelText : ''}</InputLabel>
                    <Input className={classes.input} id={inputId} value={this.props.value}
                           onChange={typeof this.props.handleChange !== 'undefined' ? this.props.handleChange : null}/>
                    {this.props.helperText !== 'undefined' ? (
                        <FormHelperText>{this.props.helperText}</FormHelperText>) : null}
                </FormControl>
            </div>
        );
    }
}

InputTextField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputTextField);