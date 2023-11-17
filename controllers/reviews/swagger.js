import { addReview } from './addReview/swagger.js';
import { deleteReview } from './deleteReviewById/swagger.js';
import { getAllReviews } from './getAllReviews/swagger.js';

export const reviewsSwagger = {
  paths: {
    '/reviews': {
      ...getAllReviews.paths['/reviews'],
      ...addReview.paths['/reviews'],
      ...deleteReview.paths['/reviews/:reviewId'],
    },
  },
  components: {
    schemas: {
      ...getAllReviews.components.schemas,
      ...addReview.components.schemas,
      ...deleteReview.components.schemas,
    },
  },
};
