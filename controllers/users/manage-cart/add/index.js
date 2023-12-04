import { roles } from '#constants/index.js';
import { findUserAndCheck } from '#controllers/users/helpers.js';
import { ctrlWrapper } from '#middlewares/index.js';
import { findDishAndCheck, matchChefs } from '../helpers.js';
import { addDishToCart } from './helpers.js';

const controller = async (req, res) => {
  const { userId } = req.params;
  const { item } = req.body;
  const authUserId = req.roleIds[roles.USER];

  const user = await findUserAndCheck(userId, authUserId);

  const dishInDB = await findDishAndCheck(item.dishId);

  user.cart.chefId && (await matchChefs(user.cart.chefId, dishInDB.owner)); // check if cart isn't empty

  const newCart = addDishToCart(user.cart, dishInDB.owner, item);

  const updatedUser = await user.updateOne({ $set: { cart: newCart } });

  return res.status(200).json({
    success: true,
    message: `The dish ${item.dishId} has been successfully added to the cart`,
    cart: updatedUser.cart,
  });
};

export const addUserCartItem = ctrlWrapper(controller);
