import { roles } from '#constants/roles.js';
import { ChefRequestSchema, serverError } from '../swaggerChefsComponents.js';

export const createChefSwagger = {
  '/api/chefs': {
    post: {
      tags: ['Chefs'],
      summary: 'Create a new chef',
      description: 'Create a new chef',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: ChefRequestSchema,
          },
        },
      },
      security: [{ bearerAuth: [roles.CHEF] }],
      responses: {
        201: {
          description: 'Chef created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Chef created successfully',
                  },
                },
              },
            },
          },
        },
        500: serverError,
      },
    },
  },
};
