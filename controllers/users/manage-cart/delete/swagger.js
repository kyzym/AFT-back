import { DefaultErrorResponse } from '#controllers/users/swaggerCommon.js';
import { roles } from '#constants/index.js';

export const deleteUserCartItemSwagger = {
  paths: {
    '/users/{userId}/cart/{dishId}': {
      delete: {
        tags: ['Users'],
        summary: 'Delete item from user cart',
        description: "Remove an item from the user's cart",
        security: [{ cookieAuth: [roles.USER], refreshToken: [] }],
        operationId: 'deleteUserCartItem',
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
          {
            name: 'dishId',
            in: 'path',
            description: 'ID of the dish',
            required: true,
            schema: {
              type: 'string',
              format: 'objectId',
            },
          },
        ],
        responses: {
          200: {
            description:
              "Successful response indicating item removal from user's cart",
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
