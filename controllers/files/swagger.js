import { getS3PresignedUrlSwagger } from './getPresignedUrl/swagger.js';
import { getS3PresignedDeleteUrlSwagger } from './getPresignedDeleteUrl/swagger.js';

const combinedFilesPaths = {
  '/files/s3-presigned-url': {
    ...getS3PresignedUrlSwagger['/files/s3-presigned-url'],
  },
  '/files/s3-presigned-delete-url': {
    ...getS3PresignedDeleteUrlSwagger['/files/s3-presigned-delete-url'],
  },
};

export const filesSwagger = {
  paths: {
    ...combinedFilesPaths,
  },
};
