import { isValidObjectId } from 'mongoose';
import { ValidationError } from '../helpers/errors';

export const isValidId = (idParamName) => (req, res, next) => {
  const id = req.params[idParamName];
  if (!isValidObjectId(id)) {
    next(new ValidationError(`${id} - is not valid id`));
  }
  next();
};
