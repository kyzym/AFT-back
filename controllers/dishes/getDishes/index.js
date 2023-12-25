import { Dish } from '#models/index.js';

export const getDishes = async (req, res) => {
  let query = Dish.find();

  if (req.query.chef) {
    query = query.where('owner').equals(req.query.chef);
  }

  if (req.query.name) {
    const regex = new RegExp(req.query.name, 'i');
    query = query.where('name').regex(regex);
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

  const page = parseInt(req.query.page) || 1;

  const limit = parseInt(req.query.limit) || 10;

  const skipIndex = (page - 1) * limit;

  query = query.skip(skipIndex).limit(limit);

  const dishes = await query.exec();

  const transformedDishes = dishes.map((dish) => dish.toJSON());

  const total = await Dish.countDocuments(query.getFilter());

  res.status(200).json({
    dishes: transformedDishes,
    pageInfo: {
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    },
  });
};
