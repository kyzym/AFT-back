import Joi from 'joi';
import { accountStatus } from '../../constants/accountStatus';
import { addressValidationSchema } from '../validations/Adress.validation';
import { vehicleType } from '../../constants/vehicleType';
import { phoneNumberPattern } from '../../helpers/validation';

const CourierValidationSchema = Joi.object({
  userId: Joi.required(),
  avatar: Joi.string().required(),
  phoneNumber: Joi.string().pattern(phoneNumberPattern).required(),
  address: addressValidationSchema.required(),
  vechicleType: Joi.string(0)
    .valid(...vehicleType)
    .default(vehicleType.NONE).required,
  accountStatus: Joi.string()
    .valid(...accountStatus)
    .default(accountStatus.PENDING)
    .required(),
  isAvailable: Joi.boolean().default(false),
});

export default CourierValidationSchema;
