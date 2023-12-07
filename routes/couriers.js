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
  '/',
  verifyToken([roles.ADMIN]),
  ctrlWrapper(courierControllers.courierControllers.getCouriers)
);

router.get(
  '/',
  // isValidId('courierId'),
  verifyToken([roles.ADMIN, roles.COURIER, roles.USER, roles.CHEF]),
  ctrlWrapper(courierControllers.courierControllers.getCourier)
);

router.patch(
  '/',
  // isValidId('courierID'),
  verifyToken([roles.COURIER]),
  ctrlWrapper(courierControllers.courierControllers.updateCourier)
);

router.patch(
  '/',
  // isValidId('courierId'),
  verifyToken([roles.ADMIN]),
  ctrlWrapper(
    courierControllers.courierControllers.updateCourierAvailableStatus
  )
);

router.delete(
  '/',
  // isValidId('courierId'),
  verifyToken([roles.ADMIN, roles.COURIER]),
  ctrlWrapper(courierControllers.courierControllers.deleteCourier)
);

router.post(
  '/',
  joiValidation(CourierValidationSchema),
  verifyToken([roles.USER]),
  ctrlWrapper(courierControllers.courierControllers.createCourier)
);

// router.patch(
//   '/:courierId/orders/:orderId',
//   isValidId(['courierId', 'orderId']),
//   verifyToken([roles.COURIER]),
//   ctrlWrapper(courierControllers.courierControllers.updateCourierOrderStatus)
// );

router.patch(
  '/orders/:orderId',
  isValidId(['orderId']),
  verifyToken([roles.COURIER]),
  ctrlWrapper(courierControllers.courierControllers.updateCourierOrderStatus)
);

router.get(
  '/orders/:status',
  // isValidId('courierId'),
  verifyToken([roles.ADMIN, roles.COURIER]),
  ctrlWrapper(courierControllers.courierControllers.getCourierOrdersByStatus)
);

router.get(
  '/allorders/:status',
  //verifyToken([roles.ADMIN, roles.COURIER]),
  ctrlWrapper(courierControllers.courierControllers.getOrdersByStatus)
);

router.get(
  '/orders',
  //isValidId('courierId'),
  verifyToken([roles.ADMIN, roles.COURIER]),
  ctrlWrapper(courierControllers.courierControllers.getCourierOrders)
);

router.get(
  '/accountStatus/:accountStatus',
  verifyToken([roles.ADMIN, roles.COURIER]),
  ctrlWrapper(courierControllers.courierControllers.getCourierByAccountStatus)
);

export default router;
