import jwt from 'jsonwebtoken';
import { UnAuthorizedError, ForbiddenError } from '../helpers/errors.js';
import User from '../models/user/index.js';
import { roles } from '../constants/index.js';

const SECRET_KEY = process.env.SECRET_KEY;

/**
 * Middleware for role-based JWT token verification.
 *
 * @param {Object} options - Middleware options.
 * @param {string[]} options.requiredRoles - Array of required user roles (e.g., ['chef', 'courier', 'admin']).
 *
 * @example
 * // Protect a route by specifying required roles, for instance, ['chef', 'admin']
 * router.get('/orders/by-chef/:chefId', verifyToken(['chef', 'admin']), async (req, res) => {}
 *
 * @returns {Object} - Object containing role IDs associated with the requiredRoles for the current user.
 * Example: { 'user': 'userId', 'chef': 'chefId', 'admin': 'adminId' }
 */

export const verifyToken = (requiredRoles) => {
  const getTokenFromHeaders = (req) => req.headers.authorization?.split(' ')[1];

  const decodeJWT = (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, SECRET_KEY, (err, id) => {
        if (err) return reject(err);
        else return resolve(id);
      });
    });
  };

  const checkUserRole = (userRoles, requiredRoles) => {
    return userRoles.some((userRole) => requiredRoles.includes(userRole.name));
  };

  const mapUserRoles = (userRoles, requiredRoles) => {
    const roleIds = {};
    userRoles.forEach((userRole) => {
      if (
        requiredRoles.includes(userRole.name) ||
        userRole.name === roles.USER
      ) {
        roleIds[userRole.name] = userRole.id.toString();
      }
    });

    return roleIds;
  };

  return async (req, res, next) => {
    try {
      const token = getTokenFromHeaders(req);

      if (!token) throw new UnAuthorizedError('Token missing');

      const { id } = await decodeJWT(token);

      const user = await User.findById(id).exec();
      if (!user)
        throw new UnAuthorizedError(
          'Invalid token: no user found from the token'
        );

      const hasRequiredRole = checkUserRole(user.roles, requiredRoles);

      if (!hasRequiredRole) {
        throw new ForbiddenError(
          `User ${id} doesn't have the required role(s)`
        );
      }

      req.roleIds = mapUserRoles(user.roles, requiredRoles);

      next();
    } catch (error) {
      next(error);
    }
  };
};
