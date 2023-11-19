import { isValidObjectId } from 'mongoose';
import { ValidationError } from '../helpers/errors.js';

export const isValidParameterId = (req, _res, next) => {
  const [id] = Object.values(req.params);

  if (!isValidObjectId(id)) {
    throw new ValidationError(
      `The format of parameter ID: "${id}" is incorrect`
    );
  }

  next();
};
