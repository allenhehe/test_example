// discount.js

function calculateDiscountedPrice(price, discountPercentage) {
  if (discountPercentage > 100) {
    throw new Error("Discount percentage must be between 0 and 100");
  }

  // Calculate the discount and round to the nearest integer for final price
  const discount = Math.round(price * (discountPercentage / 100));
  return price - discount;
}

module.exports = calculateDiscountedPrice;
