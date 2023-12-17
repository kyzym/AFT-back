import { roles } from '#constants/roles.js';
import { createStatisticOrdersSuccessResponseArray } from '#controllers/admin/swaggerAdminComponents.js';
import { idSchema, serverError } from '../swaggerCouriersComponents.js';

export const getCouriersStatisticSwagger = {
  '/couriers/{courierId}/statistic': {
    get: {
      tags: ['Couriers'],
      summary: 'Get couriers profit statistic',
      description: 'Get a list of information for courier profit statistic.',
      parameters: [
        {
          name: 'courierId',
          in: 'path',
          required: true,
          description: 'ID of the courier',
          schema: idSchema,
        },
      ],
      security: [{ bearerAuth: [roles.COURIER] }],
      responses: {
        200: createStatisticOrdersSuccessResponseArray(
          'A list of courier statistic taken successfully '
        ),
        500: serverError,
      },
    },
  },
};
