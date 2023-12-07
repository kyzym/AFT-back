export const swaggerResponse = (data) => {
  const response = {
    success: { type: 'boolean', default: true },
  };

  if (typeof data === 'string') {
    response.data = { type: 'string', default: data, example: 'Example' };
  } else {
    response.data = {
      type: 'object',
      properties: {
        ...data,
      },
    };
  }

  return response;
};

export const swaggerResponseWithPagination = (data) => {
  const response = {
    success: { type: 'boolean', default: true },
    data: {
      type: 'object',
      properties: {
        ...data,
        limit: {
          type: 'integer',
          minimum: 1,
          maximum: 50,
          default: 10,
        },
        page: {
          type: 'integer',
          minimum: 1,
          default: 1,
        },
        totalPages: {
          type: 'integer',
          minimum: 0,
          default: 1,
        },
      },
    },
  };

  return response;
};
