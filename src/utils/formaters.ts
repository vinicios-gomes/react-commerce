export const formatPrice = (price) => {
  return (
    "R$ " +
    parseFloat(price)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
  );
};
