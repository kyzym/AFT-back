import {
  errorResponse,
  errorMessage,
  errorName,
} from '#controllers/swagger.common.js';
import { roles } from '#constants/index.js';
import { DefaultErrorResponse } from '#controllers/users/swaggerCommon.js';

export const updateUserCartItemSwagger = {
  paths: {
    '/users/{userId}/cart': {
      patch: {
        tags: ['Users'],
        summary: 'Update user cart',
        description: 'Updates the user cart based on the provided items',
        security: [{ cookieAuth: [roles.USER], refreshToken: [] }],
        operationId: 'updateUserCartItem',
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
