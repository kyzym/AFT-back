export const orderStatus = Object.freeze({
  NEW: 'new',
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  COOKING: 'cooking',
  READY_TO_DELIVERY: 'readyToDelivery',
  DELIVERING: 'delivering',
  COMPLETED: 'completed',
  CANCELED: 'canceled',
});
export const orderStatuses = Object.values(orderStatus);
