import Joi from 'joi';
import {
  phoneNumberPattern,
  addressValidationSchema,
  idValidationSchema,
  passwordPattern,
} from '../../helpers/index.js';
import { accountStatus } from '../../constants/index.js';
import { orderItemValidationSchema } from '../order/order.validation.js';
import { roleValidationSchema } from './roleSchema.js';

const userValidationFields = {
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  password: Joi.string()
    .min(8)
    .pattern(passwordPattern)
    .messages({
      'string.pattern.base':
        'Password should have at least one lowercase letter, one uppercase letter, one digit, and one special character',
    })
    .required(),
  email: Joi.string().email().required(),
  avatar: Joi.string().allow(''),
  address: addressValidationSchema,
  phoneNumber: Joi.string()
    .pattern(phoneNumberPattern)
    .messages({
      'string.pattern.base':
        'Phone number should follow the pattern +38(050)1234567',
    })
    .allow(''),
  favoriteDishes: Joi.array().items(idValidationSchema),
  favoriteChefs: Joi.array().items(idValidationSchema),
  cart: Joi.array()
    .items(orderItemValidationSchema)
    .label('Invalid order data'),
  roles: Joi.array().items(roleValidationSchema),
  accountStatus: Joi.string()
    .valid(...Object.values(accountStatus))
    .default(accountStatus.ACTIVE),
};

const { firstName, lastName, password, email } = userValidationFields;

export const userValidationSchema = Joi.object({ ...userValidationFields });

export const registerValidationSchema = Joi.object({
  firstName,
  lastName,
  password,
  email,
});

export const loginValidationSchema = Joi.object({
  password,
  email,
});
