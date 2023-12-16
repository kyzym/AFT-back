import { tokenCookie, tokenType } from '#constants/index.js';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';

const controller = async (req, res) => {
  const { refreshToken, accessToken } = req.cookies;

  accessToken && res.clearCookie(tokenCookie[tokenType.ACCESS].name);
  refreshToken && res.clearCookie(tokenCookie[tokenType.REFRESH].name);

  return res.status(200).json({
    success: true,
    message: 'User has successfully logged out',
  });
};

export const logoutUser = ctrlWrapper(controller);
