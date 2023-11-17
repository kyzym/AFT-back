import ordersRouter from './orders/index.js';

// DELETE Date on prod
import Dish from '../models/dish/dishModel.js';
Dish;
// ===================

export const routes = (app) => {
  app.use('/api/orders', ordersRouter);
};
