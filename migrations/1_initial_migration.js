var Migrations = artifacts.require("./Migrations.sol");
var Testing = artifacts.require("./Testing.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Testing);
};
