import { Router } from 'express';
import { orderControllers as ctrl } from '#controllers/index.js';
import { validate } from '#middlewares/validation.middleware.js';
import { orderValidationSchema } from '#models/order/order.validation.js';

import { roles } from '#constants/roles.js';
import { isValidId } from '#middlewares/isValidId.js';
import { verifyToken } from '#middlewares/auth.middleware.js';

const ordersRouter = Router();

ordersRouter.get('/', verifyToken([roles.ADMIN]), ctrl.getAllOrders);
ordersRouter.post(
  '/',
  verifyToken([roles.USER]),
  validate(orderValidationSchema),
  ctrl.createOrder
);

/*
ordersRouter.get(
  '/by-chef/:chefId',
  //verifyToken([roles.CHEF, roles.ADMIN]),
  isValidId('chefId'),
  ctrl.getAllOrdersByChefId
);
ordersRouter.get(
  '/by-courier/:courierId',
  //verifyToken([roles.COURIER, roles.ADMIN]),
  isValidId('courierId'),
  ctrl.getAllOrdersByCourierId
);


ordersRouter.get(
  '/by-user/:userId',
  //verifyToken([roles.USER, roles.ADMIN]),
  isValidId('userId'),
  ctrl.getAllOrdersByUserId
);
ordersRouter.get(
  '/:orderId',
  //verifyToken(),
  isValidId('orderId'),
  ctrl.getOrderById
);

ordersRouter.patch(
  '/:orderId/status/approve-order',
  //verifyToken([roles.CHEF]),
  isValidId('orderId'),
  ctrl.changeStatus.approved
);
ordersRouter.patch(
  '/:orderId/status/start-cooking',
  //verifyToken([roles.CHEF]),
  isValidId('orderId'),
  ctrl.changeStatus.cooking
);
ordersRouter.patch(
  '/:orderId/status/ready-to-delivery',
  //verifyToken([roles.CHEF]),
  isValidId('orderId'),
  ctrl.changeStatus.readyToDelivery
);
ordersRouter.patch(
  '/:orderId/status/delivering',
  //verifyToken([roles.COURIER]),
  isValidId('orderId'),
  ctrl.changeStatus.delivering
);
ordersRouter.patch(
  '/:orderId/status/complete',
  //verifyToken([roles.COURIER]),
  isValidId('orderId'),
  ctrl.changeStatus.completed
);
ordersRouter.patch(
  '/:orderId/status/cancel-by-chef',
  //verifyToken([roles.CHEF]),
  isValidId('orderId'),
  ctrl.changeStatus.cancelByChef
);
ordersRouter.patch(
  '/:orderId/status/cancel-by-courier',
  //verifyToken([roles.COURIER]),
  isValidId('orderId'),
  ctrl.changeStatus.cancelByCourier
);*/

ordersRouter.get(
  '/payment/:orderId',
  verifyToken([roles.USER]),
  isValidId('orderId'),
  ctrl.payment.getPaymentStatusByOrderId
);

ordersRouter.post('/payment/callback', ctrl.payment.callbackPayment);

export default ordersRouter;
