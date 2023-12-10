import { vehicleType } from '#constants/vehicleType.js';
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

const BaseCourierSchema = {
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
    vehicleType: {
      type: 'string',
      enum: vehicleType,
    },
    isAvailable: { type: 'boolean' },
  },
};

const CourierSchemaRequired = [
  'userId',
  'avatar',
  'phoneNumber',
  'address',
  'certificate',
  'accountStatus',
  'vehicleType',
  'isAvailable',
];

const CourierRequestSchema = {
  ...BaseCourierSchema,
  required: CourierSchemaRequired,
};

const CourierResponseSchema = {
  ...BaseCourierSchema,
  properties: {
    id: { type: 'string', format: 'objectId' },
    ...BaseCourierSchema.properties,
  },
};

const CourierSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'objectId' },
    ...BaseCourierSchema.properties,
  },
  required: CourierSchemaRequired,
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
      'application/json': { schema: CourierResponseSchema },
    },
  };
};

const createSuccessResponseArray = (description) => {
  return {
    description,
    content: {
      'application/json': {
        schema: { type: 'array', items: CourierResponseSchema },
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
  CourierSchema,
  CourierRequestSchema,
  CourierResponseSchema,
  createErrorResponse,
  createSuccessResponse,
  createSuccessResponseArray,
  idSchema,
  serverError,
  BaseCourierSchema,
};
