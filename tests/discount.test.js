// tests/discount.test.js

const calculateDiscountedPrice = require("../src/discount");

describe("Discount Calculation", function () {
  test("should correctly calculate the price after a 15% discount on a price of 100", () => {
    const price = 100;
    const discount = 15;
    const expectedPrice = 85;

    const result = calculateDiscountedPrice(price, discount);

    expect(result).toBe(expectedPrice);
  });

  test("should throw an error for discount greater than 100%", () => {
    expect(() => calculateDiscountedPrice(100, 150)).toThrow(
      "Discount percentage must be between 0 and 100"
    );
  });

  // THE APPLICATION MIGHT FAIL FOR THE FOLLOWING REASON(S):

  // test("the percentage might be calculated as negative for some reason\
  //   and we shouldn't make it more expensive", () => {
  //   const price = 100;
  //   const discount = -15;
  //   const expectedPrice = 100;

  //   const result = calculateDiscountedPrice(price, discount);

  //   expect(result).toBe(expectedPrice);
  // });

  // test("should correctly calculate the discounted price for a price with decimals", () => {
  //   const price = 100.15;
  //   const discount = 15;
  //   const expectedPrice = 85.13;

  //   const result = calculateDiscountedPrice(price, discount);

  //   expect(result).toBe(expectedPrice);
  // });

  // test("should handle very large prices without overflow", () => {
  //   const price = BigInt(9007199254741991); // Number.MAX_SAFE_INTEGER + 1000;
  //   const discount = 10;
  //   const expectedPrice = 900719925474199;

  //   const result = calculateDiscountedPrice(price, discount);

  //   expect(result).toBe(expectedPrice);
  // });
});
