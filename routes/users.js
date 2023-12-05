import { Router } from 'express';
import { userControllers } from '#controllers/index.js';
import {
  addFavoriteValidationSchema,
  cartValidationSchema,
  loginValidationSchema,
  registerValidationSchema,
  updateUserValidationSchema,
  userStatusValidationSchema,
} from '#models/user/userValidation.js';
import { isValidId, validate } from '#middlewares/index.js';
import { verifyToken } from '#middlewares/index.js';

const usersRouter = Router();

// auth endpoints
usersRouter.post(
  '/register',
  validate(registerValidationSchema),
  userControllers.registerUser
);
usersRouter.post(
  '/login',
  validate(loginValidationSchema),
  userControllers.loginUser
);
usersRouter.post('/logout', verifyToken(['user']), userControllers.logoutUser);

// user account endpoints
usersRouter.get(
  '/current-user',
  verifyToken(['user']),
  userControllers.getCurrentUser
);
usersRouter.get(
  '/:userId',
  verifyToken(['user', 'admin']),
  isValidId('userId'),
  userControllers.getOneUser
);
usersRouter.patch(
  '/:userId',
  validate(updateUserValidationSchema),
  verifyToken(['user']),
  isValidId('userId'),
  userControllers.updateUser
);
usersRouter.delete(
  '/:userId',
  verifyToken(['user']),
  isValidId('userId'),
  userControllers.deleteUser
);

// user favorite items endpoints
usersRouter.get(
  '/:userId/favorite/:type',
  verifyToken(['user']),
  isValidId('userId'),
  userControllers.getFavoritesByType
);
usersRouter.post(
  '/:userId/favorite/:type',
  validate(addFavoriteValidationSchema),
  verifyToken(['user']),
  isValidId('userId'),
  userControllers.addFavoriteItem
);
usersRouter.delete(
  '/:userId/favorite/:type/:favoriteId',
  verifyToken(['user']),
  isValidId('userId', 'favoriteId'),
  userControllers.deleteFavoriteItem
);

// user cart endpoints
usersRouter.get(
  '/:userId/cart',
  verifyToken(['user']),
  isValidId('userId'),
  userControllers.getUserCart
);
usersRouter.post(
  '/:userId/cart',
  validate(cartValidationSchema),
  verifyToken(['user']),
  isValidId('userId'),
  userControllers.addUserCartItem
);
usersRouter.patch(
  '/:userId/cart',
  validate(cartValidationSchema),
  verifyToken(['user']),
  isValidId('userId'),
  userControllers.updateUserCartItem
);
usersRouter.delete(
  '/:userId/cart/:dishId',
  verifyToken(['user']),
  isValidId('userId', 'dishId'),
  userControllers.deleteUserCartItem
);

// admin endpoints
usersRouter.get('/', verifyToken(['admin']), userControllers.getAllUsers);

usersRouter.patch(
  '/:userId/change-status',
  validate(userStatusValidationSchema),
  verifyToken(['admin']),
  isValidId('userId'),
  userControllers.changeUserStatus
);

export default usersRouter;
