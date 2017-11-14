pragma solidity ^0.4.0;


import "../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";


contract Dmocracy is Ownable {

    // Array of proposal names
    bytes32[] names;

    // Proposal structure
    struct Proposal {
    bool initialized;
    bytes32 hash;
    uint256 votes;
    mapping (address => bool) voters;
    }

    // Msp of proposals
    mapping (bytes32 => Proposal) proposals;

    // New Proposal event
    event NewProposal(address creator, bytes32 indexed name, bytes32 hash);

    // Vote event
    event Vote(bytes32 proposalName, uint256 votes, address voter);

    function addProposal(bytes32 name, bytes32 hash) public returns (bool success) {
        // name must not be empty
        require(name[0] != 0);

        // hash must not be empty
        require(hash[0] != 0);

        // Require that the proposal has not been initialized
        require(!proposals[name].initialized);

        // The Proposal object is created
        Proposal memory newProposal;
        newProposal.hash = hash;
        newProposal.initialized = true;

        // The new proposal is added to the proposals map
        proposals[name] = newProposal;
        names.push(name);

        // Send a new proposal event
        NewProposal(msg.sender, name, hash);

        return true;
    }

    function getProposals() public constant returns (bytes32[]) {
        return names;
    }

    function getProposal(bytes32 name) public constant returns (bool, bytes32, uint256) {
        return (proposals[name].initialized, proposals[name].hash, proposals[name].votes);
    }

    function getProposalHash(bytes32 name) public constant returns (bytes32) {
        return proposals[name].hash;
    }

    function getProposalVotes(bytes32 name) public constant returns (uint256) {
        return proposals[name].votes;
    }

    function vote(address voter, bytes32 proposalName) public returns (bool success) {
        require(proposals[proposalName].initialized);

        require(!proposals[proposalName].voters[voter]);

        proposals[proposalName].votes++;
        proposals[proposalName].voters[voter] = true;

        // Send a vote event
        Vote(proposalName, proposals[proposalName].votes, voter);

        return true;
    }

    function removeVote(address voter, bytes32 proposalName) public returns (bool success) {
        require(proposals[proposalName].initialized);

        require(proposals[proposalName].voters[voter]);

        proposals[proposalName].votes--;
        proposals[proposalName].voters[voter] = false;

        // Send a vote event
        Vote(proposalName, proposals[proposalName].votes, voter);

        return true;
    }

    function Dmocracy() Ownable() public {
    }


}
