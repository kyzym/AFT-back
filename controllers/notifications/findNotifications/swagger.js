// import {
//   createErrorResponse,
//   serverError,
// } from 'couriers/swaggerCouriersComponents.js';

import {
  createErrorResponse,
  serverError,
} from '#controllers/dishes/swaggerDishesComponents.js';

export const findNotificationsSwagger = {
  '/notifications': {
    get: {
      tags: ['Notifications'],
      summary: 'Find notifications',
      description:
        'Retrieves a list of notifications based on query parameters.',
      parameters: [
        {
          name: 'read',
          in: 'query',
          required: false,
          description:
            'Filter for notifications by read status. Accepts true or false.',
          schema: {
            type: 'string',
            enum: ['true', 'false'],
          },
        },
        {
          name: 'role',
          in: 'query',
          required: false,
          description: 'Filter for notifications by role.',
          schema: {
            type: 'string',
            value: 'courier',
          },
        },
      ],
      responses: {
        200: {
          description: 'List of notifications',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Notification',
                },
              },
            },
          },
        },
        400: {
          description: 'Invalid request parameters',
          content: {
            'application/json': {
              schema: createErrorResponse('Invalid parameters'),
            },
          },
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: serverError,
            },
          },
        },
      },
    },
  },
};
