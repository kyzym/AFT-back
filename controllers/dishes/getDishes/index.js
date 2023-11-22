import { Dish } from '../../../models/index.js';

export const getDishes = async (req, res) => {
  const query = {};
  let sortOption = {};

  if (req.query.cuisine) {
    query.cuisine = req.query.cuisine;
  }

  if (req.query.isVegan) {
    query.isVegan = req.query.isVegan === 'true';
  }

  if (req.query.category) {
    query.category = req.query.category;
  }

  if (req.query.spiceLevel) {
    query.spiceLevel = req.query.spiceLevel;
  }

  if (req.query.isAvailable) {
    query.isAvailable = req.query.isAvailable === 'true';
  }

  if (req.query.sortBy === 'newest') {
    sortOption = { createdAt: -1 };
  }

  if (req.query.sortBy === 'oldest') {
    sortOption = { createdAt: 1 };
  }

  const dishes = await Dish.find(query).sort(sortOption);

  res.status(200).json(dishes);
};
