import React, {Component} from 'react'
import IconLabelButtons from './Button'
import InputTextField from './InputTextField'
import InputTextAreaField from './InputTextAreaField'
import ProgressBar from './ProgressBar'
import CryptoJs256 from 'crypto-js/sha256'

export default class ProposalAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            name: '',
            hash: '',
        }
    }

    onProposalInputNameChange(event) {
        const {target} = event;
        const {value} = target;
        this.setState({
            ...this.state,
            name: value,
        })
    }

    onProposalInputHashChange(event) {
        const {target} = event;
        const {value} = target;
        let valueHashed = '';
        if (value !== '') {
            valueHashed = CryptoJs256(value).toString();
        }
        this.setState({
            ...this.state,
            hash: valueHashed
        })
    }

    onAddButtonClick() {
        const {name, hash} = this.state;
        if (name !== "" && hash !== "") {
            this.state.loading = true;
            this.onProposalAdded(name, hash);
            this.props.handleLayerChange('proposalList');
        }
    };

    async onProposalAdded(name, hash) {
        console.log(this.props.appState);
        const {dmocracyInstance, defaultAccount} = this.props.appState;
        console.log(`
            It's about upload a new proposal: ${name}.
            The default account is ${defaultAccount}
            The dmocracy instance address is ${dmocracyInstance.address}
        `);
        await dmocracyInstance.addProposal(name, hash, {from: defaultAccount})
    };

    render() {
        return (
            <div style={{width: '80%', marginLeft: '10%', marginRight: '10%'}}>
                <InputTextField labelText="Proposal Name" disabled={this.state.loading}
                                handleChange={this.onProposalInputNameChange.bind(this)}/>
                <br/>
                <InputTextField labelText="Proposal Constitution Hash"
                                helperText="This hash will prevent any modification of the constitution of the proposal once is created"
                                disabled={true}
                                value={this.state.hash}/>
                <br/>
                <InputTextAreaField placeholderText="Proposal Constitution"
                                    disabled={this.state.loading}
                                    handleChange={this.onProposalInputHashChange.bind(this)}/>
                <br/>
                {this.state.loading ? (<ProgressBar/>) : (
                    <IconLabelButtons text="Save" onClick={this.onAddButtonClick.bind(this)}/>)}
            </div>
        )
    };
}