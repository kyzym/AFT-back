const mapObject = (objFields) => objFields;

export const mapChefData = (chefData) => ({
  id: chefData._id.toString(),
  avatar: chefData.avatar,
});

export const mapCartItem = (cartItem) => ({
  dish: mapObject(cartItem.dishId),
  count: cartItem.count,
});
