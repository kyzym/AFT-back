import Joi from 'joi';
import { accountStatus } from '../../constants/accountStatus';
import { addressValidationSchema } from '../validations/Adress.validation';
import { vehicleType } from '../../constants/vehicleType';

const CourierValidationSchema = Joi.object({
  userId: Joi.required(),
  courierImage: Joi.string().required(),
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
