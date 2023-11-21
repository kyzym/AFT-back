import {
  DEFAULT_LIMIT_PER_PAGE,
  MAX_LIMIT_PER_PAGE,
} from '#constants/paginationSettings.js';
import { orderStatus } from '#constants/orderStatus.js';
import { swaggerResponseWithPagination } from '#helpers/index.js';

const objectId = {
  type: 'string',
  format: 'objectId',
};

const CoordinateSchema = {
  type: ['object', 'null'],
  properties: {
    lat: { type: 'number', minimum: -90, maximum: 90 },
    lng: { type: 'number', minimum: -180, maximum: 180 },
  },
};
const AddressSchema = {
  type: 'object',
  properties: {
    city: { type: 'string' },
    country: { type: 'string' },
    street: { type: 'string' },
    coordinates: {
      $ref: '#/components/schemas/CoordinateSchema',
      default: null,
    },
  },
};

const ShortDishSchema = {
  type: 'object',
  properties: {
    id: objectId,
    image: { type: 'string' },
  },
};

const OrderItemSchema = {
  type: 'object',
  properties: {
    id: objectId,
    dish: ShortDishSchema,
    count: {
      type: 'integer',
      minimum: 1,
      default: 1,
    },
    price: {
      type: 'number',
      minimum: 0.01,
    },
  },
  minItems: 1,
};

const OrderSchema = {
  type: 'object',
  properties: {
    id: objectId,
    orderNumber: {
      type: 'integer',
      minimum: 1,
      default: Date.now(),
    },
    userId: objectId,
    chefId: objectId,
    courierId: {
      type: ['string', 'null'],
      format: 'objectId',
      default: null,
    },
    items: {
      type: 'array',
      items: { $ref: '#/components/schemas/OrderItemSchema' },
    },
    totalPrice: {
      type: 'number',
      minimum: 0.01,
    },
    address: { $ref: '#/components/schemas/AddressSchema' },
    status: {
      type: 'string',
      enum: Object.values(orderStatus),
      default: orderStatus.PENDING,
    },
  },
};

const pageParameters = [
  {
    name: 'limit',
    in: 'query',
    description: 'The number of items per page',
    required: false,
    schema: {
      type: 'integer',
      minimum: 1,
      maximum: MAX_LIMIT_PER_PAGE,
      default: DEFAULT_LIMIT_PER_PAGE,
    },
  },
  {
    name: 'page',
    in: 'query',
    description: 'The page number',
    schema: {
      type: 'integer',
      minimum: 1,
      default: 1,
    },
  },
];

const GetAllOrdersResponse = {
  type: 'object',
  properties: {
    ...swaggerResponseWithPagination({
      orders: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/OrderSchema',
        },
      },
    }),
  },
};

const errorMessage = {
  401: 'Access token is missing or invalid',
  403: 'Forbidden - The client does not have permission to access this resource',
};

const errorResponse = (description) => {
  return {
    type: 'object',
    properties: {
      success: { type: 'boolean', default: false },
      message: {
        type: 'string',
        description: description,
      },
    },
  };
};

export const getAllOrdersSwagger = {
  paths: {
    '/orders': {
      get: {
        tags: ['Orders'],
        summary: 'Get list of all orders',
        security: [{ bearerAuth: [] }],
        description: 'Returns a list of all orders',
        parameters: [...pageParameters],
        responses: {
          200: {
            description: 'A list of orders',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/GetAllOrdersResponse' },
              },
            },
          },
          401: {
            ...errorResponse(errorMessage[401]),
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
      ShortDishSchema,
      OrderItemSchema,
      OrderSchema,
      CoordinateSchema,
      AddressSchema,
      GetAllOrdersResponse,
    },
  },
};

/**
 {
    "success": true,
    "data": {
        "orders": [
            {
                "orderNumber": 1700420892635,
                "userId": "655a051fb7cc813b6007220b",
                "chefId": "6557219bccbbbbc3695bc8b2",
                "courierId": null,
                "items": [
                    {
                        "dishId": {
                            "_id": "65572415cf191a7f14e8e423",
                            "name": "Test dish",
                            "image": "test_image.jpg"
                        },
                        "name": "Test dish",
                        "count": 3,
                        "createdAt": "2023-11-19T19:08:12.647Z",
                        "updatedAt": "2023-11-19T19:08:12.647Z",
                        "id": "655a5d1c5569b832185d878a"
                    },
                    {
                        "dishId": {
                            "_id": "655a31ccb7cc813b60072218",
                            "name": "Test dish 2",
                            "image": "test_image.jpg"
                        },
                        "name": "Test dish 2",
                        "count": 1,
                        "createdAt": "2023-11-19T19:08:12.648Z",
                        "updatedAt": "2023-11-19T19:08:12.648Z",
                        "id": "655a5d1c5569b832185d878b"
                    }
                ],
                "totalPrice": 42.12,
                "address": {
                    "country": "Ukraine",
                    "city": "Kyiv",
                    "street": "Test st. , 25/53",
                    "coordinate": null
                },
                "status": "readyToDelivery",
                "id": "655a5d1c5569b832185d8789"
            }
        ],
        "limit": 2,
        "page": 1,
        "totalPages": 2
    }
}
 */
