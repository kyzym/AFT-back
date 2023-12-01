export const normalizeDecimal = (number, decimalPlaces = 2) => {
  var multiplier = Math.pow(10, decimalPlaces);
  var roundedNumber = Math.round(number * multiplier) / multiplier;

  return roundedNumber;
};
