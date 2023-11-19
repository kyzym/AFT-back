import { Router } from 'express';
import { getAllOrders } from './get-all/index.js';
import { createOrder } from './create/index.js';

const ordersRouter = Router();

getAllOrders(ordersRouter);
createOrder(ordersRouter);

export default ordersRouter;
