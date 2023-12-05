import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const isObjectId = (value, helpers) => {
  // Use error to return an existing error code
  if (!isValidObjectId(value)) {
    return helpers.message(
      `"${helpers.state.path.at(0)}" should be of type "ObjectId"`
    );
  }

  // Return the value unchanged
  return value;
};

export const idValidationSchema = Joi.string().custom(isObjectId, 'Invalid id');

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
  houseNumber: Joi.string().trim().min(1).max(10).required(),
  apartment: Joi.string().trim().min(0).allow(null).optional(),
  coordinate: Joi.object()
    .keys({
      lat: Joi.number().min(-90).max(90).required(),
      lng: Joi.number().min(-180).max(180).required(),
    })
    .allow(null)
    .optional(),
});

// Phone number should follow the pattern, for example: +38(050)1234567
export const phoneNumberPattern = /^\+38\(0[3-9]\d\)\d{7}$/;

// Password should have at least one lowercase letter, one uppercase letter, one digit, and one special character
export const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*_+|~\-={}:;'"<>,.?!])[A-Za-z\d@#$%^&*_+|~\-={}:;'"<>,.?!]+$/;

// Email should have
// - Non-whitespace characters before the '@' symbol
// - '@' symbol
// - Non-whitespace characters after the '@' symbol
// - '.' symbol
// - Non-whitespace characters after the '.' symbol
export const emailPattern = /\S+@\S+\.\S+/;

export const isEmailValid = (email) =>
  !Joi.string().email().validate(email).error;
