// tests/customer.test.js

const showCustomerName = require("../src/customer");

describe("showCustomerName", () => {
  test("should display the customer name", () => {
    const customer = { name: "John Doe" };
    const result = showCustomerName(customer);
    expect(result).toBe("Customer name: John Doe");
  });
});
