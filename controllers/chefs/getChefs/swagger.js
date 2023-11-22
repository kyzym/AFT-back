import {
  createSuccessResponseArray,
  serverError,
} from '../swaggerChefsComponents.js';

export const getChefsSwagger = {
  '/api/chefs': {
    get: {
      tags: ['Chefs'],
      summary: 'Get chefs',
      description:
        'Get a list of chefs with optional filters of availible state.',
      parameters: [
        {
          name: 'isAvailable',
          in: 'query',
          required: false,
          description: 'Filter chefs by availability',
          schema: {
            type: 'boolean',
          },
        },
      ],
      responses: {
        200: createSuccessResponseArray(
          'A list of chefs retrieved successfully'
        ),
        500: serverError,
      },
    },
  },
};
