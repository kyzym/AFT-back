import { NotFoundError } from '../../../helpers/errors.js';
import { Review } from '../../../models/review/index.js';

export const addReview = async (req, res) => {
  const { id: owner } = req.user;

  const data = {
    ...req.body,
    owner,
  };

  const review = await Review.create(data);
  if (!review) {
    throw new NotFoundError('Not found');
  }
  res.status(201).json({ message: 'Review created successfully' });
};
