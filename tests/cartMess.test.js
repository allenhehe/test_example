// tests/cart.test.js

const Cart = require("../src/cart");
const fs = require("fs");
const path = require("path");

// Mock the file path
const tempFilePath = path.join(__dirname, "../cart_temp.json");

describe("Cart", () => {
  let cart;

  beforeEach(() => {
    // Ensure temp file is empty before each test
    fs.writeFileSync(tempFilePath, "", "utf-8");
    cart = new Cart();
  });

  test("should save line items to file after adding", () => {
    const writeFileSyncSpy = jest.spyOn(fs, "writeFileSync");

    cart.addItem(1, 100, 2);

    // Ensure writeFileSync was called to save the items
    expect(writeFileSyncSpy).toHaveBeenCalledWith(
      tempFilePath,
      expect.any(String),
      "utf-8"
    );

    writeFileSyncSpy.mockRestore();
  });

  test("should apply discount and calculate total price", () => {
    cart.addItem(1, 100, 2); // $100 * 2
    cart.applyDiscount(10); // 10% discount

    const total = cart.calculate();

    expect(total).toBe(180); // 200 - 10% = 180
  });

  test("should load items from temp file on initialization", () => {
    const savedData = JSON.stringify({
      items: [{ id: 1, price: 100, quantity: 2 }],
      discount: 10,
    });
    fs.writeFileSync(tempFilePath, savedData, "utf-8");

    const newCart = new Cart(); // New cart instance, should load from temp file

    expect(newCart.items.length).toBe(1);
    expect(newCart.discount).toBe(10);
  });

  test("should clear temp file and emit event on checkout", () => {
    const writeFileSyncSpy = jest.spyOn(fs, "writeFileSync");
    const dispatchEventSpy = jest.spyOn(window, "dispatchEvent");

    cart.addItem(1, 100, 2);
    cart.addItem(2, 50, 1);
    cart.applyDiscount(10);

    // Trigger checkout
    cart.checkout();

    // Ensure temp file is cleared
    expect(writeFileSyncSpy).toHaveBeenCalledWith(tempFilePath, "", "utf-8");

    // Ensure window.dispatchEvent was called with the correct event
    expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(CustomEvent));
    const event = dispatchEventSpy.mock.calls[0][0];
    expect(event.type).toBe("checkoutComplete");
    expect(event.detail.total).toBe(225); // 250 - 10% = 225

    // Cleanup spies
    writeFileSyncSpy.mockRestore();
    dispatchEventSpy.mockRestore();
  });
});
