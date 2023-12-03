import express from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { joiValidation } from '#middlewares/joiValidation.js';
import ChefValidationSchema from '#models/chef/Chef.validation.js';
import { chefControllers } from '#controllers/index.js';
import { verifyToken } from '#middlewares/auth.middleware.js';

const router = express.Router();

router.get(
  '/',
  verifyToken(['user', 'admin', 'chef']),
  ctrlWrapper(chefControllers.chefControllers.getChefs)
);

router.get(
  '/:chefId',
  isValidId('chefId'),
  verifyToken(['user', 'admin', 'chef', 'courier']),
  ctrlWrapper(chefControllers.chefControllers.getChef)
);

router.patch(
  '/:chefId',
  isValidId('chefID'),
  verifyToken(['chef']),
  ctrlWrapper(chefControllers.chefControllers.updateChef)
);

router.patch(
  '/:chefId',
  isValidId('chefId'),
  verifyToken(['admin']),
  ctrlWrapper(chefControllers.chefControllers.updateChefAvailableStatus)
);

router.delete(
  '/:chefId',
  isValidId('chefId'),
  verifyToken(['admin', 'chef']),
  ctrlWrapper(chefControllers.chefControllers.deleteChef)
);

router.post(
  '/',
  joiValidation(ChefValidationSchema),
  verifyToken(['user']),
  ctrlWrapper(chefControllers.chefControllers.createChef)
);

router.patch(
  '/:chefId/orders/:orderId',
  isValidId(['chefId', 'orderId']),
  verifyToken(['chef']),
  ctrlWrapper(chefControllers.chefControllers.updateChefOrderStatus)
);

router.get(
  '/:chefId/orders/:status',
  isValidId('chefId'),
  verifyToken(['admin', 'chef']),
  ctrlWrapper(chefControllers.chefControllers.getChefOrdersByStatus)
);

router.get(
  '/:chefId/orders',
  isValidId('chefId'),
  verifyToken(['admin', 'chef']),
  ctrlWrapper(chefControllers.chefControllers.getChefOrders)
);

export default router;
