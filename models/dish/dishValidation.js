import Joi from 'joi';
import { CATEGORIES, CUISINES } from '../../constants/dishEnums.js';
import { idValidationSchema } from '#helpers/validation.js';

const dishValidationSchema = Joi.object({
  owner: idValidationSchema.required(),

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

  cookTimeInMinutes: Joi.number().greater(0).required(),

  nutrition: Joi.object({
    calories: Joi.number().min(0).optional().allow(''),
    protein: Joi.number().min(0).optional().allow(''),
    fats: Joi.number().min(0).optional().allow(''),
    carbohydrates: Joi.number().min(0).optional().allow(''),
  }).optional(),

  spiceLevel: Joi.number().min(0).max(3).default(0),
});

export default dishValidationSchema;
