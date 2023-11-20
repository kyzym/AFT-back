import express from 'express';

import { dishControllers } from '../controllers/index.js';
import { ctrlWrapper, isValidId, joiValidation } from '../middlewares/index.js';
import { dishValidationSchema } from '../models/index.js';

// import { isAuthenticated, hasRole } from ' universe ';

const router = express.Router();

router.get(
  '/',
  // isAuthenticated,
  // hasRole(['user', 'admin']),
  ctrlWrapper(dishControllers.getDishes)
);

router.get(
  '/',
  // isAuthenticated,
  // hasRole(['user', 'admin']),
  ctrlWrapper(dishControllers.getDishesByChef)
);

router.get(
  '/:dishId',
  isValidId('dishId'),
  // isAuthenticated,
  ctrlWrapper(dishControllers.getDish)
);

router.get(
  '/own',
  // isAuthenticated,
  // hasRole(['chef']),
  ctrlWrapper(dishControllers.getOwnDishes)
);

router.get('/random', ctrlWrapper(dishControllers.getRandomDish));

router.get('/popular', ctrlWrapper(dishControllers.getPopularDishes));

router.post(
  '/',
  joiValidation(dishValidationSchema),
  // isAuthenticated,
  // hasRole(['chef']),
  ctrlWrapper(dishControllers.createDish)
);

router.patch(
  '/:dishId',
  isValidId('dishId'),
  // isAuthenticated,
  // hasRole(['chef']),
  ctrlWrapper(dishControllers.updateDish)
);

router.delete(
  '/:dishId',
  isValidId('dishId'),
  // isAuthenticated,
  // hasRole(['chef', 'admin']),
  ctrlWrapper(dishControllers.deleteDish)
);

export default router;
