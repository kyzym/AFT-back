import express from 'express';

import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { dishControllers } from '../controllers/index.js';

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

router.post('/', ctrlWrapper(dishControllers.createDish));

router.patch(
  '/:dishId',
  isValidId('dishId'),
  ctrlWrapper(dishControllers.updateDish)
);

router.delete(
  '/:dishId',
  isValidId('dishId'),
  ctrlWrapper(dishControllers.deleteDish)
);

export default router;
