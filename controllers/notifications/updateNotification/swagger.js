import {
  createErrorResponse,
  serverError,
} from '#controllers/dishes/swaggerDishesComponents.js';

export const updateNotificationSwagger = {
  '/notifications/{id}/read': {
    patch: {
      tags: ['Notifications'],
      summary: 'Mark a notification as read',
      description: 'Updates the specified notification’s status to read.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the notification to update',
          schema: {
            type: 'string',
            format: 'objectId',
          },
        },
      ],
      responses: {
        200: {
          description: 'Notification updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Notification updated',
                  },
                },
              },
            },
          },
        },
        403: {
          description:
            'Forbidden - User is not allowed to update this notification',
          content: {
            'application/json': {
              schema: createErrorResponse(
                'You are not allowed to update this notification'
              ),
            },
          },
        },
        404: {
          description: 'Notification not found',
          content: {
            'application/json': {
              schema: createErrorResponse('Notification not found'),
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
