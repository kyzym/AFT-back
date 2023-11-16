import { HttpError } from '../helpers/HttpError.js';

// Middleware for validate body
export const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, 'missing required name field'));
    }
    next();
  };

  return func;
};
