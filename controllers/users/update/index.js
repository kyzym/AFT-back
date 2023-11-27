import { roles } from '#constants/roles.js';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';
import { hashPassword } from '../auth/helpers.js';
import { findUserAndCheck } from '#controllers/users/helpers.js';
import { ValidationError } from '#helpers/errors.js';
import User from '#models/user/userModel.js';

const controller = async (req, res) => {
  const { userId } = req.params;
  const newData = req.body;
  const authUserId = req.roleIds[roles.USER];

  await findUserAndCheck(userId, authUserId);

  if (Object.keys(newData).length === 0)
    throw new ValidationError('No data provided for update');

  let hashedPassword;
  if (newData.password) {
    hashedPassword = await hashPassword(newData.password);
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { ...newData, password: hashedPassword },
    {
      new: true,
      select: '-updatedAt -password',
    }
  );

  return res.status(200).json({
    success: true,
    message: 'User successfully updated',
    updatedUser,
  });
};

export const updateUser = ctrlWrapper(controller);
