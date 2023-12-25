import { Review } from '#models/review/Review.model.js';
import { NotFoundError } from '#helpers/index.js';
import { Dish } from '#models/index.js';

export const getDish = async (req, res) => {
  const dish = await Dish.findById(req.params.dishId)
    .select('-isBlocked')
    .populate({
      path: 'owner',
      select: 'id avatar',
      populate: {
        path: 'userId',
        select: 'firstName lastName avatar -_id',
      },
    })
    .populate({
      path: 'ingredients',
      select: 'name',
    });

  if (!dish) {
    throw new NotFoundError('Dish not found');
  }

  const lastHighRatingReview = await Review.findOne({
    dish: req.params.dishId,
    rating: { $gte: 4 },
  })
    .sort({ createdAt: -1 })
    .populate({
      path: 'owner',
      select: 'firstName lastName',
    })
    .select('rating review owner');

  const response = {
    ...dish.toJSON(),
    lastHighRatingReview: lastHighRatingReview
      ? lastHighRatingReview.toObject()
      : null,
  };

  res.status(200).json(response);
};
