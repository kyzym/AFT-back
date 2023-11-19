import { Router } from 'express';
import { getAllOrders } from './get-all/index.js';
import { createOrder } from './create/index.js';
import { getAllOrdersByUserId } from './get-by-user-id/index.js';
import { getAllOrdersByChefId } from './get-by-chef-id/index.js';
import { getAllOrdersByCourierId } from './get-by-courier-id/index.js';

const ordersRouter = Router();

getAllOrders(ordersRouter);
createOrder(ordersRouter);
getAllOrdersByUserId(ordersRouter);
getAllOrdersByChefId(ordersRouter);
getAllOrdersByCourierId(ordersRouter);

export default ordersRouter;
