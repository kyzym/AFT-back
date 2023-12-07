import Joi from 'joi';
import { accountStatus } from '../../constants/accountStatus.js';
import {
  addressValidationSchema,
  isObjectId,
  phoneNumberPattern,
} from '../../helpers/validation.js';

const idValidationSchema = Joi.string().custom(isObjectId, 'Invalid id');

const ChefValidationSchema = Joi.object({
  userId: idValidationSchema.required(),
  avatar: Joi.string().uri().required(),
  phoneNumber: Joi.string().pattern(phoneNumberPattern).required(),
  address: addressValidationSchema.required(),
  certificate: Joi.string().uri().required(),
  accountStatus: Joi.string()
    .valid(...Object.values(accountStatus))
    .default(accountStatus.PENDING)
    .required(),
  liqpayKey: Joi.string().required(),
  isAvailable: Joi.boolean().default(false),
});

export default ChefValidationSchema;
