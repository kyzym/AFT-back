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

export const idValidationSchema = Joi.string().custom(isObjectId, 'Invalid id');

export const addressValidationSchema = Joi.object().keys({
  country: Joi.string().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  coordinate: Joi.object().keys({
    lat: Joi.number().min(-90).max(90).required(),
    lng: Joi.number().min(-180).max(180).required(),
  }),
});

// Phone number should follow the pattern, for example: +38(050)1234567
export const phoneNumberPattern = /^\+38\(0[3-9]\d\)\d{7}$/;

// Password should have at least one lowercase letter, one uppercase letter, one digit, and one special character
export const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$_!%*?&])[A-Za-z\d@$_!%*?&]+$/;

// Email should have
// - Non-whitespace characters before the '@' symbol
// - '@' symbol
// - Non-whitespace characters after the '@' symbol
// - '.' symbol
// - Non-whitespace characters after the '.' symbol
export const emailPattern = /\S+@\S+\.\S+/;
