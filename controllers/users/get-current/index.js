import { roles } from '#constants/index.js';
import { NotFoundError } from '#helpers/errors.js';
import { ctrlWrapper } from '#middlewares/index.js';
import User from '#models/user/userModel.js';

const controller = async (req, res) => {
  const { USER } = roles;
  const userId = req.roleIds[USER];

  const user = await User.findById(userId, {
    password: false,
    updatedAt: false,
  }).exec();

  if (!user) throw new NotFoundError('User not found');

  return res.status(200).json({
    success: true,
    message: 'User successfully found',
    user,
  });
};

export const getCurrentUser = ctrlWrapper(controller);
