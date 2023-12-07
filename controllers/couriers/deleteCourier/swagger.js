import { roles } from '#constants/roles.js';
import {
  createErrorResponse,
  //idSchema,
  serverError,
} from '../swaggerCouriersComponents.js';

export const deleteCourierSwagger = {
  '/couriers': {
    delete: {
      tags: ['Couriers'],
      summary: 'Delete courier',
      description: 'Deletes a courier with the specified ID.',
      // parameters: [
      //   {
      //     name: 'courierId',
      //     in: 'path',
      //     required: true,
      //     description: 'ID of the courier to delete',
      //     schema: idSchema,
      //   },
      // ],
      security: [{ bearerAuth: [roles.COURIER, roles.ADMIN] }],
      responses: {
        200: {
          description: 'Courier processed for deletion',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Courier processed for deletion',
                  },
                },
              },
            },
          },
        },
        400: createErrorResponse('Format of this ID is not correct'),
        500: serverError,
      },
    },
  },
};
