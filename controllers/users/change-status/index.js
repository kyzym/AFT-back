import User from '#models/user/userModel.js';
import { ctrlWrapper } from '#middlewares/index.js';
import { NotFoundError } from '#helpers/errors.js';

const controller = async (req, res) => {
  const { userId } = req.params;
  const { accountStatus } = req.body;

  const user = await User.findByIdAndUpdate(
    userId,
    { accountStatus },
    { new: true }
  ).exec();

  if (!user) {
    throw new NotFoundError(`User ${userId} not found`);
  }

  return res.status(200).json({
    success: true,
    message: 'User account status updated successfully',
    user: {
      id: user._id,
      accountStatus: user.accountStatus,
    },
  });
};

export const changeUserStatus = ctrlWrapper(controller);
