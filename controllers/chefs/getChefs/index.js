import { Chef } from '../../../models/chef/index.js';

export const getChefs = async (req, res) => {
  const query = {};
  if (req.query.isAvailable) {
    query.isAvailable = req.query.isAvailable === 'true';
  }
  const chefs = await Chef.find(query);
  console.log('Chef work', chefs);
  return res.status(200).json(chefs);
};
