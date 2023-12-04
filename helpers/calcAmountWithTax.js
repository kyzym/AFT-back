import config from '#config/config.js';
import { normalizeDecimal } from './normalizeDecimal.js';

export const calcAmountWithTax = (amount, tax = config.liqpayTax) => {
  return normalizeDecimal(amount / (1 - tax / 100));
};
