import Joi from 'joi';

const dishValidationSchema = Joi.object({
  name: Joi.string().required(),
  owner: Joi.string().required(),
  image: Joi.string().required(),
  description: Joi.string().required(),
  ingredients: Joi.string().required(),
  price: Joi.number().required(),
  isVegan: Joi.boolean().required(),
  cuisine: Joi.string().required(),
  category: Joi.string().required(),
  isAvailable: Joi.boolean().default(true),
  weight: Joi.number().required(),
  cookTime: Joi.number(),
  nutrition: Joi.object({
    calories: Joi.number(),
    protein: Joi.number(),
    fats: Joi.number(),
    carbohydrates: Joi.number(),
  }),
  spiceLevel: Joi.number().min(0).max(3).default(0),
});

export default dishValidationSchema;
