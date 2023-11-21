import { Dish } from '../../../models/index.js';

export const getRandomDish = async (_req, res) => {
  const sampleSize = 1;

  const randomDish = await Dish.aggregate([{ $sample: { size: sampleSize } }]);

  const dish = randomDish[0] || null;

  res.status(200).json(dish);
};
