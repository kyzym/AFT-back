import { roles } from '#constants/index.js';
import { findUserAndCheck } from '#controllers/users/helpers.js';
import { ctrlWrapper } from '#middlewares/index.js';

const controller = async (req, res) => {
  const { userId } = req.params;
  const authUserId = req.roleIds[roles.USER];

  const user = await findUserAndCheck(userId, authUserId);

  user.cart = { items: [] };

  await user.save();

  return res.status(200).json({
    success: true,
    message: 'User cart successfully cleared',
    cart: user.cart,
  });
};

export const clearUserCart = ctrlWrapper(controller);
