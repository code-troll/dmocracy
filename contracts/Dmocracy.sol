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
    event NewProposal(address creator, bytes32 name, bytes32 hash);

    function addProposal(address creator, bytes32 name, bytes32 hash) public returns (bool success) {
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

        // Send a new proposal event
        NewProposal(creator, name, hash);

        return true;
    }

    function getProposal(bytes32 name) public constant returns (bytes32, uint256) {
        return (proposals[name].hash, proposals[name].votes);
    }

    function getProposalVotes(bytes32 name) public constant returns (uint256) {
        return proposals[name].votes;
    }

    function vote(address voter, bytes32 proposalName) public returns (bool success) {
        require(proposals[proposalName].initialized);

        require(!proposals[proposalName].voters[voter]);

        proposals[proposalName].votes++;
        proposals[proposalName].voters[voter] = true;

        return true;
    }

    function removeVote(address voter, bytes32 proposalName) {

    }

    function Dmocracy() Ownable() public {
    }


}
