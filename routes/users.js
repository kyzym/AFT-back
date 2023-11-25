import { Router } from 'express';
import { userControllers } from '#controllers/index.js';
import { userValidationSchema } from '#models/user/userValidation.js';
import { isValidId, validate } from '#middlewares/index.js';
import { verifyToken } from '#middlewares/index.js';

const usersRouter = Router();

usersRouter.post(
  '/register',
  validate(userValidationSchema),
  userControllers.registerUser
);

usersRouter.post('/login', userControllers.loginUser);

usersRouter.get('/', verifyToken(['admin']), userControllers.getAllUsers);

usersRouter.get(
  '/:userId',
  verifyToken(['user', 'admin']),
  isValidId('userId'),
  userControllers.getOneUser
);

export default usersRouter;
