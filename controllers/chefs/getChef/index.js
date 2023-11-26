import { NotFoundError } from '../../../helpers/index.js';
import Chef from '../../../models/chef/Chef.model.js';

export const getChef = async (req, res) => {
  const chef = await Chef.findById(req.params.chefId);

  if (!chef) {
    throw new NotFoundError('Chef not found');
  }

  res.status(200).json(chef);
};
