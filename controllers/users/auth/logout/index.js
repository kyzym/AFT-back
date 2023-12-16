import { tokenCookie, tokenType } from '#constants/index.js';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';
// import Token from '#models/token/tokenModel.js';
// import { validateRefreshToken } from '../helpers.js';

const controller = async (req, res) => {
  // const { refreshToken } = req.cookies;

  // await validateRefreshToken(refreshToken);

  // await Token.deleteOne({ refreshToken });

  res.clearCookie(tokenCookie[tokenType.ACCESS].name);
  res.clearCookie(tokenCookie[tokenType.REFRESH].name);

  return res.status(200).json({
    success: true,
    message: `User with ID 
    
    has successfully logged out`,
  });
};

export const logoutUser = ctrlWrapper(controller);
// ${userId}
