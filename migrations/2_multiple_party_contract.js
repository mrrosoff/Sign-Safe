const MultiplePartyContract = artifacts.require("./MultiplePartyContract.sol");

module.exports = function(deployer) {
    deployer.deploy(MultiplePartyContract);
};
