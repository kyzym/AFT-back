import { Router } from 'express';
import { addReview } from './addReview/addReview';
import { deleteReviewById } from './deleteReviewById/deleteReviewById';
import { getAllReviews } from './getAllReviews/swagger';

const reviewsRouter = Router();

addReview(reviewsRouter);
deleteReviewById(reviewsRouter);
getAllReviews(reviewsRouter);

export default reviewsRouter;
