import { isValidObjectId } from 'mongoose';
import { ValidationError } from '../helpers/errors.js';

export const isValidId =
  (...paramsToCheck) =>
  (req, _res, next) => {
    paramsToCheck.forEach((param) => {
      const idToCheck = req.params[param];

      if (idToCheck && !isValidObjectId(idToCheck)) {
        return next(
          new ValidationError(`Format of this ID: ${idToCheck} is not correct`)
        );
      }
    });
    next();
  };
