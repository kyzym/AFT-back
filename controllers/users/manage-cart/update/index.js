import { roles } from '#constants/index.js';
import { findUserAndCheck } from '#controllers/users/helpers.js';
import { ctrlWrapper } from '#middlewares/index.js';
import User from '#models/user/userModel.js';
import { findDishAndCheck, matchChefs } from '../helpers.js';
import { updateCartItemQty } from './helper.js';

const controller = async (req, res) => {
  const { userId } = req.params;
  const { item } = req.body;
  const authUserId = req.roleIds[roles.USER];

  const user = await findUserAndCheck(userId, authUserId);

  const dishInDB = await findDishAndCheck(item.dishId);

  user.cart.chefId && (await matchChefs(user.cart.chefId, dishInDB.owner)); // check if cart isn't empty

  const updatedCart = await updateCartItemQty(user.cart, item);

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { cart: updatedCart } },
    { new: true }
  );

  return res.status(200).json({
    success: true,
    message: `The dish ${item.dishId} has been successfully updated in the cart`,
    cart: updatedUser.cart,
  });
};

export const updateUserCartItem = ctrlWrapper(controller);
