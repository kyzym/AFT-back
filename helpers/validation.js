import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const isObjectId = (value, helpers) => {
  // Use error to return an existing error code
  if (!isValidObjectId(value)) {
    return helpers.message(
      `"${helpers.state.path.at(0)}" should be of type "ObjectId"`
    );
  }

  // Return the value unchanged
  return value;
};

export const phoneNumberPattern = /^\+38\(0[3-9]\d\)\d{7}$/;

export const addressValidationSchema = Joi.object().keys({
  country: Joi.string().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  coordinate: Joi.object().keys({
    lat: Joi.number().min(-90).max(90).required(),
    lng: Joi.number().min(-180).max(180).required(),
  }),
});
