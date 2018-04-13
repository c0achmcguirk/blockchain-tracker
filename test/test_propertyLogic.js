const assert = require("assert");
const PropertyLogic = require("../libs/propertyLogic");

describe("PropertyLogic", () => {
  describe("Getting Values", () => {
    var someVal = "foo";
		var propertyLogic = new PropertyLogic;

    describe("#getPropertyById", () => {
      it("should return undefined if the property doesn't exist", () => {
        let propertyId = "bogus";
        let returnValue = propertyLogic.getPropertyById(propertyId);
        assert.strictEqual(undefined, returnValue);
      }); 
    });
  });
});
