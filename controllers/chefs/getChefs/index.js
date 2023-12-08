import { getRating } from '#helpers/getRating.js';
import Chef from '../../../models/chef/Chef.model.js';

export const getChefs = async (req, res) => {
  const query = {};
  if (req.query.isAvailable) {
    query.isAvailable = req.query.isAvailable === 'true';
  }
  const chefs = await Chef.find(query).exec();

  const promises = chefs.map((chef) => getRating(chef.id));
  const ratings = await Promise.all(promises);

  const mappedChefs = chefs.map((chef, index) => {
    chef.rating = ratings[index];
    return chef;
  });

  return res.status(200).json(mappedChefs);
};
