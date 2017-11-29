import React, {Component} from 'react';
import Table, {TableBody, TableCell, TableHead, TableFooter, TableRow} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';

export default class AccountSelection extends Component {
    state = {
        height: '300px'
    };

    selectAccount(account) {
        this.props.appState.selectedAccount = account;
    }

    render() {
        const {availableAccounts} = this.props.appState;

        return (
            <Table
                height={this.state.height}
                style={{width: '80%', marginLeft: '10%', marginRight: '10%'}}
            >
                <TableHead>
                    <TableRow>
                        <TableCell tooltip="Proposal Name">Address</TableCell>
                        <TableCell tooltip="Proposal Details" style={{width: '10%'}}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {availableAccounts.map((account, index) => (
                        <TableRow key={index}>
                            <TableCell>{account}</TableCell>
                            <TableCell>
                                <IconButton color="primary" aria-label="Use Account">
                                    <AccountCircle onClick={() => this.selectAccount(account)}/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={2}>
                            {availableAccounts.length} accounts listed
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        );
    }
}
