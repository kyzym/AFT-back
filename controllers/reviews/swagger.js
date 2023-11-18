import { addReview } from './addReview/swagger.js';
import { deleteReview } from './deleteReviewById/swagger.js';
import { getAllReviews } from './getAllReviews/swagger.js';
import { getReviewById } from './getReviewById/swagger.js';
import { getReviewsByChefId } from './getReviewsByChefId/swagger.js';

export const reviewsSwagger = {
  paths: {
    '/reviews': {
      ...getAllReviews.paths['/reviews'],
      ...addReview.paths['/reviews'],
    },
    '/reviews/{reviewId}': {
      ...deleteReview.paths['/reviews/{reviewId}'],
      ...getReviewById.paths['/reviews/{reviewId}'],
    },
    '/reviews/by-chef/{chefId}': {
      ...getReviewsByChefId.paths['/reviews/by-chef/{chefId}'],
    },
  },

  components: {
    schemas: {
      ...getAllReviews.components.schemas,
      ...addReview.components.schemas,
      ...deleteReview.components.schemas,
      ...getReviewById.components.schemas,
      ...getReviewsByChefId.components.schemas,
    },
  },
};
