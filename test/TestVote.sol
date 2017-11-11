pragma solidity ^0.4.2;


import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Dmocracy.sol";


contract TestVote {

    function testVoteSuccess() public {
        Dmocracy dmocracy = Dmocracy(DeployedAddresses.Dmocracy());

        // name = VoteTest1
        bytes32 name = 0x566f746554657374310000000000000000000000000000000000000000000000;
        // hash = 535d219ca6cd93c162f1d0362594c2eb032305109e8746df86d2eaf872011d1a
        bytes32 hash = 0x3533356432313963613663643933633136326631643033363235393463326562;
        bool expected = true;

        Assert.equal(dmocracy.addProposal(tx.origin, name, hash), expected, "The proposal could not be added!");

        Assert.equal(dmocracy.vote(tx.origin, name), expected, "There was a problem voting!");

        Assert.equal(dmocracy.getProposalVotes(name), 1, "The votes count should be 1!");
    }
}
