import { orderStatus } from '#constants/orderStatus.js';
import { paymentStatus } from '#constants/paymentStatus.js';
import { BaseDishSchema } from '#controllers/dishes/swaggerDishesComponents.js';
import { AddressSchema, objectId } from '#controllers/swagger.common.js';
import {
  swaggerResponse,
  swaggerResponseWithPagination,
} from '#helpers/swaggerResponse.js';
import { phoneNumberPattern } from '#helpers/validation.js';

export const ShortDishSchema = {
  type: 'object',
  properties: {
    id: objectId,
    ...BaseDishSchema.properties,
  },
};

export const OrderItemSchema = {
  type: 'object',
  properties: {
    dishId: objectId,
    dish: ShortDishSchema,
    count: {
      type: 'integer',
      minimum: 1,
      default: 1,
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
    summaryPrice: {
      type: 'object',
      properties: {
        tax: {
          type: 'number',
          minimum: 0.01,
        },
        delivery: {
          type: 'number',
          minimum: 0.01,
        },
        chef: {
          type: 'number',
          min: 0.01,
        },
      },
    },
    totalPrice: {
      type: 'number',
      minimum: 0.01,
    },
    deliveryInfo: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          minLength: 3,
        },
        phoneNumber: {
          type: 'string',
          pattern: phoneNumberPattern,
        },
        email: {
          type: 'string',
          format: 'email',
        },
        address: AddressSchema,
      },
    },
    additionalInfo: {
      type: 'string',
      maxLength: 400,
    },
    status: {
      type: 'string',
      enum: Object.values(orderStatus),
      default: orderStatus.PENDING,
    },
  },
};

export const PaymentDataSchema = {
  type: ['object', 'null'],
  properties: {
    data: { type: 'string' },
    signature: { type: 'string' },
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

export const GetOrderByIdResponse = {
  type: 'object',
  properties: {
    ...swaggerResponse({ order: { $ref: '#/components/schemas/OrderSchema' } }),
  },
};

export const CreateOrderResponse = {
  type: 'object',
  properties: {
    ...swaggerResponse({ order: { $ref: '#/components/schemas/OrderSchema' } }),
  },
};

export const GetOrderPaymentStatusResponse = {
  type: 'object',
  properties: {
    ...swaggerResponse({
      status: {
        type: 'string',
        enum: Object.values(paymentStatus),
        default: paymentStatus.PENDING,
      },
      payment: { $ref: '#/components/schemas/PaymentDataSchema' },
    }),
  },
};
