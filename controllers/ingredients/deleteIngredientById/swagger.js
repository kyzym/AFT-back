import { roles } from '#constants/roles.js';

export const deleteIngredientById = {
  paths: {
    '/ingredients/{ingredientId}': {
      delete: {
        summary: 'Delete a ingredient by ID',
        description: 'Delete a ingredient by ID',
        operationId: 'deleteIngredient',
        tags: ['Ingredients'],
        security: [{ bearerAuth: [roles.USER] }],
        parameters: [
          {
            in: 'path',
            name: 'ingredientId',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'ID of the ingredient to delete',
          },
        ],
        responses: {
          204: {
            description: 'Ingredient deleted successfully',
          },
          401: {
            description: 'Unauthorized - Missing or invalid token',
          },
          403: {
            description:
              "Forbidden - User doesn't have permission to delete this ingredient",
          },
          404: {
            description: 'Ingredient not found',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
  },
};
