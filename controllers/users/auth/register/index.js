import { ConflictError } from '#helpers/errors.js';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';
import User from '#models/user/userModel.js';
import {
  checkAllowedFields,
  generateToken,
  getSanitizedUser,
  hashPassword,
} from '../helpers.js';

const controller = async (req, res) => {
  const userData = req.body;

  // Check if any extra fields were passed during registration
  const allowedFields = ['email', 'password', 'firstName', 'lastName'];
  const extraFields = checkAllowedFields(userData, allowedFields);
  if (extraFields.length > 0) {
    throw new ConflictError(`Invalid fields: ${extraFields.join(', ')}`);
  }

  const existingUser = await User.findOne({ email: userData.email }).exec();
  if (existingUser)
    throw new ConflictError(`Email ${userData.email} already exists`);

  const hashedPassword = await hashPassword(userData.password);
  const user = new User({ ...userData, password: hashedPassword });
  await user.save();

  const token = await generateToken(user.id);

  // Remove password and updatedAt from the user object
  const sanitizedUser = getSanitizedUser(user);

  return res.status(201).json({
    success: true,
    message: 'User has been successfully registered',
    user: sanitizedUser,
    token,
  });
};

export const registerUser = ctrlWrapper(controller);
