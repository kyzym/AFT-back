import {
  createSuccessResponseArray,
  idSchema,
  serverError,
} from '../swaggerDishesComponents.js';

export const getDishesSwagger = {
  '/api/dishes': {
    get: {
      tags: ['Dishes'],
      summary: 'Get dishes',
      description: 'Get a list of dishes with optional filters and sorting.',
      parameters: [
        {
          name: 'chef',
          in: 'query',
          required: false,
          description: 'The unique identifier of the chef to filter dishes',
          schema: idSchema,
        },
        {
          name: 'cuisine',
          in: 'query',
          required: false,
          description: 'Filter dishes by cuisine',
          schema: {
            type: 'string',
          },
        },
        {
          name: 'isVegan',
          in: 'query',
          required: false,
          description: 'Filter dishes by veg status',
          schema: {
            type: 'boolean',
          },
        },
        {
          name: 'category',
          in: 'query',
          required: false,
          description: 'Filter dishes by category',
          schema: {
            type: 'string',
          },
        },
        {
          name: 'spiceLevel',
          in: 'query',
          required: false,
          description: 'Filter dishes by spice level',
          schema: {
            type: 'integer',
          },
        },
        {
          name: 'isAvailable',
          in: 'query',
          required: false,
          description: 'Filter dishes by availability',
          schema: {
            type: 'boolean',
          },
        },
        {
          name: 'sortBy',
          in: 'query',
          required: false,
          description:
            'Sort dishes ("newest or oldest" for sorting by creation date)',
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: createSuccessResponseArray(
          'A list of dishes retrieved successfully'
        ),
        500: serverError,
      },
    },
  },
};
