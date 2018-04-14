const assert = require("assert");
const PropertyLogic = require("../libs/propertyLogic");

describe("PropertyLogic", () => {

  var mockContract = {
    methods: {
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

    xdescribe('#getPropertyById', () => {
      it("should return undefined if property id doesn't exist", () => {
        let propertyID = 'bogusID';
        return propertyLogic.getPropertyById(propertyID).then((result) => {
          assert.strictEqual(undefined, result);
        });
      });
    });

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
        return propertyLogic.addToCountFromTestingContract().then((result) => {
          assert.strictEqual('1', result);
        });
      });
    });
  });
});
