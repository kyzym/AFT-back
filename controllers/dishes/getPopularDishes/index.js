import { Dish } from '../../../models/index.js';

export const getPopularDishes = async (_req, res) => {
  //It's a mock logic
  const sampleSize = 2;

  // const dishes = await Dish.aggregate([{ $sample: { size: sampleSize } }]);

  // res.status(200).json(dishes);

  const dishes = await Dish.aggregate([{ $sample: { size: sampleSize } }]);
  const hydratedDishes = dishes.map((dish) => Dish.hydrate(dish));
  const transformedDishes = hydratedDishes.map((dish) => dish.toJSON());

  res.status(200).json(transformedDishes);
};
