import Joi from 'joi';
import { CATEGORIES, CUISINES } from '../../constants/dishEnums.js';

const dishValidationSchema = Joi.object({
  name: Joi.string().min(1).required(),

  image: Joi.string().uri().required(),

  description: Joi.string().min(10).max(400).required(),

  ingredients: Joi.array().items(Joi.string().required()).required(),

  price: Joi.number().min(0.01).required(),

  isVegan: Joi.boolean().required(),

  cuisine: Joi.string()
    .valid(...CUISINES)
    .required(),

  category: Joi.string()
    .valid(...CATEGORIES)
    .required(),

  isAvailable: Joi.boolean().default(true),

  weight: Joi.number().positive().required(),

  cookTime: Joi.number().greater(0).required(),

  nutrition: Joi.object({
    calories: Joi.number().min(0),
    protein: Joi.number().min(0),
    fats: Joi.number().min(0),
    carbohydrates: Joi.number().min(0),
  }),

  spiceLevel: Joi.number().min(0).max(3).default(0),
});

export default dishValidationSchema;
