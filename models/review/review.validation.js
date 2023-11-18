import Joi from 'joi';
import { isObjectId } from '../../helpers';

const idValidationSchema = Joi.string().custom(isObjectId, 'Invalid id');

export const addReviewSchema = Joi.object({
  dish: idValidationSchema.required(),
  rating: Joi.number().min(1).max(5).required(),
  review: Joi.string().max(400).required(),
});
