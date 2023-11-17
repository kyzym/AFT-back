import Joi from 'joi';
import { phoneNumberPattern, addressValidationSchema, idValidationSchema } from '../../helpers';
import { roles, accountStatuses } from '../../constants';
import { orderItemValidationSchema } from '../order/order.validation';

export const userValidationSchema = Joi.object({
  fullName: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  avatar: Joi.string().allow(''),
  address: addressValidationSchema,
  phoneNumber: Joi.string().pattern(phoneNumberPattern).allow(''),
  favoriteDishes: Joi.array().items(idValidationSchema),
  favoriteChefs: Joi.array().items(idValidationSchema),
  cart: Joi.array().items(orderItemValidationSchema, 'Invalid order data'),
  roles: Joi.array().items(Joi.string().valid(...Object.values(roles))).required(),
  accountStatus: Joi.string().valid(...Object.values(accountStatuses)).required(),
});