import React, {Component} from 'react';
import Table, {TableBody, TableCell, TableHead, TableFooter, TableRow} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';

export default class ProposalList extends Component {
    state = {
        fixedHeader: true,
        fixedFooter: true,
        selectable: true,
        multiSelectable: false,
        height: '300px',
        proposalVotes: []
    };

    constructor(props) {
        super(props);
        this.state = {
            values: [],
            proposals: [],
            proposalVotes: []
        }
    }

    onVoteClicked(event) {
        const {onVote} = this.props;
        console.log(this.state);
        if (this.state.values.length !== 0) {
            onVote(this.state.values);
            this.clearForm();
        }
    }

    handleChange(event) {
        let checked = event.target.checked;
        console.log(event.target.id);
        if (checked) {
            this.state.values.push(event.target.id);
        } else {
            let index = this.state.values.indexOf(event.target.id);
            this.state.values.splice(index, 1);
        }
        console.log(this.state.values);
    }

    clearForm() {
        this.setState({
            values: []
        })
    }

    async loadProposals() {
        const {web3, dmocracyInstance} = this.props.appState;

        try {
            const proposalsInBytes32 = await dmocracyInstance.getProposals();
            const proposals = proposalsInBytes32.map((name) => web3.toAscii(name).replace(/\u0000/g, ''));
            this.setState({proposals});
        } catch (error) {
            console.error(`Error loading proposals: ${error}`)
        }
    };

    viewProposal(proposal) {
        this.props.appState.currentProposal = proposal;
        this.props.handleLayerChange('proposalDetails');
    }

    render() {
        this.loadProposals();

        return (
            <Table
                height={this.state.height}
                style={{width: '80%', marginLeft: '10%', marginRight: '10%'}}
            >
                <TableHead>
                    <TableRow>
                        <TableCell tooltip="Proposal Name">Name</TableCell>
                        <TableCell tooltip="Proposal Details" style={{width: '10%'}}>Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.proposals.map((proposal, index) => (
                        <TableRow key={index}>
                            <TableCell>{proposal}</TableCell>
                            <TableCell>
                                <IconButton color="primary" aria-label="Proposal details">
                                    <Visibility style={{fontSize: '150% !important'}} onClick={() => this.viewProposal(proposal)}/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={2}>
                            {this.state.proposals.length} proposals listed
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        );
    }
}
