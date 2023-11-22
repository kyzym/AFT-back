import { ValidationError } from '../helpers/errors.js';

export const validate = (schema) => (req, _res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.reduce(
      (acc, e) => ({ ...acc, [e.path.join('.')]: e.message }),
      {}
    );
    throw new ValidationError('Validation error', errors);
  }

  next();
};
