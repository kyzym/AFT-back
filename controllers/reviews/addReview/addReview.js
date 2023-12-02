import { Review } from '../../../models/review/index.js';

export const addReview = async (req, res) => {
  // const { id: owner } = req.user;
  const owner = '6561f42ef5c506ec5f36dbba';

  const data = {
    ...req.body,
    owner,
  };

  await Review.create(data);
  res.status(201).json({ message: 'Review created successfully' });
};
