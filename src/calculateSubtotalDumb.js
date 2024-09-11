function calculateSubtotal(lineItems, discount) {
  const res = lineItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return res - discount;
}

module.exports = calculateSubtotal;
