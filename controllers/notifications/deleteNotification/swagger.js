import {
  createErrorResponse,
  idSchema,
  serverError,
} from '#controllers/dishes/swaggerDishesComponents.js';

export const deleteNotificationSwagger = {
  '/notifications/{id}': {
    delete: {
      tags: ['Notifications'],
      summary: 'Delete a notification',
      description: 'Deletes a notification with the specified ID.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the notification to delete',
          schema: idSchema,
        },
      ],
      responses: {
        200: {
          description: 'Notification processed for deletion',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Processed for deletion',
                  },
                },
              },
            },
          },
        },
        403: {
          description:
            'Forbidden - User is not allowed to delete this notification',
          content: {
            'application/json': {
              schema: createErrorResponse('You are not allowed to delete it'),
            },
          },
        },
        400: createErrorResponse('Format of this ID is not correct'),
        500: serverError,
      },
    },
  },
};
