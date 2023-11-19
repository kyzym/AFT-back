import { ValidationError } from '../helpers/errors.js';

export const validate = (schema) => (req, res, next) => {
  //try {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.reduce(
      (acc, e) => ({ ...acc, [e.path.join('.')]: e.message }),
      {}
    );
    throw new ValidationError('Validation error', errors);
  }

  next();
  //} catch (error) {
  // console.log('Error', error);
  //next(error);
  //}
};
