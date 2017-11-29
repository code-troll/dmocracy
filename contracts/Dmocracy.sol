pragma solidity ^0.4.15;


import "../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";


contract Dmocracy is Ownable {

    // Array of proposal names
    bytes32[] names;

    // Proposal structure
    struct Proposal {
    bool initialized;
    bytes32 hash;
    uint256 votes;
    uint256 timestamp;
    mapping (address => bool) voters;
    }

    // Msp of proposals
    mapping (bytes32 => Proposal) proposals;

    // New Proposal event
    event NewProposal(address creator, bytes32 indexed name, bytes32 hash, uint256 timestamp);

    // Vote event
    event Vote(bytes32 proposalName, uint256 votes, address voter);

    // Checks that the proposal data is valid
    modifier proposalIsValid(bytes32 name, bytes32 hash) {
        // name must not be empty
        require(name[0] != 0);

        // hash must not be empty
        require(hash[0] != 0);

        _;
    }

    // Checks that a proposal exists
    modifier proposalExists(bytes32 name) {
        require(proposals[name].initialized);

        _;
    }

    // Checks that a proposal does not exists
    modifier proposalNotExists(bytes32 name) {
        // Require that the proposal has not been initialized
        require(!proposals[name].initialized);

        _;
    }

    // Adds a proposal
    function addProposal(bytes32 name, bytes32 hash) proposalIsValid(name, hash) proposalNotExists(name) public returns (bool success) {
        // The Proposal object is created
        Proposal memory newProposal;
        newProposal.hash = hash;
        newProposal.initialized = true;
        newProposal.timestamp = now;

        // The new proposal is added to the proposals map
        proposals[name] = newProposal;
        names.push(name);

        // Send a new proposal event
        NewProposal(msg.sender, name, hash, newProposal.timestamp);

        return true;
    }

    // Gets all the proposals
    function getProposals() public constant returns (bytes32[]) {
        return names;
    }

    // Get a proposal data
    function getProposal(bytes32 name) public constant returns (bool, bytes32, uint256, uint256) {
        return (proposals[name].initialized, proposals[name].hash, proposals[name].votes, proposals[name].timestamp);
    }

    // Get a proposal hash
    function getProposalHash(bytes32 name) public constant returns (bytes32) {
        return proposals[name].hash;
    }


    // Get a proposal votes
    function getProposalVotes(bytes32 name) public constant returns (uint256) {
        return proposals[name].votes;
    }

    // Checks if a voter has voted a proposal
    function hasProposalBeenVoted(address voter, bytes32 proposalName) proposalExists(proposalName) public constant returns (bool voted) {
        if (proposals[proposalName].voters[voter]) {
            return true;
        }

        return false;
    }

    // Vote a proposal
    function vote(address voter, bytes32 proposalName) proposalExists(proposalName) public returns (bool success) {
        require(!proposals[proposalName].voters[voter]);

        proposals[proposalName].votes++;
        proposals[proposalName].voters[voter] = true;

        // Send a vote event
        Vote(proposalName, proposals[proposalName].votes, voter);

        return true;
    }

    // Remove the vote of a proposal
    function removeVote(address voter, bytes32 proposalName) proposalExists(proposalName) public returns (bool success) {
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
