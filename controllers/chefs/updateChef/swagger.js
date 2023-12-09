import { roles } from '#constants/roles.js';
import {
  BaseChefSchema,
  createErrorResponse,
  createSuccessResponse,
  idSchema,
  serverError,
} from '../swaggerChefsComponents.js';

export const updateChefSwagger = {
  '/chefs/{chefId}': {
    patch: {
      tags: ['Chefs'],
      summary: 'Update a chef',
      description: 'Update the chef by ID.',
      parameters: [
        {
          name: 'chefId',
          in: 'path',
          required: true,
          description: 'The unique identifier of the chef',
          schema: idSchema,
        },
      ],
      requestBody: {
        description: 'Data for updating the status of the order',
        required: true,
        content: {
          'application/json': {
            schema: BaseChefSchema,
          },
        },
      },
      security: [{ bearerAuth: [roles.CHEF, roles.ADMIN] }],
      responses: {
        200: createSuccessResponse('Status updated successfully'),
        400: createErrorResponse('Format of this ID is not correct'),
        404: createErrorResponse('Order not found'),
        500: serverError,
      },
    },
  },
};
