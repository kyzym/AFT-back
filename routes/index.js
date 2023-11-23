
import ordersRouter from './orders.js';
import reviewsRouter from './reviews.js';
import ingredientsRoutes from './ingredients.js';
import dishesRoutes from './dishes.js';
import chefsRoutes from './chefs.js';

export const routes = (app) => {
  app.use('/api/orders', ordersRouter);
  app.use('/api/reviews', reviewsRouter);
  app.use('/api/ingredients', ingredientsRoutes);
  app.use('/api/dishes', dishesRoutes);
  app.use('/api/chefs', chefsRoutes);
};
