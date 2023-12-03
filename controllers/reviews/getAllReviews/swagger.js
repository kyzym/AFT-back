import { roles } from '#constants/roles.js';

import { pagePaginationParameters } from '#controllers/swagger.common.js';

export const getAllReviews = {
  paths: {
    '/reviews': {
      get: {
        summary: 'Returns the list of all reviews',
        description: 'Returns the list of all reviews',
        operationId: 'getAllReviews',
        tags: ['Reviews'],
        security: [{ bearerAuth: [roles.ADMIN] }],
        parameters: [...pagePaginationParameters],

        responses: {
          200: {
            description: 'The list of reviews',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Review',
                  },
                },
              },
            },
          },

          404: {
            description: 'Review not found',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
  },
};
