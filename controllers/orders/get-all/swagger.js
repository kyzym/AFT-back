export const getAllOrdersSwagger = {
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
            format: 'uuid',
          },
          dishes: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Dish',
            },
          },
          status: {
            type: 'string',
            enum: ['placed', 'confirmed', 'delivered', 'cancelled'],
          },
        },
        required: ['id', 'dishes', 'status'],
      },
      Dish: {
        type: 'object',
        properties: {
          dishId: {
            type: 'string',
            format: 'uuid',
          },
          quantity: {
            type: 'integer',
          },
        },
        required: ['dishId', 'quantity'],
      },
    },
  },
};
