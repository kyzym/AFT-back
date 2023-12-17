import { accountStatus } from '../../constants/accountStatus.js';
import { AddressSchema } from '../swagger.common.js';

const ErrorResponseSchema = (errorMessage) => {
  return {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: false },
      message: { type: 'string', example: errorMessage },
    },
  };
};

const BaseChefSchema = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
    avatar: { type: 'string' },
    phoneNumber: { type: 'number' },
    address: { type: AddressSchema },
    certificate: { type: 'string' },
    accountStatus: {
      type: 'string',
      enum: accountStatus,
    },
    isAvailable: { type: 'string' },
  },
};

const ChefSchemaRequired = [
  'userId',
  'avatar',
  'phoneNumber',
  'address',
  'certificate',
  'accountStatus',
  'isAvailable',
];

const ChefRequestSchema = {
  ...BaseChefSchema,
  required: ChefSchemaRequired,
};

const ChefResponseSchema = {
  ...BaseChefSchema,
  properties: {
    id: { type: 'string', format: 'objectId' },
    ...BaseChefSchema.properties,
  },
};

const ChefSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'objectId' },
    ...BaseChefSchema.properties,
  },
  required: ChefSchemaRequired,
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
      'application/json': { schema: ChefResponseSchema },
    },
  };
};

const createSuccessResponseArray = (description) => {
  return {
    description,
    content: {
      'application/json': {
        schema: { type: 'array', items: ChefResponseSchema },
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
  ChefSchema,
  ChefRequestSchema,
  ChefResponseSchema,
  createErrorResponse,
  createSuccessResponse,
  createSuccessResponseArray,
  idSchema,
  serverError,
  BaseChefSchema,
};
