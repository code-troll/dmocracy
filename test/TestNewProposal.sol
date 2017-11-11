pragma solidity ^0.4.2;


import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Dmocracy.sol";


contract TestNewProposal {

    function testNewProposalSuccess() public {
        Dmocracy dmocracy = Dmocracy(DeployedAddresses.Dmocracy());

        bytes32 name = 0x50726f706f73616c546573743100000000000000000000000000000000000000;
        //ProposalTest1
        bytes32 hash = 0x3533356432313963613663643933633136326631643033363235393463326562;
        //535d219ca6cd93c162f1d0362594c2eb032305109e8746df86d2eaf872011d1a
        bool expected = true;

        Assert.equal(dmocracy.addProposal(tx.origin, name, hash), expected, "The proposal could not be added!");
    }

    function testNewProposalFailSameName() public {
        Dmocracy dmocracy = new Dmocracy();

        bytes32 name = 0x50726f706f73616c546573743200000000000000000000000000000000000000;
        //ProposalTest2
        bytes32 hash = 0x3533356432313963613663643933633136326631643033363235393463326562;
        //535d219ca6cd93c162f1d0362594c2eb032305109e8746df86d2eaf872011d1a

//        Assert.equal(dmocracy.addProposal(tx.origin, name, hash), true, "The proposal could not be added!");
//        Assert.equal(dmocracy.call.gas(20764)(bytes4(sha3("addProposal(address, bytes32, bytes32)", tx.origin, name, hash))), true, "The proposal was added but shouldn't!");
//        Assert.notEqual(dmocracy.call("addProposal", tx.origin, name, hash), true, "The proposal was added but shouldn't!");
    }

}
