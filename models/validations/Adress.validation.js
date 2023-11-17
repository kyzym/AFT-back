export const addressValidationSchema = Joi.object().keys({
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    coordinate: Joi.object().keys({
      lat: Joi.number().min(-90).max(90).required(),
      lng: Joi.number().min(-180).max(180).required(),
    }),
  });