export const getFolderPath = (category) => {
  switch (category) {
    case 'dishes':
      return 'dish-images/';
    case 'chef-certificates':
      return 'chef-certificates/';
    case 'delivery-certificates':
      return 'delivery-certificates/';
    case 'user-avatars':
      return 'user-avatars/';
    default:
      return '';
  }
};
