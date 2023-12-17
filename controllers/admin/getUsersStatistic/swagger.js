import { roles } from '#constants/roles.js';
import {
  createStatisticUsersSuccessResponseArray,
  serverError,
} from '../swaggerAdminComponents.js';

export const getUsersStatisticSwagger = {
  '/statistic/users': {
    get: {
      tags: ['Admin'],
      summary: 'Get users registration statistic',
      description:
        'Get a list of all users registration per day during all time',
      security: [{ bearerAuth: [roles.ADMIN] }],
      responses: {
        200: createStatisticUsersSuccessResponseArray(
          'A list of users, chefs, couriers amount statistic info retrieved successfully'
        ),
        500: serverError,
      },
    },
  },
};
