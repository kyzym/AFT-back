import Joi from 'joi';
import { isObjectId } from '../../helpers/index.js';
import { orderStatus } from '../../constants/index.js';

const idValidationSchema = Joi.string().custom(isObjectId, 'Invalid id');

export const orderItemValidationSchema = Joi.object().keys({
  dishId: idValidationSchema.required(),
  count: Joi.number().min(1).required(),
  price: Joi.number().min(0.01).required(),
});

export const addressValidationSchema = Joi.object().keys({
  country: Joi.string().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  coordinate: Joi.object().keys({
    lat: Joi.number().required(),
    lng: Joi.number().required(),
  }),
});

export const orderValidationSchema = Joi.object({
  userId: idValidationSchema.required(),
  chefId: idValidationSchema.required(),
  courierId: idValidationSchema.required(),

  items: Joi.array().min(1).items(orderItemValidationSchema).required(),
  totalPrice: Joi.number().min(0.01).required(),
  address: addressValidationSchema.required(),
  status: Joi.string().valid(...Object.values(orderStatus)),
});
