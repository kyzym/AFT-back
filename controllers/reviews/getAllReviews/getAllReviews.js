import Review from '../../../models/review';

export const getAllReviews = async (app) => {
  app.get('/reviews', async (req, res) => {
    try {
      const reviews = await Review.find().populate('owner', 'name _id').exec();
      res.status(200).json(reviews);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};
