import express from 'express';

import { isValidDishId } from '../middlewares/isValidDishId.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { dishControllers } from '../controllers/index.js';

const router = express.Router();

router.get('/', ctrlWrapper(dishControllers.getDishes));

router.get('/random', ctrlWrapper(dishControllers.getRandomDish));

router.get('/popular', ctrlWrapper(dishControllers.getPopularDishes));

router.get('/own', ctrlWrapper(dishControllers.getOwnDishes));

router.get('/', ctrlWrapper(dishControllers.getDishesByChef));

router.get('/:dishId', isValidDishId, ctrlWrapper(dishControllers.getDish));

router.post('/', ctrlWrapper(dishControllers.createDish));

router.patch(
  '/:dishId',
  isValidDishId,
  ctrlWrapper(dishControllers.updateDish)
);

router.delete(
  '/:dishId',
  isValidDishId,
  ctrlWrapper(dishControllers.deleteDish)
);

export default router;
