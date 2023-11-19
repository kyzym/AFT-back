import { CATEGORIES, CUISINES } from '../../constants/index.js';

const ErrorResponseSchema = (errorMessage) => {
  return {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: false },
      message: { type: 'string', example: errorMessage },
    },
  };
};

const BaseDishSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    image: { type: 'string' },
    description: { type: 'string' },
    ingredients: {
      type: 'array',
      items: { type: 'string' },
    },
    price: { type: 'number' },
    isVegan: { type: 'boolean' },
    cuisine: {
      type: 'string',
      enum: CUISINES,
    },
    category: {
      type: 'string',
      enum: CATEGORIES,
    },
    isAvailable: { type: 'boolean' },
    weight: { type: 'number' },
    spiceLevel: { type: 'number' },
    nutrition: {
      type: 'object',
      properties: {
        calories: { type: 'number' },
        protein: { type: 'number' },
        fats: { type: 'number' },
        carbohydrates: { type: 'number' },
      },
    },
  },
};
const DishSchemaRequired = [
  'name',
  'image',
  'description',
  'price',
  'cuisine',
  'category',
  'isAvailable',
  'weight',
];

const DishRequestSchema = {
  ...BaseDishSchema,
  required: DishSchemaRequired,
};

const DishResponseSchema = {
  ...BaseDishSchema,

  properties: {
    id: { type: 'string', format: 'objectId' },
    ...BaseDishSchema.properties,
  },
};

const DishSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'objectId' },
    ...BaseDishSchema.properties,
  },
  required: DishSchemaRequired,
};

const createErrorResponse = (description) => {
  return {
    description,
    content: {
      'application/json': { schema: ErrorResponseSchema(description) },
    },
  };
};

const createSuccessResponse = (description) => {
  return {
    description,
    content: {
      'application/json': { schema: DishResponseSchema },
    },
  };
};

const createSuccessResponseArray = (description) => {
  return {
    description,
    content: {
      'application/json': {
        schema: { type: 'array', items: DishResponseSchema },
      },
    },
  };
};

const idSchema = {
  type: 'string',
  format: 'objectId',
};

const serverError = createErrorResponse('Internal Server Error');

export {
  DishSchema,
  DishRequestSchema,
  DishResponseSchema,
  createErrorResponse,
  createSuccessResponse,
  createSuccessResponseArray,
  idSchema,
  serverError,
};
