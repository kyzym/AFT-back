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

    '/api/reviews/{reviewId}': {
      ...deleteReview.paths['/api/reviews/{reviewId}'],
      ...updateReviewById.paths['/api/reviews/{reviewId}'],
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
      Review: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Generated unique identifier',
          },
          owner: {
            type: 'string',
            format: 'uuid',
          },
          dish: {
            type: 'string',
            format: 'uuid',
          },
          rating: {
            type: 'integer',
          },
          review: {
            type: 'string',
          },
        },
      },

      ReviewByChefIdOrDishId: {
        type: 'object',
        properties: {
          reviews: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  format: 'uuid',
                  description: 'Generated unique identifier',
                },
                owner: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', format: 'uuid' },
                    firstName: 'string',
                    lastName: 'string',
                    avatar: 'string',
                  },
                },
                dish: {
                  type: 'object',
                  properties: {
                    owner: {
                      type: 'string',
                      format: 'uuid',
                    },
                    id: {
                      type: 'string',
                      id: 'string',
                      format: 'uuid',
                    },
                  },
                },
                rating: {
                  type: 'integer',
                },
                review: {
                  type: 'string',
                },
              },
            },
          },
          totalReviews: {
            type: 'integer',
          },
        },
      },

      AddReview: {
        type: 'object',
        required: ['owner', 'dish', 'rating', 'review'],
        properties: {
          owner: {
            type: 'string',
            description: 'The id of the review owner',
            format: 'uuid',
          },
          dish: {
            type: 'string',
            description: 'The id of the reviewed dish',
            format: 'uuid',
          },
          rating: {
            type: 'integer',
            description: 'The rating given to the dish (integer value)',
            minimum: 1,
            maximum: 5,
          },
          review: {
            type: 'string',
            description: 'The review text',
            maxLength: 400,
          },
        },
      },
      ...getReviewsByChefId.components.schemas,
    },
  },
};
