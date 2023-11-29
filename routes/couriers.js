import express from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { joiValidation } from '#middlewares/joiValidation.js';
import { courierControllers } from '#controllers/index.js';
import CourierValidationSchema from '#models/courier/Courier.validation.js';

const router = express.Router();

router.get('/', ctrlWrapper(courierControllers.courierControllers.getCouriers));

router.get(
  '/:courierId',
  isValidId('courierId'),
  ctrlWrapper(courierControllers.courierControllers.getCourier)
);

router.patch(
  '/:courierId',
  isValidId('courierID'),
  //role: courier
  ctrlWrapper(courierControllers.courierControllers.updateCourier)
);

router.patch(
  '/:courierId',
  isValidId('courierId'),
  //role: admin
  ctrlWrapper(
    courierControllers.courierControllers.updateCourierAvailableStatus
  )
);

router.delete(
  '/:courierId',
  isValidId('courierId'),
  // role: courier, admin
  ctrlWrapper(courierControllers.courierControllers.deleteCourier)
);

router.post(
  '/',
  joiValidation(CourierValidationSchema),
  // role: courier
  ctrlWrapper(courierControllers.courierControllers.createCourier)
);

router.patch(
  '/:courierId/orders/:orderId',
  isValidId(['courierId', 'orderId']),
  ctrlWrapper(courierControllers.courierControllers.updateCourierOrderStatus)
);

router.get(
  '/:courierId/orders/:status',
  isValidId('courierId'),
  // role: courier, admin
  ctrlWrapper(courierControllers.courierControllers.getCourierOrdersByStatus)
);

router.get(
  '/:courierId/orders',
  isValidId('courierId'),
  // role: courier, admin
  ctrlWrapper(courierControllers.courierControllers.getCourierOrders)
);

router.get(
  '/accountStatus/:accountStatus',
  ctrlWrapper(courierControllers.courierControllers.getCourierByAccountStatus)
);

export default router;
