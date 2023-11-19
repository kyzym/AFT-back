import Joi from 'joi';
import { isObjectId } from '../../helpers/index.js';

const idValidationSchema = Joi.string().custom(isObjectId, 'Invalid id');

export const orderItemValidationSchema = Joi.object().keys({
  dishId: idValidationSchema.required(),
  count: Joi.number().min(1).required(),
  name: Joi.string().min(1).max(100).required(),
});

export const addressValidationSchema = Joi.object().keys({
  country: Joi.string()
    .trim()
    .min(1)
    .max(255)
    .pattern(/^[a-zA-Z\s'-]+$/)
    .required()
    .messages({
      'string.base': 'Country name must be a string',
      'string.empty': 'Country name cannot be empty',
      'string.min': 'Country name must have at least {#limit} character',
      'string.max': 'Country name cannot exceed {#limit} characters',
      'string.pattern.base':
        'Invalid characters in the country name. Valid characters include letters, spaces, hyphens, and apostrophes',
      'any.required': 'Country name is required',
    }),
  city: Joi.string()
    .trim()
    .min(1)
    .max(255)
    .pattern(/^[a-zA-Z\s'-]+$/)
    .required()
    .messages({
      'string.base': 'City name must be a string',
      'string.empty': 'City name cannot be empty',
      'string.min': 'City name must have at least {#limit} character',
      'string.max': 'City name cannot exceed {#limit} characters',
      'string.pattern.base':
        'Invalid characters in the city name. Valid characters include letters, spaces, hyphens, and apostrophes',
      'any.required': 'City name is required',
    }),
  street: Joi.string().trim().min(1).max(255).required().messages({
    'string.base': 'Street name must be a string',
    'string.empty': 'Street name cannot be empty',
    'string.min': 'Street name must have at least {#limit} character',
    'string.max': 'Street name cannot exceed {#limit} characters',
    'any.required': 'Street name is required',
  }),
  coordinate: Joi.object().keys({
    lat: Joi.number().min(-90).max(90).required(),
    lng: Joi.number().min(-180).max(180).required(),
  }),
});

export const orderValidationSchema = Joi.object({
  userId: idValidationSchema.required(),
  chefId: idValidationSchema,
  courierId: idValidationSchema,

  items: Joi.array().min(1).items(orderItemValidationSchema).required(),
  address: addressValidationSchema.required(),
});
