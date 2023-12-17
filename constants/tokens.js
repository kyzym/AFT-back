export const refresh_token_401_error = 'Access token has expired';
export const tokens_failed_401_error = 'Tokens failed';

function convertTimeToMilliseconds(timeString) {
  const regex = /^(\d+)([smhd])$/;
  const match = timeString.match(regex);

  if (!match) {
    throw new Error('Invalid time string format');
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case 's':
      return value * 1000;
    case 'm':
      return value * 60 * 1000;
    case 'h':
      return value * 60 * 60 * 1000;
    case 'd':
      return value * 24 * 60 * 60 * 1000;
    default:
      throw new Error('Invalid time unit');
  }
}

const { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } = process.env;

export const tokenType = Object.freeze({
  ACCESS: 'accessToken',
  REFRESH: 'refreshToken',
});

const { ACCESS, REFRESH } = tokenType;

export const tokenConfig = {
  [ACCESS]: {
    expTime: '15m',
    secretKey: JWT_ACCESS_TOKEN,
  },
  [REFRESH]: {
    expTime: '7d',
    secretKey: JWT_REFRESH_TOKEN,
  },
};

const { accessToken, refreshToken } = tokenConfig;

export const tokenCookie = {
  [ACCESS]: {
    name: ACCESS,
    maxAge: convertTimeToMilliseconds(accessToken.expTime),
  },
  [REFRESH]: {
    name: REFRESH,
    maxAge: convertTimeToMilliseconds(refreshToken.expTime),
  },
};
