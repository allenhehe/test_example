const calculateSubtotal = require("../src/calculateSubtotalLayered.js");
const { itemDetails, discountDetails } = require("./utils/data");

describe("calculateSubtotal", () => {
  test("test with hard-to-follow setup", () => {
    const totalResult = calculateSubtotal(itemDetails, discountDetails); // Reach out other files to get details
    const expectedResult = 205;

    console.log(`Line Items: ${JSON.stringify(itemDetails)}`); // Unnecessary prints
    console.log(`Discounts: ${JSON.stringify(discountDetails)}`);

    expect(totalResult).toBe(expectedResult);
  });
});
