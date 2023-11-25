import { roles } from '#constants/roles.js';
import {
  BaseChefSchema,
  createErrorResponse,
  createSuccessResponse,
  idSchema,
  serverError,
} from '../swaggerChefsComponents.js';

export const updateChefSwagger = {
  '/api/chefs/{chefId}': {
    patch: {
      tags: ['Chefs'],
      summary: 'Update a chef',
      description: 'Update the status of order by ID for chef by their ID.',
      parameters: [
        {
          name: 'chefId',
          in: 'path',
          required: true,
          description: 'The unique identifier of the chef',
          schema: idSchema,
        },
        {
          name: 'orderId',
          in: 'path',
          required: true,
          description: 'The unique identifier of the order to be updated',
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
