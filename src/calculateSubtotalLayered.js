// calculateSubtotal.js

const PercentageDiscountCalculator = require("./utils/PercentageDiscountCalculator.js");
const BonusDiscountCalculator = require("./utils/BonusDiscountCalculator.js");

function calculateSubtotal(lineItems, discount) {
  let tempPrice = 0;

  // sum up item prices
  const subtotal = sumUpPrice(lineItems);
  tempPrice += subtotal

  // handle percentage discount
  const percentageDiscount = (new PercentageDiscountCalculator).execute(tempPrice, discount.percentage);
  tempPrice -= percentageDiscount;

  // handle bonus discount
  const bonusDiscount = (new BonusDiscountCalculator).execute(tempPrice, discount.bonus);
  tempPrice -= bonusDiscount;

  return tempPrice
}

function sumUpPrice(lineItems) {
  return lineItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

module.exports = calculateSubtotal;