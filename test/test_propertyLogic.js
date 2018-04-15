const assert = require("assert");
const PropertyLogic = require("../libs/propertyLogic");

describe("PropertyLogic", () => {

  var mockContract = {
    methods: {
      getPropertyById() {
        return {
          call() {
            return new Promise((resolve, reject) => {
              resolve({
                id: '123abc',
                name: 'Creamery Building',
                owner: 'Real Building, LLC',
                address: '701 P St, Lincoln, NE 68502',
                top_long: '40.814649',
                left_lat: '-96.711242',
                bottom_long: '40.814239',
                right_lat: '-96.710925',
              });
            });
          }
        };
      },
      getPropertyAt() {
        return {
          call() {
            return new Promise((resolve, reject) => {
              resolve({
                id: '789xyz',
                owner: 'Joe Smith',
                address: '',
                top_long: '40.814651',
                left_lat: '-96.709817',
                bottom_long: '40.814248',
                right_lat: '-96.709621'
              })
            });
          }
        };
      },
      getProperty() {
        return {
          call() {
            return new Promise((resolve, reject) => {
              resolve({
                id: '123abc',
                name: 'Creamery Building',
                owner: 'Real Building, LLC',
                address: '701 P St, Lincoln, NE 68502',
                top_long: '40.814649',
                left_lat: '-96.711242',
                bottom_long: '40.814239',
                right_lat: '-96.710925',
              })
            })
          }
        }
      },
      sayHello() {
        return {
          call() {
            return new Promise((resolve, reject) => {
              resolve('hi');
            });
          }
        };
      },
      addToCount() {
        return {
          send() {
            return new Promise((resolve, reject) => {
              resolve();
            });
          }
        };
      },
      getCount() {
        return {
          call() {
            return new Promise((resolve, reject) => {
              resolve('1');
            });
          }
        };
      }
    }
  };

  describe("Getting Values", () => {
    var someVal = "foo";
		var propertyLogic = new PropertyLogic;

    xdescribe('#saveProperty', () => {
      // helper to create a save for manual testing
      it("should return the created property", () => {
        let topLeft = { latitude: '40.814649', longitude: '-96.711242' }
        let bottomRight = { latitude: '40.814239', longitude: '-96.710925' }
        let name = 'Creamery Building'

        return propertyLogic.saveProperty(topLeft, bottomRight, name).then((result) => {
          propertyLogic.getPropertyHistory(2).then((result) => {
            console.log(result);
          })
        })
      })
    })

    describe('#getPropertyById', () => {
      xit("should return undefined if property id doesn't exist", () => {
        let propertyId = 'bogusID';
        return propertyLogic.getPropertyById(propertyId).then((result) => {
          assert.strictEqual(undefined, result);
        });
      });

      it("should return a property if property is found", () => {
        propertyLogic._contractInstance = mockContract;
        let propertyId = "123abc";
        return propertyLogic.getPropertyById(propertyId).then((result) => {
          assert.strictEqual("123abc", result.id);
          assert.strictEqual("Creamery Building", result.name);
          assert.strictEqual("Real Building, LLC", result.owner);
          assert.strictEqual("701 P St, Lincoln, NE 68502", result.address);
          assert.strictEqual("40.814649", result.top_long);
          assert.strictEqual("-96.711242", result.left_lat);
          assert.strictEqual("40.814239", result.bottom_long);
          assert.strictEqual("-96.710925", result.right_lat);
        })
      })
    });

    describe('#getPropertyByCoordinate', () => {
      it("should return a property if property is found", () => {
        propertyLogic._contractInstance = mockContract;
        let lat = '40.814351';
        let long = '-96.709517';
        return propertyLogic.getPropertyByCoordinate(lat, long).then((result) => {
          assert.strictEqual("789xyz", result.id);
        })
      })
    })

    describe('#getHelloFromContract', () => {
      it("should return 'Hello from contract' when talking to the contract", () => {
        propertyLogic._contractInstance = mockContract;
        // with mocha/assert, when testing promises you need to return a promise in your test
        return propertyLogic.getHelloFromTestingContract().then((result) => {
          assert.strictEqual("hi", result);
        });
      });
    });

    describe('#addToCountFromTestingContract', () => {
      it("should return 1 when adding to the count", () => {
        propertyLogic._contractInstance = mockContract;
        return propertyLogic.addToCountFromTestingContract().then((result) => {
          assert.strictEqual('1', result);
        });
      });
    });
  });
});
