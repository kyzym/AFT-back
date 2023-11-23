import chefsRoutes from './chefs.js';

export const routes = (app) => {
  app.use('/api/chefs', chefsRoutes);
};
