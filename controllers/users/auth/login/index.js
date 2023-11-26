import bcrypt from 'bcrypt';
import { ForbiddenError, UnAuthorizedError } from '#helpers/errors.js';
import User from '#models/user/userModel.js';
import { generateToken, getSanitizedUser } from '../helpers.js';
import { accountStatus } from '#constants/accountStatus.js';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';

const controller = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();

  // Check if the user exists and the password is correct
  if (!user || !(await bcrypt.compare(password, user.password)))
    throw new UnAuthorizedError('Invalid email or password');

  if (user.accountStatus === accountStatus.BLOCKED)
    throw new ForbiddenError(`User ${user.id} has a blocked account`);

  const token = await generateToken(user.id);

  // Remove password and updatedAt from the user object
  const sanitizedUser = getSanitizedUser(user);

  return res.status(200).json({
    success: true,
    message: 'User has successfully logged in',
    user: sanitizedUser,
    token,
  });
};

export const loginUser = ctrlWrapper(controller);
