export const orderStatus = Object.freeze({
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  COOKING: 'cooking',
  READY_TO_DELIVERY: 'readyToDelivery',
  DELIVERING: 'delivering',
  COMPLETED: 'completed',
  CANCELED: 'canceled',
});

/**
 PATCH: /orders/:orderId/status/:orderStatus
 */
