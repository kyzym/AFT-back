import express from 'express';

import { dishControllers } from '../controllers/index.js';
import { ctrlWrapper, isValidId, joiValidation } from '../middlewares/index.js';
import { dishValidationSchema } from '../models/index.js';

const router = express.Router();

router.get('/', ctrlWrapper(dishControllers.getDishes));

router.get('/random', ctrlWrapper(dishControllers.getRandomDish));

router.get('/popular', ctrlWrapper(dishControllers.getPopularDishes));

router.get('/own', ctrlWrapper(dishControllers.getOwnDishes));

router.get('/', ctrlWrapper(dishControllers.getDishesByChef));

router.get(
  '/:dishId',
  isValidId('dishId'),
  ctrlWrapper(dishControllers.getDish)
);

router.post(
  '/',
  joiValidation(dishValidationSchema),
  ctrlWrapper(dishControllers.createDish)
);

router.patch(
  '/:dishId',
  isValidId('dishId'),
  joiValidation(dishValidationSchema),
  ctrlWrapper(dishControllers.updateDish)
);

router.delete(
  '/:dishId',
  isValidId('dishId'),
  ctrlWrapper(dishControllers.deleteDish)
);

export default router;
