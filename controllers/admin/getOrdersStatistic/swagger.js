import { roles } from '#constants/roles.js';
import {
  createStatisticOrdersSuccessResponseArray,
  serverError,
} from '../swaggerAdminComponents.js';

export const getOrdersStatisticSwagger = {
  '/statistic/payment': {
    get: {
      tags: ['Admin'],
      summary: 'Get profit statistic',
      description: 'Get a list of all profits per day',
      security: [{ bearerAuth: [roles.ADMIN] }],
      responses: {
        200: createStatisticOrdersSuccessResponseArray(
          'A list of profit statistic info retrieved successfully'
        ),
        500: serverError,
      },
    },
  },
};
