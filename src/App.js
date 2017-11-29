// Libraries
import React, {Component} from 'react'
import Contract from 'truffle-contract'

// Contract Abis
import Dmocracy from './contracts/Dmocracy.json'

// Utils
import getWeb3 from './utils/getWeb3'
import promisify from './utils/promisify'

// App
import AppContent from './components/AppContent.js'

export default class App extends Component {
    constructor(props) {
        super(props);

        // Set default state
        this.state = {
            proposals: [],
            availableAccounts: [],
            selectedAccount: undefined,
            dmocracyInstance: undefined,
            errorMessage: undefined,
            web3: undefined,
            // onProposalAdded: this.onProposalAdded.bind(this),
        }
    };

    componentWillMount() {
        this.initialize()
            .then(() => {
                this.watchNewProposals();
                // this.watchVotes();
            })
    };

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
            availableAccounts: accounts,
            selectedAccount: defaultAccount,
            dmocracyInstance,
        });
    };

    watchNewProposals() {
        const {web3, dmocracyInstance} = this.state;

        dmocracyInstance.NewProposal().watch((error, result) => {
            if (!error) {
                // console.log(`Result ${JSON.stringify(result.args)}`);
                // const proposalCreator = result.args.proposal;
                const proposalName = web3.toAscii(result.args.name).replace(/\u0000/g, '');
                // const proposalHash = web3.toAscii(result.args.hash).replace(/\u0000/g, '');
                this.setState({...this.state, proposals: [...this.state.proposals, proposalName]});
                this.log(`New proposal added: ${proposalName}`);
            } else {
                // console.log(`Nooooo! ${error}`);
            }
        })
    };

    log(text) {
        this.setState({...this.state, logs: [...this.state.logs, text]})
    };

    render() {
        return (
            <AppContent appState={this.state}/>
        );
    };
}
