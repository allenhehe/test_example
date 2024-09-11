class BonusDiscountCalculator {
  execute(priceBeforeDiscount, bonusValue) {
    return Math.min(bonusValue, priceBeforeDiscount); // Ensure coupon discount doesn't exceed priceBeforeDiscount
  }
}

module.exports = BonusDiscountCalculator;
