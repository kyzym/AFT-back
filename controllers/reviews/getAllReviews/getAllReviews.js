import { ctrlWrapper } from '../../../middlewares/ctrlWrapper.js';
import { Review } from '../../../models/review/index.js';

export const getAllReviewsCOntroller = async (req, res) => {
  const reviews = await Review.find({}, '-createdAt -updatedAt').exec();
  res.status(200).json(reviews);
};

export const getAgetAllReviewsllIngredients = (router) => {
  router.get(
    '/',
    // add authenticate middleware
    // authenticate,);
    ctrlWrapper(getAllReviewsCOntroller)
  );
};
