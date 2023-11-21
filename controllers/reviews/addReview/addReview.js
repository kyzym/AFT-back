import { NotFoundError } from '../../../helpers/errors.js';
import { Review /*addReviewSchema*/ } from '../../../models/review/index.js';
import { ctrlWrapper } from '../../../middlewares/ctrlWrapper.js';

export const addReviewController = async (req, res) => {
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

export const addReview = (router) => {
  router.post(
    '/',
    // add authenticate middleware
    // authenticate,
    // validate(addReviewSchema),
    ctrlWrapper(addReviewController)
  );
};
