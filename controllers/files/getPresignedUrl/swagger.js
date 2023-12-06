import { createErrorResponse } from '#controllers/chefs/swaggerChefsComponents.js';
import {
  createSuccessResponse,
  serverError,
} from '#controllers/dishes/swaggerDishesComponents.js';

export const getS3PresignedUrlSwagger = {
  '/files/s3-presigned-url': {
    get: {
      tags: ['Files'],
      summary: 'Get a presigned URL for file upload',
      description: 'Generates a presigned URL for uploading a file to S3.',
      parameters: [
        {
          name: 'fileName',
          in: 'query',
          required: true,
          description: 'Name of the file to be uploaded',
          schema: {
            type: 'string',
          },
        },
        {
          name: 'fileType',
          in: 'query',
          required: true,
          description: 'MIME type of the file to be uploaded',
          schema: {
            type: 'string',
          },
        },
        {
          name: 'category',
          in: 'query',
          required: true,
          description: 'Category to help determine the folder path in S3',
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
        200: createSuccessResponse('Presigned URL generated successfully'),
        400: createErrorResponse('Missing or invalid parameters'),
        403: createErrorResponse('Access denied for this category'),
        500: serverError,
      },
    },
  },
};
