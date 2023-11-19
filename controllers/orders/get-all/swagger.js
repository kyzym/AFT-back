import { orderStatus } from '../../../constants/orderStatus.js';
import { swaggerResponseWithPagination } from '../../../helpers/index.js';

export const getAllOrdersSwagger = {
  paths: {
    '/orders': {
      get: {
        tags: ['Orders'],
        summary: 'Get list of all orders',
        security: [{ bearerAuth: [] }],
        description: 'Returns a list of all orders',
        operationId: 'getAllOrders',
        responses: {
          200: {
            description: 'A list of orders',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    ...swaggerResponseWithPagination({
                      orders: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/OrderResponse',
                        },
                      },
                    }),
                  },
                },
              },
            },
          },
          401: {
            description: 'Access token is missing or invalid',
          },
          403: {
            description:
              'Forbidden - The client does not have permission to access this resource',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      OrderResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'objectId',
          },
          orderNumber: {
            type: 'integer',
            minimum: 1,
            default: Date.now(),
          },
          userId: {
            type: 'string',
            format: 'objectId',
          },
          chefId: {
            type: ['string', 'null'],
            format: 'objectId',
            default: null,
          },
          courierId: {
            type: ['string', 'null'],
            format: 'objectId',
            default: null,
          },
          items: {
            type: 'array',
            items: { $ref: '#/components/schemas/OrderItem' },
          },
          totalPrice: {
            type: 'number',
            minimum: 0.01,
          },
          address: {
            $ref: '#/components/schemas/Address',
          },
          status: {
            type: 'string',
            enum: Object.values(orderStatus),
            default: orderStatus.PENDING,
          },
        },
      },
    },
  },
};

/**
 "orders": [
            {
                "orderNumber": 5,
                "userId": "65520e1b49c89850ff8556ea",
                "chefId": null,
                "courierId": null,
                "items": [
                    {
                        "dishId": {
                            "_id": "65572415cf191a7f14e8e423",
                            "name": "Test dish",
                            "image": "test_image.jpg"
                        },
                        "count": 1,
                        "price": 10,
                        "id": "655730ef6c0c7fe70922125d"
                    }
                ],
                "totalPrice": 10,
                "address": {
                    "country": "Ukraine",
                    "city": "Kyiv",
                    "street": "Test street",
                    "coordinate": null
                },
                "status": "pending",
                "id": "655730ef6c0c7fe70922125c"
            }
        ],
        "limit": 10,
        "page": 1,
        "totalPages": 1
    }
 */
