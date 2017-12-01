import React, {Component} from 'react'
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    homeContainer: {
        // position: 'absolute',
        // width: '100px',
        // height: '50px',
        // top: '50%',
        // left: '50%',
        // marginLeft: '-50px', /* margin is -0.5 * dimension */
        // marginTop: '-25px'
    },
    homeTitle: {
        margin: '0',
        position: 'absolute',
        fontSize: '700%',
        top: '25%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    homeSubTitle: {
        margin: '0',
        position: 'absolute',
        fontSize: '200%',
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    homeButton: {
        margin: '0',
        position: 'absolute',
        fontSize: '200%',
        top: '70%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        margin: theme.spacing.unit
    },
    homeBottomBar: {
        position: 'fixed',
        zIndex: '100',
        bottom: '0',
        left: '0',
        width: '100%',
        backgroundColor: 'rgb(63, 81, 181)'
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

class AppHome extends Component {

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.homeContainer}>
                <h1 className={classes.homeTitle}>Dmocracy</h1>
                <h3 className={classes.homeSubTitle}>Safe, reliable, decentralized and worldwide available
                    Democracy!</h3>
                <Button className={classes.homeButton} raised color='primary' onClick={this.props.handleGetInside}>Get
                    Inside</Button>
                <div className={classes.homeBottomBar}>
                    <p className={classes.homeBottomBarCredits}>Author: Franco Joaquín Carreras </p>
                    <p className={classes.homeBottomBarRepository}>GitHub:
                        <a className={classes.homeBottomBarLink}
                           href="https://github.com/code-troll/dmocracy">https://github.com/code-troll/dmocracy</a>
                    </p>
                </div>
            </div>
        )
    };
}

export default withStyles(styles)(AppHome);