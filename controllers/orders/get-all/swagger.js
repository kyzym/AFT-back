export const getAllOrders = {
  paths: {
    '/orders': {
      get: {
        tags: ['Orders'],
        summary: 'Get list of all orders',
        description: 'Returns a list of all orders',
        operationId: 'getAllOrders',
        responses: {
          200: {
            description: 'A list of orders',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Order',
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
      Order: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid od so',
          },
          items: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/OrderItem',
            },
          },
          status: {
            type: 'string',
            enum: ['placed', 'confirmed', 'delivered', 'cancelled'],
          },
        },
        required: ['id', 'items', 'status'],
      },
      OrderItem: {
        type: 'object',
        properties: {
          productId: {
            type: 'string',
            format: 'maybe uuid',
          },
          quantity: {
            type: 'integer',
          },
        },
        required: ['productId', 'quantity'],
      },
    },
  },
};
