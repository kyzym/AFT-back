import { ForbiddenError, NotFoundError } from '../../../helpers/errors.js';
import { Chef } from '../../../models/chef/index.js';

export const updateChef = async (req, res) => {
  const { chefId } = req.params;
  const chefUpdates = req.body;

  if ('isAvailable' in chefUpdates) {
    throw new ForbiddenError(
      "You are not allowed to change the 'isAvailable' field"
    );
  }

  const updatedChef = await Chef.findByIdAndUpdate(chefId, chefUpdates, {
    new: true,
  });

  if (!updatedChef) {
    throw new NotFoundError('Chef not found');
  }

  res.status(200).json(updatedChef);
};
