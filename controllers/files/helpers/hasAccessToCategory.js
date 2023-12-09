import { roles } from '#constants/roles.js';

export const hasAccessToCategory = (userRoles, category) => {
  const accessMap = {
    dishes: [roles.CHEF, roles.ADMIN],
    'chef-certificates': [roles.CHEF, roles.ADMIN, roles.USER],
    'delivery-certificates': [roles.COURIER, roles.ADMIN],
    'user-avatars': [roles.CHEF, roles.COURIER, roles.USER, roles.ADMIN],
  };

  return accessMap[category]?.some((role) => userRoles.includes(role));
};
