import bcrypt from 'bcrypt';
import { roles } from '#constants/roles.js';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';
import { hashPassword } from '../auth/helpers.js';
import { findUserAndCheck } from '#controllers/users/helpers.js';
import {
  ConflictError,
  UnAuthorizedError,
  ValidationError,
} from '#helpers/errors.js';
import User from '#models/user/userModel.js';

const controller = async (req, res) => {
  const { userId } = req.params;
  const newData = req.body;
  const authUserId = req.roleIds[roles.USER];

  const user = await findUserAndCheck(userId, authUserId);

  if (Object.keys(newData).length === 0)
    throw new ValidationError('No data provided for update');

  if (newData.email && user.email !== newData.email) {
    const existingUser = await User.findOne({ email: newData.email }).exec();
    if (existingUser)
      throw new ConflictError(`Email ${newData.email} already exists`);
  }

  let hashedPassword;
  if (newData.newPassword) {
    if (!(await bcrypt.compare(newData.currentPassword, user.password))) {
      throw new UnAuthorizedError('Invalid current password');
    }

    hashedPassword = await hashPassword(newData.newPassword);
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
