import { roles } from '#constants/index.js';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';

const controller = async (req, res) => {
  const { USER } = roles;
  const userId = req.roleIds[USER];

  // future logic to revoke the refresh token associated with the user

  return res.status(200).json({
    success: true,
    message: `User with ID ${userId} has successfully logged out`,
  });
};

export const logoutUser = ctrlWrapper(controller);
