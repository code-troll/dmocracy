import React, {Component} from 'react'
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    homeBottomBar: {
        position: 'fixed',
        zIndex: '99999999',
        bottom: '0',
        left: '0',
        width: '100%',
        backgroundColor: '#3f51b5'
    },
    homeBottomBarCredits: {
        float: 'left',
        marginLeft: '2em',
        color: '#ccc'
    },
    homeBottomBarRepository: {
        float: 'right',
        marginRight: '2em',
        color: '#ccc'
    },
    homeBottomBarLink: {
        color: '#ccc'
    }
});

class AppBottomBar extends Component {

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.homeBottomBar}>
                <p className={classes.homeBottomBarCredits}>Author: Franco Joaquín Carreras </p>
                <p className={classes.homeBottomBarRepository}>GitHub:
                    <a className={classes.homeBottomBarLink}
                       href="https://github.com/code-troll/dmocracy">https://github.com/code-troll/dmocracy</a>
                </p>
            </div>
        )
    };
}

export default withStyles(styles)(AppBottomBar);