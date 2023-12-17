import { roles } from '#constants/roles.js';
import { createStatisticOrdersSuccessResponseArray } from '#controllers/admin/swaggerAdminComponents.js';
import { idSchema, serverError } from '../swaggerChefsComponents.js';

export const getChefsStatisticSwagger = {
  '/chefs/{chefId}/statistic': {
    get: {
      tags: ['Chefs'],
      summary: 'Get chef profit statistic',
      description: 'Get a list of information for chef profit statistic.',
      parameters: [
        {
          name: 'courierId',
          in: 'path',
          required: true,
          description: 'ID of the chef',
          schema: idSchema,
        },
      ],
      security: [{ bearerAuth: [roles.CHEF] }],
      responses: {
        200: createStatisticOrdersSuccessResponseArray(
          'A list of chef statistic retrieved successfully'
        ),
        500: serverError,
      },
    },
  },
};
