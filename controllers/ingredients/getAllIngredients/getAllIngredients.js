import { Ingredient } from '#models/ingredient/Ingredient.model.js';

export const getAllIngredients = async (req, res) => {
  const ingredients = await Ingredient.find({}, '-createdAt -updatedAt').exec();
  res.status(200).json(ingredients);
};
