import {
  errorResponse,
  errorMessage,
  errorName,
} from '#controllers/swagger.common.js';
import { roles } from '#constants/index.js';
import { DefaultErrorResponse } from '#controllers/users/swaggerCommon.js';

export const updateUserCartSwagger = {
  paths: {
    '/users/{userId}/cart': {
      put: {
        tags: ['Users'],
        summary: 'Update user cart',
        description: 'Updates the user cart based on the provided items',
        security: [{ bearerAuth: [roles.USER] }],
        operationId: 'updateUserCart',
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
          description: 'Updated cart information',
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  items: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        dishId: {
                          type: 'string',
                          format: 'objectId',
                          example: '656658933c6bdf0d02f71488',
                          description: 'ID of the dish',
                        },
                        count: {
                          type: 'integer',
                          default: 1,
                          description:
                            'Number of items of the dish to be added to the cart',
                        },
                      },
                      required: ['dishId', 'count'],
                    },
                  },
                },
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
                  $ref: '#/components/schemas/GetUserCartResponse',
                },
              },
            },
          },
          401: {
            ...errorResponse(errorName[401], errorMessage[401]),
          },
          403: DefaultErrorResponse[403],
          404: {
            ...errorResponse(
              errorName[404],
              'Invalid token: no user found from the token'
            ),
          },
          500: {
            ...errorResponse(errorName[500], errorMessage[500]),
          },
        },
      },
    },
  },
};
