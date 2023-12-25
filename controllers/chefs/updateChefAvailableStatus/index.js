import { NotFoundError } from '#helpers/errors.js';
import { Chef } from '#models/chef/index.js';

export const updateChefAvailableStatus = async (req, res) => {
  const { chefId } = req.params;
  const { accountStatus } = req.body;

  const updatedChef = await Chef.findByIdAndUpdate(
    chefId,
    { accountStatus },
    { new: true }
  );

  if (!updatedChef) {
    throw new NotFoundError('Chef not found');
  }

  res
    .status(200)
    .json({ message: `Chef available status updated to ${accountStatus}` });
};
