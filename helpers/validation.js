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
