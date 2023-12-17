const ErrorResponseSchema = (errorMessage) => {
  return {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: false },
      message: { type: 'string', example: errorMessage },
    },
  };
};

const BaseStatisticOrdersSchema = {
  type: 'object',
  properties: {
    date: { type: 'string' },
    profit: { type: 'number' },
  },
};

const StatisticOrdersSchemaRequired = ['date', 'profit'];

const StatisticOrdersRequestSchema = {
  ...BaseStatisticOrdersSchema,
  required: StatisticOrdersSchemaRequired,
};

const StatisticOrdersResponseSchema = {
  ...BaseStatisticOrdersSchema,
};

const BaseStatisticUsersSchema = {
  type: 'object',
  properties: {
    date: { type: 'string' },
    usersCount: { type: 'number' },
    chefsCount: { type: 'number' },
    couriersCount: { type: 'number' },
  },
};

const StatisticUsersSchemaRequired = [
  'date',
  'usersCount',
  'chefsCount',
  'couriersCount',
];

const StatisticUsersRequestSchema = {
  ...BaseStatisticUsersSchema,
  required: StatisticUsersSchemaRequired,
};

const StatisticUsersResponseSchema = {
  ...BaseStatisticUsersSchema,
};

const createErrorResponse = (description) => {
  return {
    description,
    content: {
      'application/json': { schema: ErrorResponseSchema(description) },
    },
  };
};

const createStatisticOrdersSuccessResponse = (description) => {
  return {
    description,
    content: {
      'application/json': { schema: BaseStatisticOrdersSchema },
    },
  };
};

const createStatisticUsersSuccessResponse = (description) => {
  return {
    description,
    content: {
      'application/json': { schema: BaseStatisticUsersSchema },
    },
  };
};

const createStatisticOrdersSuccessResponseArray = (description) => {
  return {
    description,
    content: {
      'application/json': {
        schema: { type: 'array', items: StatisticOrdersResponseSchema },
      },
    },
  };
};

const createStatisticUsersSuccessResponseArray = (description) => {
  return {
    description,
    content: {
      'application/json': {
        schema: { type: 'array', items: StatisticUsersResponseSchema },
      },
    },
  };
};

const serverError = createErrorResponse('Internal Server Error');

export {
  BaseStatisticOrdersSchema,
  BaseStatisticUsersSchema,
  StatisticOrdersResponseSchema,
  StatisticUsersResponseSchema,
  StatisticOrdersRequestSchema,
  StatisticUsersRequestSchema,
  createErrorResponse,
  createStatisticOrdersSuccessResponse,
  createStatisticUsersSuccessResponse,
  createStatisticOrdersSuccessResponseArray,
  createStatisticUsersSuccessResponseArray,
  serverError,
};
