import { Dish } from '../../../models/index.js';

export const getDishes = async (req, res) => {
  let query = Dish.find();

  if (req.query.chef) {
    query = query.where('owner').equals(req.query.chef);
  }

  if (req.query.cuisine) {
    query = query.where('cuisine').equals(req.query.cuisine);
  }

  if (req.query.category) {
    query = query.where('category').equals(req.query.category);
  }

  if (req.query.spiceLevel) {
    query = query.where('spiceLevel').equals(req.query.spiceLevel);
  }

  if (req.query.isVegan) {
    const isVegan = req.query.isVegan === 'true';
    query = query.where('isVegan').equals(isVegan);
  }

  if (req.query.isAvailable) {
    const isAvailable = req.query.isAvailable === 'true';
    query = query.where('isAvailable').equals(isAvailable);
  }

  if (req.query.sortBy) {
    const sortOption =
      req.query.sortBy === 'newest' ? { createdAt: -1 } : { createdAt: 1 };
    query = query.sort(sortOption);
  }

  const dishes = await query.exec();

  res.status(200).json(dishes);
};
