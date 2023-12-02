import { Router } from 'express';
import { userControllers } from '#controllers/index.js';
import {
  addFavoriteValidationSchema,
  loginValidationSchema,
  registerValidationSchema,
  updateUserValidationSchema,
} from '#models/user/userValidation.js';
import { isValidId, validate } from '#middlewares/index.js';
import { verifyToken } from '#middlewares/index.js';

const usersRouter = Router();

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

usersRouter.get('/', verifyToken(['admin']), userControllers.getAllUsers);

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

export default usersRouter;
