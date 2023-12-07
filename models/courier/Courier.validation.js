import Joi from 'joi';
import { vehicleType } from '../../constants/vehicleType.js';
import {
  addressValidationSchema,
  isObjectId,
  phoneNumberPattern,
} from '../../helpers/validation.js';
import { accountStatus } from '../../constants/accountStatus.js';

const idValidationSchema = Joi.string().custom(isObjectId, 'Invalid id');

const CourierValidationSchema = Joi.object({
  userId: idValidationSchema.required(),
  avatar: Joi.string().uri().required(),
  phoneNumber: Joi.string().pattern(phoneNumberPattern).required(),
  address: addressValidationSchema.required(),
  vehicleType: Joi.string()
    .valid(...Object.values(vehicleType))
    .default(vehicleType.NONE)
    .required(),
  accountStatus: Joi.string()
    .valid(...Object.values(accountStatus))
    .default(accountStatus.PENDING)
    .required(),
  liqpayKey: Joi.string().required(),
  isAvailable: Joi.boolean().default(false),
});

export default CourierValidationSchema;
