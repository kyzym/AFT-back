import {
  errorMessage,
  errorName,
  errorResponse,
} from '#controllers/swagger.common.js';
import { roles } from '#constants/roles.js';

export const getFavoritesByTypeSwagger = {
  paths: {
    '/users/{userId}/favorite/{type}': {
      get: {
        tags: ['Users'],
        summary: 'Get user favorites by type',
        description:
          'Returns a list of user favorites based on the specified type',
        security: [{ bearerAuth: [roles.USER] }],
        operationId: 'getFavoritesByType',
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            description: 'ID of the user',
            schema: {
              type: 'string',
              format: 'objectId',
            },
          },
          {
            name: 'type',
            in: 'path',
            required: true,
            description: 'Type of favorites (e.g., "dishes" or "chefs")',
            schema: {
              type: 'string',
              enum: ['dishes', 'chefs'],
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful response with user favorites',
            content: {
              'application/json': {
                schema: {
                  oneOf: [
                    {
                      $ref: '#/components/schemas/GetFavoriteDishesResponse',
                    },
                    {
                      $ref: '#/components/schemas/GetFavoriteChefsResponse',
                    },
                  ],
                },
              },
            },
          },
          400: {
            ...errorResponse(
              errorName[400],
              'Format of this ID: 656243004ad81433dd40f is not correct'
            ),
          },
          401: {
            ...errorResponse(errorName[401], errorMessage[401]),
          },
          403: {
            ...errorResponse(errorName[403], errorMessage[403]),
          },
          404: {
            ...errorResponse(errorName[404], 'User not found'),
          },
          500: {
            ...errorResponse(errorName[500], errorMessage[500]),
          },
        },
      },
    },
  },
};
