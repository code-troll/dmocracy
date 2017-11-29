pragma solidity ^0.4.15;


contract Utils {

    function stringToBytes32(string memory source) public constant returns (bytes32 result) {
        assembly {
        result := mload(add(source, 32))
        }
    }

    function stringToBytes16(string memory source) public constant returns (bytes16 result) {
        assembly {
        result := mload(add(source, 16))
        }
    }

    function Utils() public {

    }
}
