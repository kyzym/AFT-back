import Joi from 'joi';
import { Schema } from 'mongoose';
import { roles } from '../../constants/index.js';
import { idValidationSchema } from '../../helpers/validation.js';

export const roleSchema = new Schema(
  {
    name: {
      type: String,
      enum: Object.values(roles),
      required: true,
    },
    id: {
      type: Schema.Types.ObjectId,
      default: null,
    },
  },
  { _id: false }
);

export const roleValidationSchema = Joi.object({
  name: Joi.string()
    .valid(...Object.values(roles))
    .not(roles.USER)
    .required(),
  id: Joi.alternatives().try(Joi.allow(null), idValidationSchema).required(),
});

export const getDefaultRoles = () => {
  const { USER, ...otherRoles } = roles; // eslint-disable-line no-unused-vars

  return Object.values(otherRoles).map((role) => ({
    name: role,
    id: null,
  }));
};
