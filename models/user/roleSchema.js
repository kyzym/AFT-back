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
      required: true,
    },
  },
  { _id: false }
);

export const roleValidationSchema = Joi.object({
  name: Joi.string()
    .valid(...Object.values(roles))
    .required(),
  id: idValidationSchema.required(),
});

export const getDefaultRoles = function () {
  return [
    {
      name: roles.USER,
      id: this._id,
    },
  ];
};
