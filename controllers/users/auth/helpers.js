import {
  tokenConfig,
  tokenCookie,
  tokenType,
  tokens_failed_401_error,
} from '#constants/index.js';
import { UnAuthorizedError } from '#helpers/errors.js';
import Token from '#models/token/tokenModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

// TOKENS
export const generateToken = async (userId, type) => {
  const payload = { id: userId };
  const { secretKey, expTime } = tokenConfig[type];

  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretKey, { expiresIn: expTime }, (err, token) => {
      if (err) return reject(err);
      else return resolve(token);
    });
  });
};

export const generateBothTokens = async (userId) => {
  const accessToken = await generateToken(userId, tokenType.ACCESS);
  const refreshToken = await generateToken(userId, tokenType.REFRESH);

  return { accessToken, refreshToken };
};

export const saveToken = async ({ userId, refreshToken, accessToken }) => {
  let tokenData = await Token.findOne({ userId });

  if (tokenData) {
    tokenData.accessToken = accessToken;
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }

  return await Token.create({ userId, accessToken, refreshToken });
};

export const decodeToken = (token, type) => {
  const { secretKey } = tokenConfig[type];

  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, tokenData) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          resolve({ expired: true });
        } else {
          reject(err);
        }
      } else {
        resolve({ expired: false, id: tokenData.id });
      }
    });
  });
};

export const generateAndSaveTokens = async (userId) => {
  const tokens = await generateBothTokens(userId);

  await saveToken({ userId, ...tokens });
  return tokens;
};

export const validateRefreshToken = async (refreshToken) => {
  const refreshPayload = await decodeToken(refreshToken, tokenType.REFRESH);

  if (refreshPayload.expired) {
    throw new UnAuthorizedError(tokens_failed_401_error);
  }
};

// COOKIES
export const setTokenCookie = (res, tokenType, tokenValue) => {
  const { name, maxAge } = tokenCookie[tokenType];
  const isRefreshToken = name === 'refreshToken';

  res.cookie(name, tokenValue, {
    httpOnly: isRefreshToken,
    sameSite: 'none',
    secure: true,
    maxAge,
  });
};

export const setBothTokensCookie = (res, tokenValues) => {
  const { accessToken, refreshToken } = tokenValues;
  setTokenCookie(res, tokenType.ACCESS, accessToken);
  setTokenCookie(res, tokenType.REFRESH, refreshToken);
};

// PASSWORD
export const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const getSanitizedUser = (user) => {
  return _.omit(user.toJSON(), ['password', 'updatedAt']);
};
