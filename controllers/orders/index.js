import { Router } from 'express';
import { getAllOrders } from './get-all/index.js';
import { createOrder } from './create/index.js';
import { getAllOrdersByUserId } from './get-by-user-id/index.js';
import { getAllOrdersByChefId } from './get-by-chef-id/index.js';
import { getAllOrdersByCourierId } from './get-by-courier-id/index.js';
import { getOrderById } from './get-by-id/index.js';
import { changeOrderStatusToApproved } from './status-approve-order/index.js';
import { changeOrderStatusToCooking } from './status-start-cooking/index.js';
import { changeOrderStatusToReady } from './status-ready-to-deliver/index.js';
import { changeOrderStatusToDelivering } from './status-delivering/index.js';
import { changeOrderStatusToCompleted } from './status-complete/index.js';
import { cancelOrderByChef } from './status-cancel-by-chef/index.js';
import { cancelOrderByCourier } from './status-cancel-by-courier/index.js';

const ordersRouter = Router();

getAllOrders(ordersRouter);
getOrderById(ordersRouter);

getAllOrdersByUserId(ordersRouter);
getAllOrdersByChefId(ordersRouter);
getAllOrdersByCourierId(ordersRouter);

createOrder(ordersRouter);

changeOrderStatusToApproved(ordersRouter);
changeOrderStatusToCooking(ordersRouter);
changeOrderStatusToReady(ordersRouter);
changeOrderStatusToDelivering(ordersRouter);
changeOrderStatusToCompleted(ordersRouter);
cancelOrderByChef(ordersRouter);
cancelOrderByCourier(ordersRouter);

export default ordersRouter;
