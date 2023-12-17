import {
  errorMessage,
  errorName,
  errorResponse,
} from '#controllers/swagger.common.js';

export const logoutUserSwagger = {
  paths: {
    '/users/logout': {
      post: {
        tags: ['Users'],
        summary: 'User logout',
        description: 'Clear access and refresh token cookies',
        security: [{ cookieAuth: [], refreshToken: [] }],
        operationId: 'logoutUser',
        responses: {
          200: {
            description: 'Successful logout response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                      description: 'Indicates if the logout was successful',
                    },
                    message: {
                      type: 'string',
                      example: 'User has successfully logged out',
                      description: 'Logout success message',
                    },
                  },
                  required: ['success', 'message'],
                },
              },
            },
          },
          401: {
            ...errorResponse(errorName[401], 'Unauthorized logout attempt'),
          },
          500: {
            ...errorResponse(errorName[500], errorMessage[500]),
          },
        },
      },
    },
  },
};
