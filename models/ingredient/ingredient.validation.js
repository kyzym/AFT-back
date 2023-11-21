import Joi from 'joi';

export const addIngredientSchema = Joi.object({
  name: Joi.string().max(50).required(),
});
