export const getUsers = {
  paths: {
    '/users': {
      get: {
        tags: ['Users'],
        summary: 'Get list of all users',
        description: 'Returns a list of users',
        operationId: 'getUsers',
        responses: {
          200: {
            description: 'A list of users',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid or so',
          },
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
          },
          role: {
            type: 'string',
          },
        },
      },
    },
  },
};
