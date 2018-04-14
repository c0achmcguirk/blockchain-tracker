pragma solidity ^0.4.17;

contract Testing {
  address public owner;
  uint public last_completed_migration;
  uint public count;

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
    return "Hello from the Contract boyee";
  }

  // Constructor
  function Testing() public {
    owner = msg.sender;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function addToCount() public {
    count = count + 1;
  }

  function getCount() public constant returns(uint) {
    return count;
  }

  // function setCompleted(uint completed) public restricted {
  //   last_completed_migration = completed;
  // }

  // function upgrade(address new_address) public restricted {
  //   Migrations upgraded = Migrations(new_address);
  //   upgraded.setCompleted(last_completed_migration);
  // }
}
