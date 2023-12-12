import jwt from 'jsonwebtoken';
import User from '../models/user/index.js';
import { UnAuthorizedError, ForbiddenError } from '../helpers/errors.js';

const SECRET_KEY = process.env.SECRET_KEY;

export const sseAuth = (requiredRoles) => {
  const decodeJWT = (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, SECRET_KEY, (err, id) => {
        if (err) return reject(err);
        else return resolve(id);
      });
    });
  };

  return async (req, res, next) => {
    try {
      const token = req.query.token;

      if (!token) throw new UnAuthorizedError('Token missing');

      const decoded = await decodeJWT(token);
      const user = await User.findById(decoded.id).exec();
      if (!user) throw new UnAuthorizedError('Invalid token: no user found');

      const hasRequiredRole = user.roles.some((role) =>
        requiredRoles.includes(role.name)
      );

      if (!hasRequiredRole) {
        throw new ForbiddenError('Not enough privileges');
      }

      req.user = user;
      req.roleIds = user.roles.reduce((acc, role) => {
        acc[role.name] = role.id.toString();
        return acc;
      }, {});

      next();
    } catch (error) {
      res.status(401).send('Unauthorized');
      res.end();
    }
  };
};
