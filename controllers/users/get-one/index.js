import { roles } from '#constants/index.js';
import { ForbiddenError, NotFoundError } from '#helpers/errors.js';
import { ctrlWrapper } from '#middlewares/index.js';
import User from '#models/user/userModel.js';

const controller = async (req, res) => {
  const { userId } = req.params;
  const { ADMIN, USER } = roles;

  const user = await User.findById(userId, {
    password: false,
    updatedAt: false,
  }).exec();

  if (!user) throw new NotFoundError(`User ${userId} not found`);

  const authUserId = req.roleIds[USER];
  if (authUserId !== userId && !req.roleIds[ADMIN])
    throw new ForbiddenError(
      `You don't have permission to view the user ${userId} account`
    );

  return res.status(200).json({
    success: true,
    message: 'User successfully found',
    user,
  });
};

export const getOneUser = ctrlWrapper(controller);
