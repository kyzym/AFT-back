import Joi from 'joi';
import { accountStatus } from '../../constants/accountStatus.js';
import {
  addressValidationSchema,
  isObjectId,
  phoneNumberPattern,
} from '../../helpers/validation.js';
import { workStatus } from '#constants/workStatus.js';

const idValidationSchema = Joi.string().custom(isObjectId, 'Invalid id');

const ChefValidationSchema = Joi.object({
  userId: idValidationSchema.required(),
  avatar: Joi.string().uri().required(),
  phoneNumber: Joi.string().pattern(phoneNumberPattern).required(),
  address: addressValidationSchema.required(),
  certificate: Joi.string().uri().required(),
  accountStatus: Joi.string()
    .valid(...Object.values(accountStatus))
    .default(accountStatus.PENDING),
  liqpayKey: Joi.string().required(),
  isAvailable: Joi.string()
    .valid(...Object.values(workStatus))
    .default(workStatus.NON_ACTIVE)
    .required(),
});

export default ChefValidationSchema;
