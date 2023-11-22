import {
  errorMessage,
  errorResponse,
  pageIdParameter,
} from '#controllers/swagger.common.js';
import { swaggerResponse } from '#helpers/swaggerResponse.js';

export const createChangeStatusSwagger = ({
  summary,
  roles = [],
  responseMessage,
}) => ({
  patch: {
    tags: ['Orders'],
    summary: summary,
    security: [{ bearerAuth: roles }],
    description: summary,
    parameters: [pageIdParameter('orderId', 'Order id')],
    responses: {
      200: {
        description: 'Change status information',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                ...swaggerResponse(responseMessage),
              },
            },
          },
        },
      },
      401: {
        ...errorResponse(errorMessage[401]),
      },
      403: {
        ...errorResponse("You don't have access to this order"),
      },
      500: {
        ...errorResponse(errorMessage[500]),
      },
    },
  },
});
