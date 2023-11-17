import Joi from 'joi';
import { accountStatus } from '../../constants/chefEnums';
import { addressValidationSchema } from '../validations/Adress.validation';

const ChefValidationSchema = Joi.object({
  userId: Joi.required(),
  chefImage: Joi.string().required(),
  address: addressValidationSchema.required(),
  certificate: Joi.string().required(),
  accountStatus: Joi.string()
    .valid(...accountStatus)
    .default(accountStatus.PENDING)
    .required(),
  isAvailable: Joi.boolean().default(false),
});

export default ChefValidationSchema;
