import ordersRouter from './orders/index.js';

export const routes = (app) => {
  app.use('/api/orders', ordersRouter);
};
