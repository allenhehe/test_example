const calculateSubtotal = require('../src/calculateSubtotalLayered.js');
const PercentageDiscountCalculator = require('../src/utils/PercentageDiscountCalculator.js');
const BonusDiscountCalculator = require('../src/utils/BonusDiscountCalculator.js');
jest.mock("../src/utils/PercentageDiscountCalculator.js");
jest.mock("../src/utils/BonusDiscountCalculator.js");

describe("calculateSubtotal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("brittle tests", () => {
    const lineItems = [
      { price: 100, quantity: 2 }, // $100 * 2 = $200
      { price: 50, quantity: 1 }, // $50 * 1 = $50
    ];
    const discount = {
      percentage: 10, // 10% discount
      bonus: 20, // $20 bonus discount
    };

    // // Call the function
    const total = calculateSubtotal(lineItems, discount);
    
    // Ensure utils class method is called with the correct arguments
    expect(PercentageDiscountCalculator.mock.instances[0].execute).toHaveBeenCalledWith(250, 10)
    // PercentageDiscountCalculator.mock.instances[0].execute.mockReturnValue(225)
  });

  test("no brittle tests", () => {
    // const lineItems = [
    //   { price: 100, quantity: 2 }, // $100 * 2 = $200
    //   { price: 50, quantity: 1 }, // $50 * 1 = $50
    // ];
    // const discount = {
    //   percentage: 10, // 10% discount
    //   bonus: 20, // $20 bonus discount
    // };

    // // // Call the function
    // const total = calculateSubtotal(lineItems, discount);

    // // // Assert the final total
    // expect(total).toBe(205);
  });
});
