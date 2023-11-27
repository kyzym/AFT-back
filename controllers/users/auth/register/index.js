import { ConflictError } from '#helpers/errors.js';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';
import User from '#models/user/userModel.js';
import { generateToken, getSanitizedUser, hashPassword } from '../helpers.js';

const controller = async (req, res) => {
  const userData = req.body;

  const session = await User.startSession();

  try {
    await session.withTransaction(async () => {
      const existingUser = await User.findOne({ email: userData.email }).exec();
      if (existingUser)
        throw new ConflictError(`Email ${userData.email} already exists`);

      const hashedPassword = await hashPassword(userData.password);
      const user = new User({ ...userData, password: hashedPassword });
      await user.save({ session });

      const token = await generateToken(user.id);

      const sanitizedUser = getSanitizedUser(user);

      return res.status(201).json({
        success: true,
        message: 'User has been successfully registered',
        user: sanitizedUser,
        token,
      });
    });
  } finally {
    session.endSession();
  }
};

export const registerUser = ctrlWrapper(controller);
