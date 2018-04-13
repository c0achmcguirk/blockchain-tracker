/**
 * Node module that will perform property-related actions like:
 *   - Register a property (real-estate)
 *   - Update a property
 *   - Merge a property
 *   - Look up a property
 */

"use strict";

const config = require('config');
const Web3 = require('web3'); 

var blockchainConfig = config.get('Blockchain');
var web3;

class PropertyLogic {
  /**
   * Constructor method runs when the calss is initialized.
   */
  constructor() {
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      let url = `http://${ blockchainConfig.host }:${ blockchainConfig.port }`;
      web3 = new Web3(new Web3.providers.HttpProvider(url));
    }
  }

  /**
   * Save a property to the blockchain. It will handle the initial save and the case where you
   * are updating an existing property.
   * @param {string} id The ID of the property. If the property doesn't have an id, leave this as
   *   null or undefined.
   * @param {Object[]} coordinates The GPS coordinates of the property. Only support 4 points now.
   * @param {string} name The name of the property for displaying on a UI.
   * @returns {Property} The updated property.
   */
  save(id, coordinates, name) {
    //no-op
  }

  /**
   * Look up a property on the blockchain based on GPS coordinates (one point)
   * @param {Coordinate} coordinate The GPS coordinates of a point on the map.
   * @returns {Property} The property belonging to that coordinate, or undefined if we don't have
   *   a property belonging to that point.
   */
  getPropertyByCoordinate(coordinate) {
    return undefined;
  }

	/**
   * Look up a property by the id (address) on the blockchain, returning it.
   * @param {string} id The property's unique Id, which is the contract address
   * @returns {Promise<Property>} The property belong to that id, or undefined if we don't have it.
   */
	getPropertyById(id) {
    let promise = new Promise((resolve, reject) => {
      let deployedAddress = "0x39dbc65181c31eae759bbf478608bdb1999f1c98";
      let contract = new web3.eth.Contract([{"constant":true,"inputs":[],"name":"last_completed_migration","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"sayHello","outputs":[{"name":"words","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}], deployedAddress);
      let byteCode = "6060604052341561000f57600080fd5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506102168061005e6000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063445df0ac1461005c5780638da5cb5b14610085578063ef5fb05b146100da575b600080fd5b341561006757600080fd5b61006f610168565b6040518082815260200191505060405180910390f35b341561009057600080fd5b61009861016e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100e557600080fd5b6100ed610193565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561012d578082015181840152602081019050610112565b50505050905090810190601f16801561015a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60015481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61019b6101d6565b6040805190810160405280601781526020017f48656c6c6f2066726f6d2074686520636f6e7472616374000000000000000000815250905090565b6020604051908101604052806000815250905600a165627a7a7230582021a1f373b2d39935f65d3b7bc5e964cc264c0c3ba8ceebf858f82f518d72bfd00029";
      var retValue;
      let ethCoinbase = "0x9F5E71bEA927d29b9c7126a4eD3A57651e7b2D5a";
      contract.methods.sayHello().call({from: ethCoinbase, gas: 5000000}).then((result) => {
        resolve(result);
      });
    });

    return promise;
  }

  /**
   * Tests that we can call the deployed Testing contract and call the sayHello() method
   * @returns {Promise<string>} The string returned from the deployed contract instance.
   */
  getHelloFromTestingContract() {
    let promise = new Promise((resolve, reject) => {
      // output from truffle migrate
      let deployedAddress = "0x39dbc65181c31eae759bbf478608bdb1999f1c98";
      // output from solc --abi contracts/Testing.sol
      let contract = new web3.eth.Contract([{"constant":true,"inputs":[],"name":"last_completed_migration","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"sayHello","outputs":[{"name":"words","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}], deployedAddress);
      // output from solc --bin contracts/Testing.sol
      let byteCode = "6060604052341561000f57600080fd5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506102168061005e6000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063445df0ac1461005c5780638da5cb5b14610085578063ef5fb05b146100da575b600080fd5b341561006757600080fd5b61006f610168565b6040518082815260200191505060405180910390f35b341561009057600080fd5b61009861016e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100e557600080fd5b6100ed610193565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561012d578082015181840152602081019050610112565b50505050905090810190601f16801561015a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60015481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61019b6101d6565b6040805190810160405280601781526020017f48656c6c6f2066726f6d2074686520636f6e7472616374000000000000000000815250905090565b6020604051908101604052806000815250905600a165627a7a7230582021a1f373b2d39935f65d3b7bc5e964cc264c0c3ba8ceebf858f82f518d72bfd00029";
      // copied from ganache UI. May need to change on other systems.
      let ethCoinbase = "0x9F5E71bEA927d29b9c7126a4eD3A57651e7b2D5a";
      contract.methods.sayHello().call({from: ethCoinbase, gas: 5000000}).then((result) => {
        resolve(result);
      });
    });

    return promise;
  }
};

module.exports = PropertyLogic;
