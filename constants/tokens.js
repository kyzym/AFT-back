export const refresh_token_401_error = 'Access token has expired';
export const tokens_failed_401_error = 'Tokens failed';

const { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } = process.env;

export const tokenConfig = {
  access: {
    expTime: '15m', // '30m'

    secretKey: JWT_ACCESS_TOKEN,
  },
  refresh: {
    expTime: '7s',

    secretKey: JWT_REFRESH_TOKEN,
  },
};

export const tokenType = {
  ACCESS: 'access',
  REFRESH: 'refresh',
};

export const tokenCookie = {
  access: {
    name: 'accessToken',
    maxAge: 15 * 60 * 1000,
  },
  refresh: {
    name: 'refreshToken',
    maxAge: 7 * 1000,
  },
};
