import { roles } from '#constants/roles.js';
import {
  AddressSchema,
  errorMessage,
  errorResponse,
  objectId,
} from '#controllers/swagger.common.js';
import { phoneNumberPattern } from '#helpers/validation.js';

const OrderItemRequest = {
  type: 'object',
  properties: {
    dishId: objectId,
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
      minItems: 1,
    },
    address: AddressSchema,
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
    additionalInfo: {
      type: 'string',
      maxLength: 400,
    },
  },
  required: ['items', 'address', 'name', 'email', 'phoneNumber'],
  example: {
    name: 'Test Name',
    phoneNumber: '+38(099)5556677',
    email: 'test@email.com',
    additionalInfo: 'Some text',
    items: [
      {
        dishId: '64572415cf191a7f14e8e423',
        count: 2,
      },
    ],
    address: {
      city: 'City',
      country: 'Country',
      street: 'Street',
      houseNumber: '24a',
      apartment: '123',
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
