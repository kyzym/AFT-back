import { roles } from '#constants/index.js';
import { findUserAndCheck } from '#controllers/users/helpers.js';
import { ctrlWrapper } from '#middlewares/index.js';
import User from '#models/user/userModel.js';
import { mapChefData, mapCartItem } from './helpers.js';

const controller = async (req, res) => {
  const { userId } = req.params;
  const authUserId = req.roleIds[roles.USER];

  const user = await findUserAndCheck(userId, authUserId); // find user and check a permission

  // Check if the user's cart is empty
  if (user.cart.items.length === 0) {
    return res.status(200).json({
      success: true,
      message: 'User cart is empty',
      cart: user.cart,
    });
  }

  // Populate user data, including chef and cart items
  const populatedUser = await User.findById(userId)
    .populate({
      path: 'cart.chefId',
      select: 'id avatar userId',
    })
    .populate({
      path: 'cart.items.dishId',
      select:
        'id image description price cuisine category spiceLevel isAvailable',
    })
    .exec();

  const { chefId: chefData, items: cartItems } = populatedUser.cart;
  const chefRoleDetails = mapChefData(chefData);
  const items = cartItems.map(mapCartItem);

  // Retrieve fullName from the user account -
  const chefAccountDetails = await User.findById(chefData.userId).exec();

  // Construct the final chef object
  const chef = {
    ...chefRoleDetails,
    name: chefAccountDetails.fullName,
  };

  return res.status(200).json({
    success: true,
    message: 'User cart successfully found',
    cart: { chef, items },
  });
};

export const getUserCart = ctrlWrapper(controller);
