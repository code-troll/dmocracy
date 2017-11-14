// Libraries
import React, {Component} from 'react'
import Contract from 'truffle-contract'

// Contract Abis
import Dmocracy from './contracts/Dmocracy.json'

// Utils
import getWeb3 from './utils/getWeb3'
import promisify from './utils/promisify'

// Components
import AddProposalForm from './components/AddProposalForm'
import Header from './components/Header'
import LogsList from './components/LogsList'
import ProposalsList from './components/ProposalsList'

const styles = {
    main: {
        'maxWidth': '80%',
        'margin': '0 auto',
    },
};

export default class App extends Component {
    constructor(props) {
        super(props);

        // Set default state
        this.state = {
            proposals: [],
            logs: [],
            defaultAccount: undefined,
            dmocracyInstance: undefined,
            errorMessage: undefined,
            web3: undefined,
        }
    }

    componentWillMount() {
        this.initialize()
            .then(() => {
                this.watchNewProposals();
                // this.watchVotes();
            })
    }

    async initialize() {
        const {web3} = await getWeb3;

        // Create dmocracy entity from contract abi
        const dmocracy = Contract(Dmocracy);
        dmocracy.setProvider(web3.currentProvider);

        const accounts = await promisify(web3.eth.getAccounts);
        const defaultAccount = accounts[0];

        const dmocracyInstance = await dmocracy.deployed();

        this.setState({
            ...this.state,
            web3,
            defaultAccount,
            dmocracyInstance,
        });

        this.loadProposals();
    }

    async loadProposals() {
        const {web3, dmocracyInstance, defaultAccount} = this.state;

        console.log(`It's about to load proposals from account ${defaultAccount}`);
        console.log(`Dmocracy instance address: ${dmocracyInstance.address}`);

        try {
            const proposalsInBytes32 = await dmocracyInstance.getProposals();
            const proposals = proposalsInBytes32.map((name) => web3.toAscii(name).replace(/\u0000/g, ''));
            this.setState({
                ...this.state,
                proposals,
            })
        } catch (error) {
            console.error(`Error loading proposals: ${error}`)
        }
    }

    watchNewProposals() {
        const {web3, dmocracyInstance} = this.state;

        dmocracyInstance.NewProposal().watch((error, result) => {
            if (error) {
                console.log(`Nooooo! ${error}`);
            } else {
                console.log(`Result ${JSON.stringify(result.args)}`);
                // const proposalCreator = result.args.proposal;
                const proposalName = web3.toAscii(result.args.name).replace(/\u0000/g, '');
                // const proposalHash = web3.toAscii(result.args.hash).replace(/\u0000/g, '');
                this.setState({...this.state, proposals: [...this.state.proposals, proposalName]});
                this.log(`New proposal added: ${proposalName}`);
            }
        })
    }

    // watchVotes() {
    //     const {web3, dmocracyInstance} = this.state;
    //
    //     dmocracyInstance.Vote().watch((error, result) => {
    //         if (error) {
    //             console.log(`Nooooo! ${error}`);
    //         } else {
    //             console.log(`Result ${JSON.stringify(result.args)}`);
    //             const {votesCount, index, proposal} = result.args;
    //             this.log(`${proposal} has ${votesCount} votes`);
    //         }
    //     })
    // }

    log(text) {
        this.setState({...this.state, logs: [...this.state.logs, text]})
    }

    onProposalAdded(name, hash) {
        const {dmocracyInstance, defaultAccount} = this.state;
        console.log(`
    It's about upload a new proposal: ${name}.
    The default account is ${defaultAccount}
    The dmocracy instance address is ${dmocracyInstance.address}
    `);
        dmocracyInstance.addProposal(name, hash, {from: defaultAccount})
    }

    onVote(proposals) {
        const {dmocracyInstance, defaultAccount} = this.state;
        dmocracyInstance.vote({from: defaultAccount}, proposals);
    }

    onRemoveVote(proposals) {
        const {dmocracyInstance, defaultAccount} = this.state;
        dmocracyInstance.removeVote({from: defaultAccount}, proposals);
    }

    render() {
        return (
            <div style={styles.main}>
                <Header/>
                <hr/>
                {this.state.errorMessage ? <h3>{this.state.errorMessage}</h3> :
                    <ProposalsList proposals={this.state.proposals} onVote={this.onVote.bind(this)}/>}
                <hr/>
                <AddProposalForm onProposalAdded={this.onProposalAdded.bind(this)}/>
                <hr/>
                <LogsList logs={this.state.logs}/>
            </div>
        )
    }
}
