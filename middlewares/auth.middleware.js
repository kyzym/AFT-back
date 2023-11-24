import jwt from 'jsonwebtoken';
import {
  UnAuthorizedError,
  NotFoundError,
  ForbiddenError,
} from '../helpers/errors.js';
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

const verifyToken = (requiredRoles = []) => {
  const getTokenFromHeaders = (req) => req.headers.authorization?.split(' ')[1];

  const getRoleIds = (userRoles, userId) => {
    const defaultRole = [roles.USER];
    const allRoles = [...requiredRoles, ...defaultRole];

    return allRoles.reduce((userRolesMap, requiredRole) => {
      const roleObject = userRoles.find(
        (userRole) => userRole.name === requiredRole
      );

      if (!roleObject) {
        throw new ForbiddenError(
          `User ${userId} doesn't have a(an) '${requiredRole}' role`
        );
      }
      const roleId = roleObject.id.toString();

      return { ...userRolesMap, [requiredRole]: roleId };
    }, {});
  };

  return async (req, res, next) => {
    try {
      const token = getTokenFromHeaders(req);
      if (!token) throw new UnAuthorizedError('Token missing');

      const { id } = jwt.verify(token, SECRET_KEY);

      const user = await User.findById(id).exec();
      if (!user) throw new NotFoundError(`User ${id} not found`);

      const roleIds = getRoleIds(user.roles, user.id);

      req.roleIds = roleIds;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default verifyToken;
