export const hasAccessToCategory = (userRoles, category) => {
  const accessMap = {
    dishes: ['CHEF', 'ADMIN'],
    'chef-certificates': ['CHEF', 'ADMIN'],
    'delivery-certificates': ['COURIER', 'ADMIN'],
    'user-avatars': ['CHEF', 'COURIER', 'USER', 'ADMIN'],
  };

  return accessMap[category]?.some((role) => userRoles.includes(role));
};
