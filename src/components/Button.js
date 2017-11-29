// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import Done from 'material-ui-icons/Done';
import Cancel from 'material-ui-icons/Cancel';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

function IconLabelButtons(props) {
    const {classes} = props;
    return (
        <div>
            <Button className={classes.button} raised
                    color={typeof props.color !== 'undefined' ? props.color : 'primary'} onClick={props.onClick}>
                {(() => {
                   switch (props.type) {
                       case 'done':
                           return <Done className={props.classes.leftIcon}/>;
                       case 'cancel':
                           return <Cancel className={props.classes.leftIcon}/>;
                       default:
                           return <Done className={props.classes.leftIcon}/>;
                   }
                })()}
                {props.text}
            </Button>
        </div>
    );
}

IconLabelButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLabelButtons);