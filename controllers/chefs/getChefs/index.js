import { workStatus } from '#constants/workStatus.js';
import { getRating } from '#helpers/getRating.js';
import Chef from '../../../models/chef/Chef.model.js';

export const getChefs = async (req, res) => {
  let query = Chef.find().populate('userId', 'firstName lastName');

  if (req.query.isAvailable) {
    query.isAvailable = req.query.isAvailable === workStatus.ACTIVE;
  }
  const chefs = await query.exec();
  let chefsList = [];
  if (req.query.name) {
    const regex = new RegExp(req.query.name, 'i');
    for (const chef of chefs) {
      if ((chef.userId.firstName + chef.userId.lastName).match(regex)) {
        chefsList.push(chef);
      }
    }
  } else {
    chefsList = [...chefs];
  }

  const promises = chefs.map((chef) => getRating(chef.id));
  const ratings = await Promise.all(promises);

  const mappedChefs = chefsList.map((chef, index) => {
    chef.rating = ratings[index];
    return chef;
  });

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skipIndex = (page - 1) * limit;
  query = query.skip(skipIndex).limit(limit);
  const total = await Chef.countDocuments(query.getFilter());

  res.status(200).json({
    mappedChefs,
    pageInfo: {
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    },
  });
};
