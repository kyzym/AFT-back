import { tokenType, tokens_failed_401_error } from '#constants/index.js';
import { UnAuthorizedError } from '#helpers/errors.js';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';
import Token from '#models/token/tokenModel.js';
import {
  decodeToken,
  generateAndSaveTokens,
  setBothTokensCookie,
  // validateRefreshToken,
} from '../helpers.js';

const controller = async (req, res) => {
  const { refreshToken } = req.cookies;

  const refreshPayload = await decodeToken(refreshToken, tokenType.REFRESH);

  if (refreshPayload.expired)
    throw new UnAuthorizedError(tokens_failed_401_error);
  // res.redirect('http://localhost:3000');

  const tokenData = await Token.findOne({ refreshToken }).exec();

  const tokens = await generateAndSaveTokens(tokenData.userId);
  setBothTokensCookie(res, tokens);

  return res.status(201).json({
    success: true,
    message: 'Tokens successfully updated',
    ...tokens,
  });
};

export const refreshToken = ctrlWrapper(controller);
