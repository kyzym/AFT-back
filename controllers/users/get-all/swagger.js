import { accountStatus, roles } from '#constants/index.js';
import {
  errorMessage,
  errorResponse,
  pagePaginationParameters,
} from '#controllers/swagger.common.js';

export const getAllUsersSwagger = {
  paths: {
    '/users': {
      get: {
        tags: ['Users'],
        summary: 'Get list of all users',
        description: 'Returns a list of users',
        security: [{ bearerAuth: [roles.ADMIN] }],
        operationId: 'getAllUsers',
        parameters: [
          ...pagePaginationParameters,
          {
            name: 'status',
            in: 'query',
            description: 'Filter users by account status',
            schema: {
              type: 'string',
              enum: [accountStatus.ACTIVE, accountStatus.BLOCKED],
            },
          },
          {
            name: 'city',
            in: 'query',
            description: 'Filter users by city',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'lastName',
            in: 'query',
            description: 'Filter users by last name',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'sortBy',
            in: 'query',
            description: 'Sort users by creation date',
            schema: {
              type: 'string',
              enum: ['newest', 'oldest'],
              default: 'newest',
            },
          },
        ],
        responses: {
          200: {
            description: 'A list of users',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/GetAllUsersResponse',
                },
              },
            },
          },
          401: {
            ...errorResponse(errorMessage[401]),
          },
          403: {
            ...errorResponse(errorMessage[403]),
          },
          404: {
            ...errorResponse('Invalid token: no user found from the token'),
          },
          500: {
            ...errorResponse(errorMessage[500]),
          },
        },
      },
    },
  },
};
