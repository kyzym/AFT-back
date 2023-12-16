import bcrypt from 'bcrypt';
import { ForbiddenError, UnAuthorizedError } from '#helpers/errors.js';
import User from '#models/user/userModel.js';
import {
  generateAndSaveTokens,
  getSanitizedUser,
  setBothTokensCookie,
} from '../helpers.js';
import { accountStatus } from '#constants/accountStatus.js';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';

const controller = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();

  // Check if the user exists and the password is correct
  if (!user || !(await bcrypt.compare(password, user.password)))
    throw new UnAuthorizedError('Invalid email or password');

  if (user.accountStatus === accountStatus.BLOCKED)
    throw new ForbiddenError('This account is blocked');

  const tokens = await generateAndSaveTokens(user.id);

  setBothTokensCookie(res, tokens);

  return res.status(200).json({
    success: true,
    message: 'User has successfully logged in',
    user: getSanitizedUser(user),
    ...tokens,
  });
};

export const loginUser = ctrlWrapper(controller);
