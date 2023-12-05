import Joi from 'joi';
import {
  addressValidationSchema,
  isObjectId,
  phoneNumberPattern,
} from '../../helpers/index.js';

const idValidationSchema = Joi.string().custom(isObjectId, 'Invalid id');

export const orderItemValidationSchema = Joi.object().keys({
  dishId: idValidationSchema.required(),
  count: Joi.number().min(1).required(),
});

export const orderValidationSchema = Joi.object({
  items: Joi.array().min(1).items(orderItemValidationSchema).required(),
  address: addressValidationSchema.required(),
  name: Joi.string().trim().min(3).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string()
    .pattern(phoneNumberPattern)
    .messages({
      'string.pattern.base':
        'Phone number should follow the pattern +38(0##)#######',
    })
    .required(),
  additionalInfo: Joi.string().max(400).allow(null).optional(),
});
