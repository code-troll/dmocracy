pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Utils.sol";

contract TestUtils {

    function testStringToBytes32Success() public {
        Utils utils = Utils(DeployedAddresses.Utils());

        bytes32 expected = 0x5574696c73427974657333325465737453756363657373000000000000000000;

        Assert.equal(utils.stringToBytes32('UtilsBytes32TestSuccess'), expected, "The bytes32 aren't equals!");
    }

    function testStringToBytes32Fail() public {
        Utils utils = Utils(DeployedAddresses.Utils());

        bytes32 expected = 0x5574696c73427974657333325465737453756363657373000000000000000000;

        Assert.notEqual(utils.stringToBytes32('UtilsBytes32TestFail'), expected, "The bytes32 are equals!");
    }

    function testStringToBytes16Success() public {
        Utils utils = Utils(DeployedAddresses.Utils());

        bytes16 expected = 0x00000000000000000000000000000017;

        Assert.equal(utils.stringToBytes16('UtilsBytes16TestSuccess'), expected, "The bytes16 aren't equals!");
    }

    function testStringToBytes16Fail() public {
        Utils utils = Utils(DeployedAddresses.Utils());

        bytes16 expected = 0x00000000000000000000000000000017;

        Assert.notEqual(utils.stringToBytes16('UtilsBytes16TestFail'), expected, "The bytes16 are equals!");
    }

}
