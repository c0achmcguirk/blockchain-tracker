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
var web3;

var blockchainConfig = config.get('Blockchain');
var contractBin      = config.get('TestContract.bin');
var contractAbi      = config.get('TestContract.abi');
var fromAddress      = config.get('fromAddress');

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
      resolve(undefined);
    });

    return promise;
  }

  /**
   * Tests that we can call the deployed Testing contract and call the sayHello() method
   * @returns {Promise<string>} The string returned from the deployed contract instance.
   */
  getHelloFromTestingContract() {
    let promise = new Promise((resolve, reject) => {
      let contract = new web3.eth.Contract(contractAbi);
      contract.deploy({data: contractBin})
      .send({
        from     : fromAddress,
        gas      : 1500000,
        gasPrice : '30000000000000'
      })
      .then(function(newContractInstance) {
        newContractInstance.methods.sayHello().call({from: fromAddress, gas: 5000000}).then((result) => {
          resolve(result);
        });
      });
    });

    return promise;
  }

  /**
   * Tests that we can update the state of the contract's count variable
   * and can fetch the update count.
   * @returns {Promise<string>} The string returned represents the uint count.
  */
  addToCountFromTestingContract() {
    let promise = new Promise((resolve, reject) => {
      let contract = new web3.eth.Contract(contractAbi);
      contract.deploy({data: contractBin})
      .send({
        from      : fromAddress,
        gas       : 1500000,
        gasPrice  : '30000000000000'
      })
      .then(function(newContractInstance) {
        newContractInstance.methods.addToCount().send({from: fromAddress}).then((result) => {
          newContractInstance.methods.getCount().call({from: fromAddress, gas: 500000}).then((result) => {
            resolve(result);
          });
        })

      });
    });

    return promise;
  }
};

module.exports = PropertyLogic;
