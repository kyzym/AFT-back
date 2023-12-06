import express from 'express';

import { dishControllers } from '../controllers/index.js';
import {
  ctrlWrapper,
  isValidId,
  joiValidation,
  verifyToken,
} from '../middlewares/index.js';
import { dishValidationSchema } from '../models/index.js';
import { roles } from '#constants/roles.js';
import { addOwnerToBody } from '#middlewares/addOwnerToBody.js';

const router = express.Router();

router.get('/', ctrlWrapper(dishControllers.getDishes));

router.get(
  '/own',
  verifyToken([roles.CHEF]),
  ctrlWrapper(dishControllers.getOwnDishes)
);

router.get('/random', ctrlWrapper(dishControllers.getRandomDish));

router.get('/popular', ctrlWrapper(dishControllers.getPopularDishes));

router.get(
  '/:dishId',
  isValidId('dishId'),
  ctrlWrapper(dishControllers.getDish)
);

router.post(
  '/',
  verifyToken([roles.CHEF]),
  addOwnerToBody,
  joiValidation(dishValidationSchema),
  ctrlWrapper(dishControllers.createDish)
);

router.patch(
  '/:dishId',
  isValidId('dishId'),
  verifyToken([roles.CHEF]),
  ctrlWrapper(dishControllers.updateDish)
);

router.patch(
  '/:dishId',
  isValidId('dishId'),
  verifyToken([roles.ADMIN]),
  ctrlWrapper(dishControllers.updateDishBlockedStatus)
);

router.delete(
  '/:dishId',
  isValidId('dishId'),
  verifyToken([roles.CHEF, roles.ADMIN]),
  ctrlWrapper(dishControllers.deleteDish)
);

export default router;
