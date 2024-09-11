const calculateSubtotal = require("../src/calculateSubtotalDumb");

describe("calculateSubtotal", () => {
  test("should ensure that reduce is used", () => {
    const lineItems = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 4 },
    ];

    // Spy on Array.prototype.reduce to check if it's called
    const reduceSpy = jest.spyOn(Array.prototype, "reduce");

    calculateSubtotal(lineItems);

    // Check if 'reduce' was called
    expect(reduceSpy).toHaveBeenCalled();

    reduceSpy.mockRestore();
  });
});
