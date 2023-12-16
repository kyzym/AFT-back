import { getOrdersStatisticSwagger } from './getOrdersStatistic/swagger.js';
import { getUsersStatisticSwagger } from './getUsersStatistic/swagger.js';

const combinedAdminPaths = {
  '/admin/statistic/payment': {
    ...getOrdersStatisticSwagger['/statistic/payment'],
  },
  '/admin/statistic/users': {
    ...getUsersStatisticSwagger['/statistic/users'],
  },
};

export const adminSwagger = {
  paths: {
    ...combinedAdminPaths,
  },
};
