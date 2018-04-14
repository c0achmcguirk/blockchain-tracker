const assert = require("assert");
const PropertyLogic = require("../libs/propertyLogic");

describe("PropertyLogic", () => {
  describe("Getting Values", () => {
    var someVal = "foo";
		var propertyLogic = new PropertyLogic;

    describe('#getHelloFromContract', () => {
      it("should return 'Hello from contract' when talking to the contract", () => {
        // with mocha/assert, when testing promises you need to return a promise in your test
        return propertyLogic.getHelloFromTestingContract().then((result) => {
          assert.strictEqual("Hello from the Contract boyee", result);
        });
      }); 
    });
  });
});
