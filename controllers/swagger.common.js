import {
  DEFAULT_LIMIT_PER_PAGE,
  MAX_LIMIT_PER_PAGE,
} from '#constants/paginationSettings.js';

// Object id type
export const objectId = {
  type: 'string',
  format: 'objectId',
};

export const CoordinateSchema = {
  type: ['object', 'null'],
  properties: {
    lat: { type: 'number', minimum: -90, maximum: 90 },
    lng: { type: 'number', minimum: -180, maximum: 180 },
  },
};

export const AddressSchema = {
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

// Page pagination params
export const pagePaginationParameters = [
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

// Parameter id
export const idParameter = (paramId, description) => ({
  name: paramId,
  in: 'path',
  description,
  required: true,
  schema: objectId,
});

// Error description
export const errorMessage = {
  401: 'Access token is missing or invalid',
  403: 'Forbidden - The client does not have permission to access this resource',
  500: 'Internal server error',
};

// Error response
export const errorResponse = (description) => {
  return {
    description,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: { type: 'boolean', default: false },
            message: {
              type: 'string',
              default: description,
            },
          },
        },
      },
    },
  };
};
