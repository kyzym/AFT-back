export const addDishToCart = (cart, chefId, newItem) => {
  let updatedCart = { ...cart };

  if (updatedCart.items.length === 0) {
    updatedCart = {
      chefId,
      items: [newItem],
    };
  } else {
    const existingItem = updatedCart.items.find(
      (cartItem) => cartItem.dishId.toString() === newItem.dishId
    );

    if (existingItem) {
      existingItem.count += newItem.count;
    } else {
      updatedCart.items.push({
        dishId: newItem.dishId,
        count: newItem.count,
      });
    }
  }

  return updatedCart;
};
