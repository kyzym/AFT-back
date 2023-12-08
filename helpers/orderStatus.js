import { orderStatuses } from '#constants/orderStatus.js';

export const getOrderStatusByIndex = (index) => orderStatuses.at(index);
export const getOrderCodeByValue = (value) => orderStatuses.indexOf(value);
