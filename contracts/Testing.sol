pragma solidity ^0.4.17;

contract Testing {
  address public owner;
  uint public last_completed_migration;

  struct Property {
    address id;
    string title;
  }

  struct PropertyOwner {
    address id;
    string name;
  }

  mapping(string => Property) properties;
  mapping(string => PropertyOwner) propertyOwners;

  function sayHello() public pure returns (string words) {
    return "Hello from the contract";
  } 

  // Constructor
  function Testing() public {
    owner = msg.sender;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  // function setCompleted(uint completed) public restricted {
  //   last_completed_migration = completed;
  // }

  // function upgrade(address new_address) public restricted {
  //   Migrations upgraded = Migrations(new_address);
  //   upgraded.setCompleted(last_completed_migration);
  // }
}
