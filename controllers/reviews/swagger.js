import { addReview } from './addReview/swagger.js';
import { deleteReview } from './deleteReviewById/swagger.js';
import { getAllReviews } from './getAllReviews/swagger.js';
import { getReviewsByChefId } from './getReviewsByChefId/swagger.js';
import { getReviewsByDishId } from './getReviewsByDishId/swagger.js';
import { updateReviewById } from './updateReviewById/swagger.js';

export const reviewsSwagger = {
  paths: {
    '/api/reviews': {
      ...getAllReviews.paths['/api/reviews'],
      ...addReview.paths['/api/reviews'],
    },

    '/reviews/{reviewId}': {
      ...deleteReview.paths['/reviews/{reviewId}'],
      ...updateReviewById.paths['/reviews/{reviewId}'],
    },
    '/reviews/by-chef/{chefId}': {
      ...getReviewsByChefId.paths['/reviews/by-chef/{chefId}'],
    },
    '/reviews/by-dish/{dishId}': {
      ...getReviewsByDishId.paths['/reviews/by-dish/{dishId}'],
    },
  },

  components: {
    schemas: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Bearer token for authentication',
      },
      ...addReview.components.schemas,
      ...getReviewsByChefId.components.schemas,
      ...getAllReviews.components.schemas,
    },
  },
};
