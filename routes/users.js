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
import { roles } from '#constants/roles.js';

const usersRouter = Router();

const { USER, ADMIN } = roles;

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
usersRouter.post('/logout', userControllers.logoutUser);
usersRouter.post('/refresh', userControllers.refreshToken);

// user account endpoints
usersRouter.get(
  '/current-user',
  verifyToken([USER]),
  userControllers.getCurrentUser
);
usersRouter.get(
  '/:userId',
  verifyToken([USER, ADMIN]),
  isValidId('userId'),
  userControllers.getOneUser
);
usersRouter.patch(
  '/:userId',
  validate(updateUserValidationSchema),
  verifyToken([USER]),
  isValidId('userId'),
  userControllers.updateUser
);
usersRouter.delete(
  '/:userId',
  verifyToken([USER]),
  isValidId('userId'),
  userControllers.deleteUser
);

// user favorite items endpoints
usersRouter.get(
  '/:userId/favorite/:type',
  verifyToken([USER]),
  isValidId('userId'),
  userControllers.getFavoritesByType
);
usersRouter.post(
  '/:userId/favorite/:type',
  validate(addFavoriteValidationSchema),
  verifyToken([USER]),
  isValidId('userId'),
  userControllers.addFavoriteItem
);
usersRouter.delete(
  '/:userId/favorite/:type/:favoriteId',
  verifyToken([USER]),
  isValidId('userId', 'favoriteId'),
  userControllers.deleteFavoriteItem
);

// user cart endpoints
usersRouter.get(
  '/:userId/cart',
  verifyToken([USER]),
  isValidId('userId'),
  userControllers.getUserCart
);
usersRouter.post(
  '/:userId/cart',
  validate(cartValidationSchema),
  verifyToken([USER]),
  isValidId('userId'),
  userControllers.addUserCartItem
);
usersRouter.patch(
  '/:userId/cart',
  validate(cartValidationSchema),
  verifyToken([USER]),
  isValidId('userId'),
  userControllers.updateUserCartItem
);
usersRouter.delete(
  '/:userId/cart',
  verifyToken([USER]),
  isValidId('userId'),
  userControllers.clearUserCart
);
usersRouter.delete(
  '/:userId/cart/:dishId',
  verifyToken([USER]),
  isValidId('userId', 'dishId'),
  userControllers.deleteUserCartItem
);

// admin endpoints
usersRouter.get('/', verifyToken([ADMIN]), userControllers.getAllUsers);

usersRouter.patch(
  '/:userId/change-status',
  validate(userStatusValidationSchema),
  verifyToken([ADMIN]),
  isValidId('userId'),
  userControllers.changeUserStatus
);

// orders
usersRouter.get(
  '/:userId/orders',
  verifyToken([roles.USER, roles.ADMIN]),
  isValidId('userId'),
  userControllers.order.getAllUserOrders
);

export default usersRouter;
