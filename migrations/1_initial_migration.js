var Migrations = artifacts.require("./Migrations.sol");
var Testing = artifacts.require("./Testing.sol");
var PropertyManager = artifacts.require("./PropertyManager.sol")

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Testing);
  deployer.deploy(PropertyManager);
};
