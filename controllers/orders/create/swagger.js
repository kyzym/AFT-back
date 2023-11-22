import { roles } from '#constants/roles.js';
import {
  AddressSchema,
  errorMessage,
  errorResponse,
  objectId,
} from '#controllers/swagger.common.js';

const OrderItemRequest = {
  type: 'object',
  properties: {
    dish: objectId,
    count: {
      type: 'integer',
      minimum: 1,
    },
  },
  minItems: 1,
};

const CreateOrderRequest = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: OrderItemRequest,
    },
    address: AddressSchema,
  },
  required: ['items', 'address'],
  example: {
    items: [
      {
        dish: '64572415cf191a7f14e8e423',
        count: 2,
      },
    ],
    address: {
      city: 'City',
      country: 'Country',
      street: 'Street',
    },
  },
};

export const createOrderSwagger = {
  paths: {
    '/orders': {
      post: {
        tags: ['Orders'],
        summary: 'Create new order',
        security: [{ bearerAuth: [roles.USER] }],
        description: 'Create new order',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: CreateOrderRequest,
            },
          },
        },
        responses: {
          201: {
            description: 'Order create success',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CreateOrderResponse' },
              },
            },
          },
          400: {
            ...errorResponse(errorMessage[400]),
          },
          401: {
            ...errorResponse(errorMessage[401]),
          },
          403: {
            ...errorResponse(errorMessage[403]),
          },
          500: {
            ...errorResponse(errorMessage[500]),
          },
        },
      },
    },
  },
};
