import { Router } from 'express';
import { getAllOrders } from './get-all/index.js';
import { createOrder } from './create/index.js';
import { getAllOrdersByUserId } from './get-by-user-id/index.js';
import { getAllOrdersByChefId } from './get-by-chef-id/index.js';
import { getAllOrdersByCourierId } from './get-by-courier-id/index.js';
import { getOrderById } from './get-by-id/index.js';
import * as changeStatus from './change-status/index.js';

const ordersRouter = Router();

getAllOrders(ordersRouter);
getOrderById(ordersRouter);

getAllOrdersByUserId(ordersRouter);
getAllOrdersByChefId(ordersRouter);
getAllOrdersByCourierId(ordersRouter);

createOrder(ordersRouter);

changeStatus.changeOrderStatusToApproved(ordersRouter);
changeStatus.changeOrderStatusToCooking(ordersRouter);
changeStatus.changeOrderStatusToReady(ordersRouter);
changeStatus.changeOrderStatusToDelivering(ordersRouter);
changeStatus.changeOrderStatusToCompleted(ordersRouter);
changeStatus.cancelOrderByChef(ordersRouter);
changeStatus.cancelOrderByCourier(ordersRouter);

export default ordersRouter;
