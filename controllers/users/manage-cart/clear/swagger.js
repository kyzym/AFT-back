import { DefaultErrorResponse } from '#controllers/users/swaggerCommon.js';
import { roles } from '#constants/index.js';

export const clearUserCartSwagger = {
  paths: {
    '/users/{userId}/cart': {
      delete: {
        tags: ['Users'],
        summary: 'Clear user cart',
        description: 'Clears the cart of a user',
        security: [{ bearerAuth: [roles.USER] }],
        operationId: 'clearUserCart',
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
        responses: {
          200: {
            description: 'Successful response indicating user cart clearing',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', default: true },
                    message: {
                      type: 'string',
                      example: 'User cart successfully cleared',
                    },
                    cart: {
                      type: 'object',
                      properties: {
                        items: {
                          type: 'array',
                        },
                      },
                    },
                  },
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
