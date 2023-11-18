import { isValidObjectId } from 'mongoose';
import { ValidationError } from '../helpers/errors.js';

export const isValidDishId = (req, _, next) => {
  const { dishId } = req.params;

  if (!isValidObjectId(dishId)) {
    const error = new ValidationError(
      `format of this id:${dishId} is not correct`
    );

    next(error);
  }
  next();
};
