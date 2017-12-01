/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import AppMenuList from './AppMenuList';
import ProposalList from './ProposalList';
import ProposalAdd from './ProposalAdd';
import ProposalDetails from './ProposalDetails';
import AccountSelection from './AccountSelection';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        height: 'calc(100vh - ' + (theme.spacing.unit * 2) + 'px)',
        marginTop: theme.spacing.unit,
        zIndex: 1,
        overflow: 'hidden',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif !important'
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        zIndex: theme.zIndex.navDrawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        width: 60,
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    drawerInner: {
        // Make the items inside not wrap when transitioning:
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: 24,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
    // toolBarRight: {
    //     float: 'right',
    //     width: '92%'
    // },
    applicationTitle: {
        float: 'left'
    },
    accountSelected: {
        // float: 'right'
        position: 'absolute',
        right: '10px'
    }
});

class AppContent extends React.Component {
    constructor(props) {
        super(props);

        this.handleLayerChange = this.handleLayerChange.bind(this);
    }

    state = {
        open: false,
        layer: 'proposalList'
    };

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    handleLayerChange(appLayer) {
        console.log('Current layer: ' + appLayer);
        this.setState({layer: appLayer});
    };

    render() {
        const {classes, theme} = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
                        <Toolbar disableGutters={!this.state.open}>
                            <IconButton
                                color="contrast"
                                aria-label="open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, this.state.open && classes.hide)}
                            >
                                <MenuIcon/>
                            </IconButton>
                            {/*<div className={classes.toolBarRight}>*/}
                                <Typography className={classes.applicationTitle} type="title" color="inherit" noWrap>
                                    Dmocracy
                                </Typography>
                                <Typography className={classes.accountSelected} type="title" color="inherit" noWrap>
                                    Account: {this.props.appState.selectedAccount}
                                </Typography>
                            {/*</div>*/}
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        type="permanent"
                        classes={{
                            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                        }}
                        open={this.state.open}>
                        <div className={classes.drawerInner}>
                            <div className={classes.drawerHeader}>
                                <IconButton onClick={this.handleDrawerClose}>
                                    {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                                </IconButton>
                            </div>
                            <Divider/>
                            <List className={classes.list}><AppMenuList
                                handleLayerChange={this.handleLayerChange}/></List>
                            <Divider/>
                        </div>
                    </Drawer>
                    <main className={classes.content}>
                        <div>
                            {(() => {
                                switch (this.state.layer) {
                                    case "proposalList":
                                        return <ProposalList handleLayerChange={this.handleLayerChange}
                                                             appState={this.props.appState}/>;
                                    case "proposalAdd":
                                        return <ProposalAdd handleLayerChange={this.handleLayerChange}
                                                            appState={this.props.appState}/>;
                                    case "proposalDetails":
                                        return <ProposalDetails handleLayerChange={this.handleLayerChange}
                                                                appState={this.props.appState}/>;
                                    // case "accountSelection":
                                    //     return <AccountSelection handleLayerChange={this.handleLayerChange}
                                    //                              appState={this.props.appState}/>;
                                    default:
                                        return <ProposalList handleLayerChange={this.handleLayerChange}
                                                             appState={this.props.appState}/>;
                                }
                            })()}
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

AppContent.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(AppContent);