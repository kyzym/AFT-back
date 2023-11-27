import { Router } from 'express';
import { userControllers } from '#controllers/index.js';
import {
  loginValidationSchema,
  registerValidationSchema,
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

export default usersRouter;
