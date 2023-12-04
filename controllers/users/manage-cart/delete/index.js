import { roles } from '#constants/index.js';
import { findUserAndCheck } from '#controllers/users/helpers.js';
import { NotFoundError } from '#helpers/errors.js';
import { ctrlWrapper } from '#middlewares/index.js';
import User from '#models/user/userModel.js';

const controller = async (req, res) => {
  const { userId, dishId } = req.params;
  const authUserId = req.roleIds[roles.USER];

  const user = await findUserAndCheck(userId, authUserId);

  const { items } = user.cart;

  const existingItemIndex = items.findIndex(
    (cartItem) => cartItem.dishId.toString() === dishId
  );

  if (existingItemIndex === -1)
    throw new NotFoundError(`The dish with ID ${dishId} not found in the cart`);

  const isLastItem = items.length === 1;

  let updatedUser;
  if (isLastItem) {
    updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { cart: { items: [] } } },
      { new: true }
    );
  } else {
    updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { 'cart.items': { dishId } } },
      { new: true }
    );
  }

  return res.status(200).json({
    success: true,
    message: `The dish ${dishId} has been successfully removed from the cart`,
    cart: updatedUser.cart,
  });
};

export const deleteUserCartItem = ctrlWrapper(controller);
