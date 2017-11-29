// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AccountCircle from 'material-ui-icons/AccountBox';
import PollIcon from 'material-ui-icons/Poll';
import ListIcon from 'material-ui-icons/List';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        background: theme.palette.background.paper,
    },
});

class AppMenuList extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <List>
                    <ListItem button onClick={() => this.props.handleLayerChange('proposalList')}>
                        <ListItemIcon>
                            <ListIcon/>
                        </ListItemIcon>
                        <ListItemText primary="List Proposals"/>
                    </ListItem>
                    <ListItem button onClick={() => this.props.handleLayerChange('proposalAdd')}>
                        <ListItemIcon>
                            <PollIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Create Proposal"/>
                    </ListItem>
                    {/*<Divider/>*/}
                    {/*<ListItem button onClick={() => this.props.handleLayerChange('accountSelection')}>*/}
                        {/*<ListItemIcon>*/}
                            {/*<AccountCircle/>*/}
                        {/*</ListItemIcon>*/}
                        {/*<ListItemText primary="Choose Account"/>*/}
                    {/*</ListItem>*/}
                </List>
            </div>
        );
    }
}

AppMenuList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppMenuList);