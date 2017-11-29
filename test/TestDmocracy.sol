pragma solidity ^0.4.2;


import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Dmocracy.sol";
import "../contracts/Utils.sol";


contract TestDmocracy {

    bytes32 hash;

    Utils utils;

    function TestDmocracy() public {
        utils = Utils(DeployedAddresses.Utils());
        hash = utils.stringToBytes32('535d219ca6cd93c162f1d0362594c2eb032305109e8746df86d2eaf872011d1a');
    }

    function testNewProposal() public {
        Dmocracy dmocracy = Dmocracy(DeployedAddresses.Dmocracy());

        bytes32 name = utils.stringToBytes32('ProposalTest1');

        bool expected = true;

        Assert.equal(dmocracy.addProposal(name, hash), expected, "The proposal could not be added!");
    }

    function testVote() public {
        Dmocracy dmocracy = Dmocracy(DeployedAddresses.Dmocracy());

        bytes32 name = utils.stringToBytes32('VoteTest1');

        bool expected = true;

        Assert.equal(dmocracy.addProposal(name, hash), expected, "The proposal could not be added!");

        Assert.equal(dmocracy.vote(tx.origin, name), expected, "There was a problem voting!");

        Assert.equal(dmocracy.getProposalVotes(name), 1, "The votes count should be 1!");
    }

    function testRemoveVote() public {
        Dmocracy dmocracy = Dmocracy(DeployedAddresses.Dmocracy());

        bytes32 name = utils.stringToBytes32('VoteTest2');

        bool expected = true;

        Assert.equal(dmocracy.addProposal(name, hash), expected, "The proposal could not be added!");

        Assert.equal(dmocracy.getProposalVotes(name), 0, "The votes count should be 0!");

        Assert.equal(dmocracy.vote(tx.origin, name), expected, "There was a problem voting!");

        Assert.equal(dmocracy.getProposalVotes(name), 1, "The votes count should be 1!");

        Assert.equal(dmocracy.removeVote(tx.origin, name), expected, "There was a problem removing the vote!");

        Assert.equal(dmocracy.getProposalVotes(name), 0, "The votes count should be 0!");
    }

    function testHasProposalBeenVoted() public {
        Dmocracy dmocracy = Dmocracy(DeployedAddresses.Dmocracy());

        bytes32 name = utils.stringToBytes32('HasProposalBeenVotedTest1');

        bool expected = true;

        Assert.equal(dmocracy.addProposal(name, hash), expected, "The proposal could not be added!");

        Assert.equal(dmocracy.hasProposalBeenVoted(tx.origin, name), false, "There was a problem checking a user vote!");

        Assert.equal(dmocracy.vote(tx.origin, name), expected, "There was a problem voting!");

        Assert.equal(dmocracy.hasProposalBeenVoted(tx.origin, name), expected, "There was a problem checking a user vote!");
    }
}
