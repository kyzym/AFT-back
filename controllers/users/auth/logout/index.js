import { tokenType } from '#constants/index.js';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';

const controller = async (req, res) => {
  const { refreshToken, accessToken } = req.cookies;

  accessToken &&
    res.clearCookie(tokenType.ACCESS, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
  refreshToken &&
    res.clearCookie(tokenType.REFRESH, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

  return res.status(200).json({
    success: true,
    message: 'User has successfully logged out',
  });
};

export const logoutUser = ctrlWrapper(controller);
