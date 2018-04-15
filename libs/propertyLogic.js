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
var fixnumFactor     = config.get('fixnumFactor');

var deployedAddress = '0xF15AF929e804ca1de5dc11C423911E8482Cee99B';

class PropertyLogic {

  /**
   * Constructor method runs when the calss is initialized.
   */
  constructor() {
    this._contractInstance = undefined;

    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      let url = `http://${ blockchainConfig.host }:${ blockchainConfig.port }`;
      web3 = new Web3(new Web3.providers.HttpProvider(url));
    }
  }

  /**
   * @returns {Promise<ContractInstance>} the contract needed by this class.
  */
  getContractInstance() {
    return new Promise((resolve, reject) => {
      if(this._contractInstance) {
        resolve(this._contractInstance);
      } else {
        let contract = new web3.eth.Contract(contractAbi);
        if(deployedAddress) {
          contract.options.address = deployedAddress;
          this._contractInstance = contract;
          resolve(contract);
        } else {
          contract.deploy({data: contractBin})
          .send({
            from     : fromAddress,
            gas      : 1500000,
            gasPrice : '300'
          }).then((instance) => {
            this._contractInstance = instance;
            resolve(instance);
          });
        }
      }
    });
  }

  /**
   * Save a property to the blockchain. It will handle the initial save and the case where you
   * are updating an existing property.
   * @param {string} id The ID of the property. If the property doesn't have an id, leave this as
   *   null or undefined.
   * @param {Object} topLeft The top left GPS coordinates of the property. { latitude: 40.23443, longitude: -96.2343 }
   * @param {Object} bottomRight The bottom right GPS coordinates of the property. { latitude: 40.244l3, longitude: -96.1232 }
   * @param {string} name The name of the property for displaying on a UI.
   * @returns {Property} The updated property.
   */
  saveProperty(topLeft, bottomRight, name) {
    //no-op
    let leftLat = topLeft.latitude * fixnumFactor;
    let topLong = topLeft.longitude * fixnumFactor;
    let rightLat = bottomRight.latitude * fixnumFactor;
    let bottomLong = bottomRight.longitude * fixnumFactor;

    let promise = new Promise((resolve, reject) => {
      this.getContractInstance()
      .then((newContractInstance) => {
        newContractInstance.methods.addProperty(leftLat, rightLat, topLong, bottomLong)
        .send({from: fromAddress, gas: 500000}).then((result) => {
          // In the event we need the return property values here is a way to get them via the event.
          // Don't forget to modify the lat longs from their fixnum with the fixnumFactor
          // result.events.PropertyAdded.returnValues
          resolve(result);
        })
      })
    })

    return promise;
  }

  /**
   * Look up a property on the blockchain based on GPS coordinates (one point)
   * @param {Coordinate} coordinate The GPS coordinates of a point on the map.
   * @returns {Property} The property belonging to that coordinate, or undefined if we don't have
   *   a property belonging to that point.
   */
  getPropertyByCoordinate(latitude, longitude) {
    let latitudeFixnum = latitude * fixnumFactor;
    let longitudeFixnum = longitude * fixnumFactor;

    let promise = new Promise((resolve, reject) => {
      this.getContractInstance()
      .then((newContractInstance) => {
        newContractInstance.methods.getPropertyAt(latitudeFixnum, longitudeFixnum).call({from: fromAddress, gas: 500000}).then((result) => {
          resolve(result);
        });
      });
    });

    return promise;
  }

	/**
   * Look up a property by the id (address) on the blockchain, returning it.
   * @param {string} id The property's unique Id, which is the contract address
   * @returns {Promise<Property>} The property belong to that id, or undefined if we don't have it.
   */
	getPropertyById(id) {
    let promise = new Promise((resolve, reject) => {
      this.getContractInstance()
      .then(function(newContractInstance) {
        newContractInstance.methods.getProperty(id).call({from: fromAddress, gas: 5000000}).then((result) => {
          resolve(result);
        }).catch((err) => {
          console.log(err);
        });
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
      this.getContractInstance()
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
      this.getContractInstance()
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
