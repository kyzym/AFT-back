export const deleteReview = {
  paths: {
    '/api/ingredients/{ingredientId}': {
      delete: {
        summary: 'Delete a ingredient by ID',
        description: 'Delete a ingredient by ID',
        operationId: 'deleteIngredient',
        tags: ['Ingredients'],
        security: [
          {
            BearerAuth: [],
          },
        ],
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
          {
            in: 'header',
            name: 'Authorization',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'Bearer token for authentication',
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
