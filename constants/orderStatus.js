export const orderStatus = Object.freeze({
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  COOKING: 'cooking',
  READYTODELIVERY: 'readyToDelivery',
  DELIVERING: 'delivering',
  COMPLETED: 'completed',
  CANCELED: 'canceled',
});

/**
 PATCH: /orders/:orderId/status/:orderStatus
 */
