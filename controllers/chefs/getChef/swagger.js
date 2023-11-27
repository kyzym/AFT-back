import {
  createErrorResponse,
  createSuccessResponse,
  idSchema,
  serverError,
} from '../swaggerChefsComponents.js';

export const getChefSwagger = {
  '/chefs/{chefId}': {
    get: {
      tags: ['Chefs'],
      summary: 'Get a chef',
      description: 'Get a chef with the specified ID.',
      parameters: [
        {
          name: 'chefId',
          in: 'path',
          required: true,
          description: 'ID of the chef to get',
          schema: idSchema,
        },
      ],
      responses: {
        200: createSuccessResponse('Chef retrieved successfully'),
        400: createErrorResponse('Format of this ID is not correct'),
        404: createErrorResponse('Chef not found'),
        500: serverError,
      },
    },
  },
};
