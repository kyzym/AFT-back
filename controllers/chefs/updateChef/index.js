import { ForbiddenError, NotFoundError } from '../../../helpers/errors.js';
import Chef from '../../../models/chef/Chef.model.js';

export const updateChef = async (req, res) => {
  const { chefId } = req.params;
  const chefUpdates = req.body;
  if ('accountStatus' in chefUpdates) {
    if (
      chefUpdates.accountStatus === null ||
      chefUpdates.accountStatus === undefined
    ) {
      throw new ForbiddenError(
        "You are not allowed to change the 'AccountStatus' field"
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
