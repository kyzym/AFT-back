import { roles } from '#constants/index.js';
import { findUserAndCheck } from '#controllers/users/helpers.js';
import { ctrlWrapper } from '#middlewares/index.js';
import { updateCartAndRespond } from '../helpers.js';

const controller = async (req, res) => {
  const { userId } = req.params;
  const authUserId = req.roleIds[roles.USER];

  await findUserAndCheck(userId, authUserId);

  const newCart = { items: [] };
  await updateCartAndRespond(
    userId,
    newCart,
    res,
    'User cart successfully cleared'
  );
};

export const clearUserCart = ctrlWrapper(controller);
