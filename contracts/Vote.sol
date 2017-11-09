pragma solidity ^0.4.0;

import "../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";
//import "./ClassCoin.sol";
//import "./Utils.sol";

contract Vote is Ownable {

    // Array of proposal names
    bytes16[] names;

    // Proposal structure
    struct Proposal {
        bytes32 hash;
        uint256 votes;
    }

    mapping (bytes16 => Proposal) proposals;

    // New Proposal event
    event NewProposal(address creator, bytes16 name, bytes32 hash);

    function addProposal(address creator, bytes16 name, bytes32 hash) public returns (bool) {
        // name must not be empty
        require(name.length != 0);

        // hash must not be empty
        require(hash.length != 0);

        // Require that the proposal has not been initialized
        require(proposals[name].hash.length != 0);

        // The Proposal object is created
        Proposal memory newProposal;
        newProposal.hash = hash;

        // The new proposal is added to the proposals map
        proposals[name] = newProposal;

        // Send a new proposal event
        NewProposal(creator, name, hash);

        return true;
    }

    function Vote(address addr) Ownable(addr) {

    }


}
