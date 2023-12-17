import { roles } from '#constants/index.js';
import { DefaultErrorResponse } from '#controllers/users/swaggerCommon.js';

export const addUserCartItemSwagger = {
  paths: {
    '/users/{userId}/cart': {
      post: {
        tags: ['Users'],
        summary: 'Add item to user cart',
        description:
          'Adds an item to the user cart based on the provided details',
        security: [{ cookieAuth: [roles.USER], refreshToken: [] }],
        operationId: 'addUserCartItem',
        parameters: [
          {
            name: 'userId',
            in: 'path',
            description: 'ID of the user',
            required: true,
            schema: {
              type: 'string',
              format: 'objectId',
            },
          },
        ],
        requestBody: {
          description: 'Item information to be added to the cart',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CartItemSchema',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successful response with updated user cart',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UpdatedUserCartResponse',
                },
              },
            },
          },
          400: DefaultErrorResponse[400],
          401: DefaultErrorResponse[401],
          403: DefaultErrorResponse[403],
          404: DefaultErrorResponse[404],
          500: DefaultErrorResponse[500],
        },
      },
    },
  },
};
