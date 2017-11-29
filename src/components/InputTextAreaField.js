/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import TextArea from 'material-ui/Input/Textarea';
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
    inputLabel: {
        top: '-30px',
        width: '100%'
    },
    textArea: {
        width: '100%',
    }
});

class InputTextAreaField extends React.Component {
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
                <FormControl className={classes.formControl}>
                    <TextArea className={classes.textArea}
                              id={inputId}
                              onChange={typeof this.props.handleChange !== 'undefined' ? this.props.handleChange : null}
                              placeholder={this.props.placeholderText !== 'undefined' ? this.props.placeholderText : ''}
                              rowsMax={20}
                              disabled={disabled}/>
                    {this.props.helperText !== 'undefined' ? (
                        <FormHelperText>{this.props.helperText}</FormHelperText>) : null}
                </FormControl>
            </div>
        );
    }
}

InputTextAreaField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputTextAreaField);