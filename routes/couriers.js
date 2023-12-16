import express from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { joiValidation } from '#middlewares/joiValidation.js';
import { courierControllers } from '#controllers/index.js';
import CourierValidationSchema from '#models/courier/Courier.validation.js';
import { verifyToken } from '#middlewares/auth.middleware.js';
import { roles } from '#constants/roles.js';

const router = express.Router();

router.get(
  '/orders',
  verifyToken([roles.ADMIN, roles.COURIER]),
  ctrlWrapper(courierControllers.courierControllers.getCourierOrders)
);

router.get(
  '/:courierId/statistic',
  isValidId('courierId'),
  verifyToken([roles.COURIER]),
  ctrlWrapper(courierControllers.courierControllers.getCourierStatistic)
);

router.get(
  '/',
  verifyToken([roles.ADMIN]),
  ctrlWrapper(courierControllers.courierControllers.getCouriers)
);

router.get(
  '/:courierId',
  isValidId('courierId'),
  verifyToken([roles.ADMIN, roles.COURIER, roles.USER, roles.CHEF]),
  ctrlWrapper(courierControllers.courierControllers.getCourier)
);

router.patch(
  '/:courierId',
  isValidId('courierID'),
  verifyToken([roles.COURIER]),
  ctrlWrapper(courierControllers.courierControllers.updateCourier)
);

router.patch(
  '/:courierId/account-status',
  isValidId('courierId'),
  verifyToken([roles.ADMIN]),
  ctrlWrapper(
    courierControllers.courierControllers.updateCourierAvailableStatus
  )
);

router.delete(
  '/:courierId',
  isValidId('courierId'),
  verifyToken([roles.ADMIN, roles.COURIER]),
  ctrlWrapper(courierControllers.courierControllers.deleteCourier)
);

router.post(
  '/',
  joiValidation(CourierValidationSchema),
  verifyToken([roles.USER]),
  ctrlWrapper(courierControllers.courierControllers.createCourier)
);

router.patch(
  '/orders/:orderId',
  isValidId(['orderId']),
  verifyToken([roles.COURIER]),
  ctrlWrapper(courierControllers.courierControllers.updateCourierOrderStatus)
);

router.get(
  '/orders/:status',
  verifyToken([roles.ADMIN, roles.COURIER]),
  ctrlWrapper(courierControllers.courierControllers.getCourierOrdersByStatus)
);

router.get(
  '/allorders/:status/:country/:city',
  verifyToken([roles.ADMIN, roles.COURIER]),
  ctrlWrapper(courierControllers.courierControllers.getOrdersByStatus)
);

router.get(
  '/accountStatus/:accountStatus',
  verifyToken([roles.ADMIN, roles.COURIER]),
  ctrlWrapper(courierControllers.courierControllers.getCourierByAccountStatus)
);

export default router;
