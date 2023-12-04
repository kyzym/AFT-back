import User from '#models/user/userModel.js';

const mapObject = (objFields) => objFields;

export const mapChefData = (chefData) => ({
  id: chefData._id.toString(),
  avatar: chefData.avatar,
});

export const mapCartItem = (cartItem) => ({
  dish: mapObject(cartItem.dishId),
  count: cartItem.count,
});

export const populateUserDetails = async (userId) => {
  const populatedUser = await User.findById(userId)
    .populate({
      path: 'cart.chefId',
      select: 'id avatar userId',
    })
    .populate({
      path: 'cart.items.dishId',
      select:
        'id image name description price cuisine category spiceLevel isAvailable',
    })
    .exec();

  const { chefId: chefData, items: cartItems } = populatedUser.cart;
  const chefRoleDetails = mapChefData(chefData);
  const items = cartItems.map(mapCartItem);

  // Retrieve fullName from the user account
  const chefAccountDetails = await User.findById(chefData.userId).exec();

  // Construct the final chef object
  const chef = {
    ...chefRoleDetails,
    name: chefAccountDetails.fullName,
  };

  return { chef, items };
};
