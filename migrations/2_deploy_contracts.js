let Utils = artifacts.require("./Utils.sol");
let Dmocracy = artifacts.require("./Dmocracy.sol");

module.exports = function(deployer) {
    deployer.deploy(Utils);
    deployer.deploy(Dmocracy);
};
