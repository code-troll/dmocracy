import React, {Component} from 'react'
import IconLabelButtons from './Button'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Timestamp from 'react-timestamp'
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    proposalTitleContainer: {
        padding: '25px 0',
        flexWrap: 'wrap',
        textAlign: 'center'
    },
    proposalTitle: {
        fontSize: '220%'
    },
    proposalDataContainer: {
        padding: '20px',
        display: 'flex',
        flexWrap: 'wrap',
    },
    proposalData: {
        fontSize: '120%'
    },
    proposalDataLabel: {
        fontSize: '120%',
        fontWeight: 'bold',
        paddingRight: '5px'
    },
    proposalButtonContainer: {
        padding: '20px',
        textAlign: 'center'
    }
});

class ProposalDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            proposal: {
                name: '',
                hash: '',
                votes: 0,
                createdAt: '',
                hasBeenVoted: false
            }
        }
    }

    async getProposal(proposalName) {
        const {dmocracyInstance, selectedAccount} = this.props.appState;

        try {
            let proposalData = await dmocracyInstance.getProposal(proposalName);
            let voted = await dmocracyInstance.hasProposalBeenVoted(selectedAccount, proposalName);
            this.setState({
                ...this.state,
                proposal: {
                    name: proposalName,
                    hash: proposalData[1],
                    votes: proposalData[2].toString(),
                    createdAt: proposalData[3],
                    hasBeenVoted: voted
                }
            });
        } catch (error) {
            console.error(`Error loading proposals: ${error}`)
        }
    };

    async handleVote(event) {
        const {dmocracyInstance, selectedAccount} = this.props.appState;

        try {
            console.log('lala');
            let vote = await dmocracyInstance.vote(selectedAccount, this.state.proposal.name, {from: selectedAccount});
            console.log(vote);
            this.setState({
                ...this.state,
                proposal: {
                    hasBeenVoted: vote
                }
            });
        } catch (error) {
            console.error(`Error voting: ${error}`)
        }
    }

    async handleRemoveVote(event) {
        const {dmocracyInstance, selectedAccount} = this.props.appState;

        try {
            let vote = await dmocracyInstance.removeVote(selectedAccount, this.state.proposal.name, {from: selectedAccount});
            this.setState({
                ...this.state,
                proposal: {
                    hasBeenVoted: vote
                }
            });
        } catch (error) {
            console.error(`Error removing vote: ${error}`)
        }
    }

    render() {
        const {classes} = this.props;
        this.getProposal(this.props.appState.currentProposal);
        // this.hasBeenVoted(this.props.appState.currentProposal);

        return (
            <Paper style={{width: '80%', marginLeft: '10%', marginRight: '10%'}}>
                <div className={classes.proposalTitleContainer}>
                    <Typography type="title" component="h2"
                                className={classes.proposalTitle}>{this.state.proposal.name}</Typography>
                </div>
                <Divider/>
                <div className={classes.proposalDataContainer}>
                    <Typography component="h5" className={classes.proposalDataLabel}>Created At:</Typography>
                    <Typography component="h5" className={classes.proposalData}><Timestamp
                        time={this.state.proposal.createdAt}
                        format='full'/> (<Timestamp time={this.state.proposal.createdAt}
                                                    format='ago'/>)</Typography>
                </div>
                <Divider/>
                <div className={classes.proposalDataContainer}>
                    <Typography component="h5" className={classes.proposalDataLabel}>Votes:</Typography>
                    <Typography component="h5" className={classes.proposalData}>{this.state.proposal.votes}</Typography>
                </div>
                <Divider/>
                <div className={classes.proposalDataContainer}>
                    <Typography component="h5" className={classes.proposalDataLabel}>Proposal Hash:</Typography>
                    <Typography component="h5" className={classes.proposalData}>{this.state.proposal.hash}</Typography>
                </div>
                <Divider/>
                <div className={classes.proposalButtonContainer}>
                    {!this.state.proposal.hasBeenVoted ? (<IconLabelButtons text="Vote" onClick={this.handleVote.bind(this)}/>) : (
                        <IconLabelButtons text="Remove Vote" color="accent" type="cancel"
                                          onClick={this.handleRemoveVote.bind(this)}/>)}
                </div>
            </Paper>
        )
    };
}

export default withStyles(styles)(ProposalDetails);