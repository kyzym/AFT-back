import { ForbiddenError, NotFoundError } from '../../../helpers/errors.js';
import Chef from '../../../models/chef/Chef.model.js';

export const updateChef = async (req, res) => {
  const { chefId } = req.params;
  const chefUpdates = req.body;

  if ('isAvailable' in chefUpdates) {
    if (
      chefUpdates.isAvailable === null ||
      chefUpdates.isAvailable === undefined
    ) {
      throw new ForbiddenError(
        "You are not allowed to change the 'isAvailable' field"
      );
    }
  }

  const updatedChef = await Chef.findByIdAndUpdate(chefId, chefUpdates, {
    new: true,
  });

  if (!updatedChef) {
    throw new NotFoundError('Chef not found');
  }

  res.status(200).json({ message: 'Chef update successfully' });
};
