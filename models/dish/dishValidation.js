import Joi from 'joi';

const dishValidationSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().required(),
  description: Joi.string().required(),
  ingredients: Joi.array().items(Joi.string().required()).required(),
  price: Joi.number().min(0).required(),
  isVegan: Joi.boolean().required(),
  cuisine: Joi.string().required(),
  category: Joi.string().required(),
  isAvailable: Joi.boolean().default(true),
  weight: Joi.number().positive().required(),
  cookTime: Joi.number(),
  nutrition: Joi.object({
    calories: Joi.number().min(0),
    protein: Joi.number().min(0),
    fats: Joi.number().min(0),
    carbohydrates: Joi.number().min(0),
  }),
  spiceLevel: Joi.number().min(0).max(3).default(0),
});

export default dishValidationSchema;
