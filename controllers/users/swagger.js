import { getAllUsersSwagger } from './get-all/swagger.js';
import { getOneUserSwagger } from './get-one/swagger.js';
import { loginUserSwagger } from './auth/login/swagger.js';
import { registerUserSwagger } from './auth/register/swagger.js';
import {
  UserSchema,
  GetAllUsersResponse,
  GetOneUserResponse,
  LoginUserResponse,
  RegisterUserResponse,
} from './swaggerCommon.js';

export const usersSwagger = {
  paths: {
    ...registerUserSwagger.paths,
    ...loginUserSwagger.paths,
    ...getOneUserSwagger.paths,
    '/users': {
      ...getAllUsersSwagger.paths['/users'],
    },
  },
  components: {
    schemas: {
      UserSchema,
      GetAllUsersResponse,
      GetOneUserResponse,
      LoginUserResponse,
      RegisterUserResponse,
    },
  },
};
