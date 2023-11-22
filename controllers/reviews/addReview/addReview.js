import { Review } from '../../../models/review/index.js';

export const addReview = async (req, res) => {
  const { id: owner } = req.user;

  const data = {
    ...req.body,
    owner,
  };

  await Review.create(data);
  res.status(201).json({ message: 'Review created successfully' });
};
