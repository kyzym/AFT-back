import { Dish } from '../../../models/index.js';

export const getPopularDishes = async (_req, res) => {
  //It's a mock logic
  const sampleSize = 2;

  const dishes = await Dish.aggregate([{ $sample: { size: sampleSize } }]);

  res.status(200).json(dishes);
};
