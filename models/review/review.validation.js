import Joi from 'joi';

const addReviewSchema = Joi.object({
  rating: Joi.number().min(0).max(5).required(),
  review: Joi.string().max(400).required(),
});

export default addReviewSchema;
