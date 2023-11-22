import { Chef } from '../../../models/chef/index.js';

export const deleteChef = async (req, res) => {
  await Chef.findByIdAndDelete(req.params.chefId);

  res.status(200).json({ message: 'Chef processed for deletion' });
};
