import jwt from 'jsonwebtoken';
import {
  UnAuthorizedError,
  NotFoundError,
  ForbiddenError,
} from '../helpers/errors.js';
import { roles } from '../constants/index.js';
import User from '../models/user/index.js';

const SECRET_KEY = process.env.SECRET_KEY;

/**
 * Middleware for role-based JWT token verification.
 *
 * @param {Object} options - Middleware options.
 * @param {string} options.role - Required user role ('user', 'chef', 'courier', 'admin').
 *
 * @example
 * // Protect a route requiring 'chef' role
 * router.get('/protectedRoute', verifyToken({ role: 'chef' }), async (req, res) => {
 *   // Your protected route logic here
 * });
 *
 * @returns {string} - Required roleId ('userId', 'chefId', etc.) if the token is valid.
 */

const verifyToken = ({ role }) => {
  const getTokenFromHeaders = (req) => req.headers.authorization?.split(' ')[1];

  const getRoleId = (userRoles) =>
    userRoles.find((userRole) => userRole.name === role)?.id;

  return async (req, res, next) => {
    try {
      const token = getTokenFromHeaders(req);
      if (!token) throw new UnAuthorizedError();

      const { id } = jwt.verify(token, SECRET_KEY);

      const user = await User.findById(id);
      if (!user) throw new NotFoundError(`User with id ${id} not found`);

      if (role === roles.USER) {
        req.userId = user.id;
        return next();
      }

      const roleId = getRoleId(user.roles);
      if (!roleId)
        throw new ForbiddenError(
          `User with id ${id} doesn't have a '${role}' account`
        );

      req[`${role}Id`] = roleId; // Generates "req.chefId", "req.courierId", "req.adminId"
      next();
    } catch (error) {
      console.error(`Token verification error: ${error.message}`);
      return res
        .status(error.code || 401)
        .send({ message: error.message || 'Invalid token' });
    }
  };
};

export default verifyToken;
