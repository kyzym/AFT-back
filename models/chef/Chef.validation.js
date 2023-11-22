import Joi from 'joi';
import { accountStatus } from '../../constants/accountStatus';
import {
  addressValidationSchema,
  phoneNumberPattern,
} from '../../helpers/validation';

const ChefValidationSchema = Joi.object({
  userId: Joi.string().required(),
  avatar: Joi.string().required(),
  phoneNumber: Joi.string().pattern(phoneNumberPattern).required(),
  address: addressValidationSchema.required(),
  certificate: Joi.string().required(),
  accountStatus: Joi.string()
    .valid(...Object.values(accountStatus))
    .default(accountStatus.PENDING)
    .required(),

  isAvailable: Joi.boolean().default(false),
});

export default ChefValidationSchema;
