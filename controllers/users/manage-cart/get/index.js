import { roles } from '#constants/index.js';
import { findUserAndCheck } from '#controllers/users/helpers.js';
import { ctrlWrapper } from '#middlewares/index.js';
import { populateUserDetails } from './helpers.js';

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
  const { chef, items } = await populateUserDetails(userId);

  return res.status(200).json({
    success: true,
    message: 'User cart successfully found',
    cart: { chef, items },
  });
};

export const getUserCart = ctrlWrapper(controller);
