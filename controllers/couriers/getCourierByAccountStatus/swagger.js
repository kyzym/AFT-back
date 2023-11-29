import { accountStatus } from '#constants/accountStatus.js';
import {
  createErrorResponse,
  serverError,
} from '../swaggerCouriersComponents.js';

export const getCourierByAccountStatusSwagger = {
  '/couriers/accountStatus/{accountStatus}': {
    get: {
      tags: ['Couriers'],
      summary: 'Get couriers by account status',
      description: 'Get couriers with given account status',
      parameters: [
        {
          name: 'accountStatus',
          in: 'path',
          required: true,
          description: 'Account status of couriers',
          schema: {
            type: 'string',
            enum: Object.values(accountStatus),
          },
        },
      ],
      responses: {
        404: createErrorResponse('Couriers not found'),
        500: serverError,
      },
    },
  },
};
