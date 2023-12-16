import {
  errorMessage,
  errorName,
  errorResponse,
} from '#controllers/swagger.common.js';

export const refreshTokenSwagger = {
  paths: {
    '/users/refresh': {
      post: {
        tags: ['Users'],
        summary: 'Generate a new access token and set new token cookies',
        description:
          'Update the access token using the refresh token and set new access/refresh token cookies',
        operationId: 'refreshToken',
        security: [{ refreshCookieAuth: [] }],
        responses: {
          200: {
            description: 'Successful token refresh',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      description: 'Indicates if the operation was successful',
                    },
                    message: {
                      type: 'string',
                      description: 'Tokens successfully updated',
                    },
                    accessToken: {
                      type: 'string',
                      description: 'The new access token',
                    },
                  },
                },
              },
            },
          },
          401: {
            ...errorResponse(errorName[401], 'Token failed'),
          },
          500: {
            ...errorResponse(errorName[500], errorMessage[500]),
          },
        },
      },
    },
  },
};
