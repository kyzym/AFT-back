import Joi from 'joi';
import {
  phoneNumberPattern,
  idValidationSchema,
  passwordPattern,
  addressValidationFields,
} from '#helpers/index.js';
import { accountStatus } from '#constants/index.js';
import { roleValidationSchema } from './roleSchema.js';

export const cartItemValidationSchema = Joi.object({
  dishId: idValidationSchema.required(),
  count: Joi.number().integer().min(1).required().strict(true),
});

const userAddressValidationSchema = Joi.object({
  ...addressValidationFields,
  country: addressValidationFields.country.allow(''),
  city: addressValidationFields.city.allow(''),
  street: addressValidationFields.street.allow(''),
  houseNumber: addressValidationFields.houseNumber.allow(''),
});

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
  address: userAddressValidationSchema,
  phoneNumber: Joi.string()
    .pattern(phoneNumberPattern)
    .messages({
      'string.pattern.base':
        'Phone number should follow the pattern +38(050)1234567',
    })
    .allow(''),
  favoriteDishes: Joi.array().items(idValidationSchema),
  favoriteChefs: Joi.array().items(idValidationSchema),
  cart: Joi.object({
    chefId: idValidationSchema,
    items: Joi.array().items(cartItemValidationSchema),
  }),
  roles: Joi.array().items(roleValidationSchema),
  accountStatus: Joi.string()
    .valid(accountStatus.ACTIVE, accountStatus.BLOCKED)
    .default(accountStatus.ACTIVE),
};

const { firstName, lastName, password, email, avatar, phoneNumber } =
  userValidationFields;

export const userValidationSchema = Joi.object({ ...userValidationFields });

export const registerValidationSchema = Joi.object({
  firstName,
  lastName,
  password,
  email,
});

export const loginValidationSchema = Joi.object({
  password: Joi.string().required(),
  email,
});

export const addFavoriteValidationSchema = Joi.object({
  favoriteId: idValidationSchema.required(),
});

export const updateUserValidationSchema = Joi.object({
  firstName: userValidationFields.firstName.optional(),
  lastName: userValidationFields.lastName.optional(),
  email: userValidationFields.email.optional(),
  currentPassword: userValidationFields.password.allow(''),
  newPassword: userValidationFields.password.allow(''),
  avatar,
  address: userAddressValidationSchema,
  phoneNumber,
});

export const cartValidationSchema = Joi.object({
  item: cartItemValidationSchema.required(),
});

export const userStatusValidationSchema = Joi.object({
  accountStatus: Joi.string()
    .valid(accountStatus.ACTIVE, accountStatus.BLOCKED)
    .required(),
});
