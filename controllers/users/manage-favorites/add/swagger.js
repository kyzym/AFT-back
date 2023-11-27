import {
  errorMessage,
  errorName,
  errorResponse,
} from '#controllers/swagger.common.js';
import { roles } from '#constants/roles.js';

export const addFavoriteItemSwagger = {
  paths: {
    '/users/{userId}/favorite/{type}': {
      post: {
        tags: ['Users'],
        summary: 'Add favorite item',
        description: "Add a favorite dish or chef to the user's favorites list",
        security: [{ bearerAuth: [roles.USER] }],
        operationId: 'addFavoriteItem',
        parameters: [
          {
            name: 'userId',
            in: 'path',
            description: 'ID of the user',
            required: true,
            schema: {
              type: 'string',
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
        requestBody: {
          description: 'Request body for adding a favorite item',
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  favoriteId: {
                    type: 'string',
                    format: 'objectId',
                    description: 'ID of the favorite dish or chef',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successful response of adding a favorite item',
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
                        'The dish with ID 655b2538622e73d79c557e93 added to favorites for user 611b2538622e73d79c435c98',
                    },
                  },
                },
              },
            },
          },
          400: {
            ...errorResponse(
              errorName[400],
              'The dish with ID 656243004ad81433dd40f is already in favorites for user 612343004ad81433aa40f'
            ),
          },
          401: {
            ...errorResponse(errorName[401], errorMessage[401]),
          },
          403: {
            ...errorResponse(errorName[403], errorMessage[403]),
          },
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
