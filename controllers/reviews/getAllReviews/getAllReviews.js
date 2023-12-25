import { Review } from '#models/review/index.js';

export const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}, '-createdAt -updatedAt').exec();
  res.status(200).json(reviews);
};
