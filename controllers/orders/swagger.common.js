import { orderStatus } from '#constants/orderStatus.js';
import { objectId } from '#controllers/swagger.common.js';
import { swaggerResponseWithPagination } from '#helpers/swaggerResponse.js';

export const ShortDishSchema = {
  type: 'object',
  properties: {
    id: objectId,
    image: { type: 'string' },
  },
};

export const OrderItemSchema = {
  type: 'object',
  properties: {
    id: objectId,
    dish: ShortDishSchema,
    count: {
      type: 'integer',
      minimum: 1,
      default: 1,
    },
    price: {
      type: 'number',
      minimum: 0.01,
    },
  },
  minItems: 1,
};

export const OrderSchema = {
  type: 'object',
  properties: {
    id: objectId,
    orderNumber: {
      type: 'integer',
      minimum: 1,
      default: Date.now(),
    },
    userId: objectId,
    chefId: objectId,
    courierId: {
      type: ['string', 'null'],
      format: 'objectId',
      default: null,
    },
    items: {
      type: 'array',
      items: { $ref: '#/components/schemas/OrderItemSchema' },
    },
    totalPrice: {
      type: 'number',
      minimum: 0.01,
    },
    address: { $ref: '#/components/schemas/AddressSchema' },
    status: {
      type: 'string',
      enum: Object.values(orderStatus),
      default: orderStatus.PENDING,
    },
  },
};

export const GetAllOrdersResponse = {
  type: 'object',
  properties: {
    ...swaggerResponseWithPagination({
      orders: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/OrderSchema',
        },
      },
    }),
  },
};
