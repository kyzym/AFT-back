import { Router } from 'express';
import { getAllOrders } from './get-all/index.js';

const ordersRouter = Router();

getAllOrders(ordersRouter);

export default ordersRouter;
