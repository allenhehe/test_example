// cart.js

const fs = require("fs");
const path = require("path");

// Define a path for the temporary file
const tempFilePath = path.join(__dirname, "cart_temp.json");

class Cart {
  constructor() {
    this.items = [];
    this.discount = 0; // Percentage discount (e.g., 10 for 10%)
    this.loadItemsFromFile(); // Load items from temp file if available
  }

  // Load items from temp file (if available)
  loadItemsFromFile() {
    if (fs.existsSync(tempFilePath)) {
      const data = fs.readFileSync(tempFilePath, "utf-8");
      try {
        const parsedData = JSON.parse(data);
        this.items = parsedData.items || [];
        this.discount = parsedData.discount || 0;
      } catch (e) {
        console.error("Error parsing temp file", e);
      }
    }
  }

  // Save items to temp file
  saveItemsToFile() {
    const data = JSON.stringify(
      { items: this.items, discount: this.discount },
      null,
      2
    );
    fs.writeFileSync(tempFilePath, data, "utf-8");
  }

  // Add a line item (id, price, quantity)
  addItem(id, price, quantity) {
    this.items.push({ id, price, quantity });
    this.saveItemsToFile(); // Save after adding
  }

  // Apply percentage discount
  applyDiscount(percentage) {
    if (percentage < 0 || percentage > 100) {
      throw new Error("Discount must be between 0 and 100");
    }
    this.discount = percentage;
    this.saveItemsToFile(); // Save after applying discount
  }

  // Calculate total price with discount
  calculate() {
    const subtotal = this.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const discountAmount = subtotal * (this.discount / 100);
    return subtotal - discountAmount;
  }

  subtotal() {
    return this.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  discountAmount() {
    return Math.round(this.subtotal() * (this.discount / 100));
  }

  // Checkout: clear the cart and emit a CustomEvent
  checkout() {
    // Clear the temp file
    fs.writeFileSync(tempFilePath, "", "utf-8");

    // Emit a CustomEvent called "checkoutComplete"
    const event = new CustomEvent("checkoutComplete", {
      detail: { total: this.calculate() },
    });
    window.dispatchEvent(event);

    // Clear the in-memory cart
    this.items = [];
    this.discount = 0;
  }
}

module.exports = Cart;
