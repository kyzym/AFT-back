import { roles } from '#constants/roles.js';
import {
  createErrorResponse,
  idSchema,
  serverError,
} from '../swaggerChefsComponents.js';

export const deleteChefSwagger = {
  '/chefs/{chefId}': {
    delete: {
      tags: ['Chefs'],
      summary: 'Delete chef',
      description: 'Deletes a chef with the specified ID.',
      parameters: [
        {
          name: 'chefId',
          in: 'path',
          required: true,
          description: 'ID of the chef to delete',
          schema: idSchema,
        },
      ],
      security: [{ bearerAuth: [roles.CHEF, roles.ADMIN] }],
      responses: {
        200: {
          description: 'Chef processed for deletion',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Chef processed for deletion',
                  },
                },
              },
            },
          },
        },
        400: createErrorResponse('Format of this ID is not correct'),
        500: serverError,
      },
    },
  },
};
