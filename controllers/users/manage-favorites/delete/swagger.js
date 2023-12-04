import {
  errorMessage,
  errorName,
  errorResponse,
} from '#controllers/swagger.common.js';
import { roles } from '#constants/roles.js';
import { DefaultErrorResponse } from '#controllers/users/swaggerCommon.js';

export const deleteFavoriteItemSwagger = {
  paths: {
    '/users/{userId}/favorite/{type}/{favoriteId}': {
      delete: {
        tags: ['Users'],
        summary: 'Delete favorite item',
        description:
          "Remove a favorite dish or chef from the user's favorites list",
        security: [{ bearerAuth: [roles.USER] }],
        operationId: 'removeFavoriteItem',
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
            name: 'type',
            in: 'path',
            required: true,
            description: 'Type of favorites (e.g., "dishes" or "chefs")',
            schema: {
              type: 'string',
              enum: ['dishes', 'chefs'],
            },
          },
          {
            name: 'favoriteId',
            in: 'path',
            description: 'ID of the favorite dish or chef',
            required: true,
            schema: {
              type: 'string',
              format: 'objectId',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful response of favorite item removing',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      default: true,
                    },
                    message: {
                      type: 'string',
                      description:
                        'Descriptive message indicating the result of the operation',
                      example:
                        'The dish with ID 655b2538622e73d79c557e93 removed from favorites for user 611b2538622e73d79c435c98',
                    },
                  },
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
          403: DefaultErrorResponse[403],
          404: {
            ...errorResponse(
              errorName[404],
              'The dish with ID 655b2538622e73d79c557e93 not found'
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
