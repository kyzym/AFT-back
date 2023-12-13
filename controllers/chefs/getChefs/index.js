import { getRating } from '#helpers/getRating.js';
import Chef from '../../../models/chef/Chef.model.js';

export const getChefs = async (req, res) => {
  let query = Chef.find().populate('userId', 'firstName lastName');

  if (req.query.isAvailable) {
    query.where({ isAvailable: req.query.isAvailable });
  }
  const chefs = await query.exec();
  let chefsList = [];
  if (req.query.name) {
    const regex = new RegExp(req.query.name, 'i');
    for (const chef of chefs) {
      if ((chef.userId.firstName + ' ' + chef.userId.lastName).match(regex)) {
        chefsList.push(chef);
      }
    }
  } else {
    chefsList = [...chefs];
  }

  const promises = chefs.map((chef) => getRating(chef.id));
  const ratings = await Promise.all(promises);

  let mappedChefs = chefsList.map((chef, index) => {
    chef.rating = ratings[index];
    return chef;
  });
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = mappedChefs.length;
  mappedChefs = mappedChefs.slice(startIndex, endIndex);

  res.status(200).json({
    mappedChefs,
    pageInfo: {
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    },
  });
};
