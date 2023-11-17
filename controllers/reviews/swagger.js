import { getAllReviews } from './getAllReviews/swagger.js';

export const reviewsSwagger = {
  paths: {
    '/reviews': {
      ...getAllReviews.paths['/reviews'],
    },
  },
  components: {
    schemas: {
      ...getAllReviews.components.schemas,
    },
  },
};
