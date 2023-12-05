import {
  createErrorResponse,
  createSuccessResponseArray,
  idSchema,
  serverError,
} from '../swaggerDishesComponents.js';

export const getOwnDishesSwagger = {
  '/dishes/own/{chefId}': {
    get: {
      tags: ['Dishes'],
      summary: 'Get own dishes',
      description:
        'Retrieves a list of dishes created by the currently authenticated chef.',
      parameters: [
        {
          name: 'chefId',
          in: 'path',
          required: true,
          description: 'ID of the chef to get dishes',
          schema: idSchema,
        },
      ],
      responses: {
        200: createSuccessResponseArray(
          'A list of own dishes retrieved successfully'
        ),
        401: createErrorResponse('Unauthorized'),
        500: serverError,
      },
    },
  },
};
