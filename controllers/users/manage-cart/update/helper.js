import { NotFoundError } from '#helpers/errors.js';

export const updateCartItemQty = async (cart, newItem) => {
  let updatedCart = { ...cart };

  const existingItem = updatedCart.items.find(
    (cartItem) => cartItem.dishId.toString() === newItem.dishId
  );

  if (!existingItem)
    throw new NotFoundError(
      `The dish with ID ${newItem.dishId} not found in the cart`
    );

  existingItem.count = newItem.count;

  return updatedCart;
};
