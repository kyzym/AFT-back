import Joi from 'joi';
import { addressValidationSchema } from '../order/order.validation';
import { accountStatus } from '../../constants/chefEnums';

const ChefValidationSchema = Joi.object({
  userId: Joi.required(),
  chefImage: Joi.string().required(),
  address: addressValidationSchema.required(),
  certificate: Joi.string().required(),
  accountStatus: Joi.string()
    .valid(...accountStatus)
    .required(),
  isAvailable: Joi.boolean().default(true),
});

export default ChefValidationSchema;
