import express from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { chefControllers } from '../controllers/index.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = express.Router();

router.get('/', ctrlWrapper(chefControllers.getChefs));

router.get(
  '/:chefId',
  isValidId('chefId'),
  ctrlWrapper(chefControllers.getChef)
);

router.get(
  '/:chefId/orders',
  isValidId('chefId'),
  // role: chef, admin
  ctrlWrapper(chefControllers.getChefOrders)
);

router.get(
  '/:chefId/orders/:status',
  isValidId('chefId'),
  // role: chef, admin
  ctrlWrapper(chefControllers.getChefOrdersByStatus)
);

router.patch(
  '/:chefId',
  isValidId('chefID'),
  //role: chef
  ctrlWrapper(chefControllers.updateChef)
);

router.patch(
  '/:chefId',
  isValidId('chefId'),
  //role: admin
  ctrlWrapper(chefControllers.updateChefAvailableStatus)
);

router.patch(
  '/:chefId/orders/:orderId',
  isValidId(['chefId', 'orderId']),
  //role: chef
  ctrlWrapper(chefControllers.updateChefOrderStatus)
);

router.delete(
  '/:chefId',
  isValidId('chefId'),
  // role: chef, admin
  ctrlWrapper(chefControllers.deleteChef)
);

export default router;
