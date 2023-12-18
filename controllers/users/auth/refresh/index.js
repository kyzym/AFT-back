import { tokenType, tokens_failed_401_error } from '#constants/index.js';
import { UnAuthorizedError } from '#helpers/errors.js';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';
import Token from '#models/token/tokenModel.js';
import {
  decodeToken,
  generateAndSaveTokens,
  setBothTokensCookie,
} from '../helpers.js';

const controller = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) throw new UnAuthorizedError(tokens_failed_401_error);

  const refreshPayload = await decodeToken(refreshToken, tokenType.REFRESH);

  if (refreshPayload.expired)
    throw new UnAuthorizedError(tokens_failed_401_error);

  const tokenData = await Token.findOne({ refreshToken }).exec();

  if (!tokenData) throw new UnAuthorizedError(tokens_failed_401_error);

  const tokens = await generateAndSaveTokens(tokenData.userId);
  setBothTokensCookie(res, tokens);

  return res.status(200).json({
    success: true,
    message: 'Tokens successfully updated',
    accessToken: tokens.accessToken,
  });
};

export const refreshToken = ctrlWrapper(controller);
