class PercentageDiscountCalculator {
  execute(priceBeforeDiscount, percentage) {
    if (percentage < 0 || percentage > 100) {
      throw new Error("Discount percentage must be between 0 and 100");
    }
    const discount = Math.round(priceBeforeDiscount * (percentage / 100));
    return Math.min(discount, priceBeforeDiscount); // Ensure discount doesn't exceed priceBeforeDiscount
  }
}

module.exports = PercentageDiscountCalculator;
