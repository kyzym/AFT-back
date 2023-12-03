import express from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { joiValidation } from '#middlewares/joiValidation.js';
import { courierControllers } from '#controllers/index.js';
import CourierValidationSchema from '#models/courier/Courier.validation.js';
import { verifyToken } from '#middlewares/auth.middleware.js';

const router = express.Router();

router.get(
  '/',
  verifyToken(['admin']),
  ctrlWrapper(courierControllers.courierControllers.getCouriers)
);

router.get(
  '/:courierId',
  isValidId('courierId'),
  verifyToken(['user', 'admin', 'chef', 'courier']),
  ctrlWrapper(courierControllers.courierControllers.getCourier)
);

router.patch(
  '/:courierId',
  isValidId('courierID'),
  verifyToken(['courier']),
  ctrlWrapper(courierControllers.courierControllers.updateCourier)
);

router.patch(
  '/:courierId',
  isValidId('courierId'),
  verifyToken(['admin']),
  ctrlWrapper(
    courierControllers.courierControllers.updateCourierAvailableStatus
  )
);

router.delete(
  '/:courierId',
  isValidId('courierId'),
  verifyToken(['admin', 'courier']),
  ctrlWrapper(courierControllers.courierControllers.deleteCourier)
);

router.post(
  '/',
  joiValidation(CourierValidationSchema),
  verifyToken(['user']),
  ctrlWrapper(courierControllers.courierControllers.createCourier)
);

router.patch(
  '/:courierId/orders/:orderId',
  isValidId(['courierId', 'orderId']),
  verifyToken(['courier']),
  ctrlWrapper(courierControllers.courierControllers.updateCourierOrderStatus)
);

router.get(
  '/:courierId/orders/:status',
  isValidId('courierId'),
  verifyToken(['admin', 'courier']),
  ctrlWrapper(courierControllers.courierControllers.getCourierOrdersByStatus)
);

router.get(
  '/:courierId/orders',
  isValidId('courierId'),
  verifyToken(['admin', 'courier']),
  // role: courier, admin
  ctrlWrapper(courierControllers.courierControllers.getCourierOrders)
);

router.get(
  '/accountStatus/:accountStatus',
  verifyToken(['admin', 'courier']),
  ctrlWrapper(courierControllers.courierControllers.getCourierByAccountStatus)
);

export default router;
