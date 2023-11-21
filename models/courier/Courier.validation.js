import Joi from 'joi';
import { vehicleType } from '../../constants/vehicleType';
import {
  addressValidationSchema,
  isObjectId,
  phoneNumberPattern,
} from '../../helpers/validation';
import { accountStatus } from '../../constants/accountStatus';

const idValidationSchema = Joi.string().custom(isObjectId, 'Invalid id');

const CourierValidationSchema = Joi.object({
  userId: idValidationSchema.required(),
  avatar: Joi.string().required(),
  phoneNumber: Joi.string().pattern(phoneNumberPattern).required(),
  address: addressValidationSchema.required(),
  vechicleType: Joi.string(0)
    .valid(...Object.values(vehicleType))
    .default(vehicleType.NONE).required,
  accountStatus: Joi.string()
    .valid(...Object.values(accountStatus))
    .default(accountStatus.PENDING)
    .required(),
  isAvailable: Joi.boolean().default(false),
});

export default CourierValidationSchema;
