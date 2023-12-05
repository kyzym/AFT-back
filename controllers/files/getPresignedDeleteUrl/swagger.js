import { createSuccessResponse } from '#controllers/chefs/swaggerChefsComponents.js';
import {
  createErrorResponse,
  serverError,
} from '#controllers/dishes/swaggerDishesComponents.js';

export const getS3PresignedDeleteUrlSwagger = {
  '/files/s3-presigned-delete-url': {
    get: {
      tags: ['Files'],
      summary: 'Get a presigned URL for file deletion',
      description: 'Generates a presigned URL for deleting a file from S3.',
      parameters: [
        {
          name: 'fileName',
          in: 'query',
          required: true,
          description: 'Name of the file to be deleted',
          schema: {
            type: 'string',
          },
        },
        {
          name: 'category',
          in: 'query',
          required: true,
          description:
            'Category of the file, determining the folder path in S3',
          schema: {
            type: 'string',
            enum: [
              'dishes',
              'chef-certificates',
              'delivery-certificates',
              'user-avatars',
            ],
          },
        },
      ],
      responses: {
        200: createSuccessResponse(
          'Presigned delete URL generated successfully'
        ),
        400: createErrorResponse('Missing or invalid parameters'),
        500: serverError,
      },
    },
  },
};
