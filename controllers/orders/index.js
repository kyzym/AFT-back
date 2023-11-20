import { Router } from 'express';
import { getAllOrders } from './get-all/index.js';
import { createOrder } from './create/index.js';
import { getAllOrdersByUserId } from './get-by-user-id/index.js';
import { getAllOrdersByChefId } from './get-by-chef-id/index.js';
import { getAllOrdersByCourierId } from './get-by-courier-id/index.js';
import { getOrderById } from './get-by-id/index.js';
import { approveOrder } from './status-approve-order/index.js';
import { changeOrderStatusToCooking } from './status-start-cooking/index.js';
import { changeOrderStatusToReady } from './status-ready-to-deliver/index.js';

const ordersRouter = Router();

getAllOrders(ordersRouter);
getOrderById(ordersRouter);
approveOrder(ordersRouter);
changeOrderStatusToCooking(ordersRouter);
changeOrderStatusToReady(ordersRouter);
createOrder(ordersRouter);
getAllOrdersByUserId(ordersRouter);
getAllOrdersByChefId(ordersRouter);
getAllOrdersByCourierId(ordersRouter);

export default ordersRouter;
