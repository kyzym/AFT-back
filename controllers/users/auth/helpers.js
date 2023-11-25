import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

const SECRET_KEY = process.env.SECRET_KEY;

export const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const generateToken = (userId) => {
  const payload = { id: userId };

  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_KEY, (err, token) => {
      if (err) return reject(err);
      else return resolve(token);
    });
  });
};

export const getSanitizedUser = (user) => {
  return _.omit(user.toJSON(), ['password', 'updatedAt']);
};

export const checkAllowedFields = (userData, allowedFields) => {
  const extraFields = Object.keys(userData).filter(
    (field) => !allowedFields.includes(field)
  );
  return extraFields;
};
