import express from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { joiValidation } from '#middlewares/joiValidation.js';
import ChefValidationSchema from '#models/chef/Chef.validation.js';
import { chefControllers } from '#controllers/index.js';

const router = express.Router();

router.get('/', ctrlWrapper(chefControllers.chefControllers.getChefs));

router.get(
  '/:chefId',
  isValidId('chefId'),
  ctrlWrapper(chefControllers.chefControllers.getChef)
);

router.get(
  '/:chefId/orders',
  isValidId('chefId'),
  // role: chef, admin
  ctrlWrapper(chefControllers.chefControllers.getChefOrders)
);

router.get(
  '/:chefId/orders/:status',
  isValidId('chefId'),
  // role: chef, admin
  ctrlWrapper(chefControllers.chefControllers.getChefOrdersByStatus)
);

router.patch(
  '/:chefId',
  isValidId('chefID'),
  //role: chef
  ctrlWrapper(chefControllers.chefControllers.updateChef)
);

router.patch(
  '/:chefId',
  isValidId('chefId'),
  //role: admin
  ctrlWrapper(chefControllers.chefControllers.updateChefAvailableStatus)
);

router.patch(
  '/:chefId/orders/:orderId',
  isValidId(['chefId', 'orderId']),
  //role: chef
  ctrlWrapper(chefControllers.chefControllers.updateChefOrderStatus)
);

router.delete(
  '/:chefId',
  isValidId('chefId'),
  // role: chef, admin
  ctrlWrapper(chefControllers.chefControllers.deleteChef)
);

router.post(
  '/',
  joiValidation(ChefValidationSchema),
  // role: chef
  ctrlWrapper(chefControllers.chefControllers.createChef)
);

export default router;
