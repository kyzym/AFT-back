import { getAllUsersSwagger } from './get-all/swagger.js';
import { getOneUserSwagger } from './get-one/swagger.js';
import { loginUserSwagger } from './auth/login/swagger.js';
import { registerUserSwagger } from './auth/register/swagger.js';
import { deleteFavoriteItemSwagger } from './manage-favorites/delete/swagger.js';
import { addFavoriteItemSwagger } from './manage-favorites/add/swagger.js';
import { getFavoritesByTypeSwagger } from './manage-favorites/get-all/swagger.js';
import { updateUserSwagger } from './update/swagger.js';
import {
  UserSchema,
  GetAllUsersResponse,
  GetOneUserResponse,
  LoginUserResponse,
  RegisterUserResponse,
  GetFavoriteDishesResponse,
  GetFavoriteChefsResponse,
} from './swaggerCommon.js';
import { ChefSchema } from '#controllers/chefs/swaggerChefsComponents.js';
import { DishSchema } from '#controllers/dishes/swaggerDishesComponents.js';

export const usersSwagger = {
  paths: {
    ...registerUserSwagger.paths,
    ...loginUserSwagger.paths,
    '/users/{userId}': {
      ...getOneUserSwagger.paths['/users/{userId}'],
      ...updateUserSwagger.paths['/users/{userId}'],
    },
    '/users': {
      ...getAllUsersSwagger.paths['/users'],
    },
    '/users/{userId}/favorite/{type}': {
      ...getFavoritesByTypeSwagger.paths['/users/{userId}/favorite/{type}'],
      ...addFavoriteItemSwagger.paths['/users/{userId}/favorite/{type}'],
    },
    ...deleteFavoriteItemSwagger.paths,
  },
  components: {
    schemas: {
      UserSchema,
      ChefSchema,
      DishSchema,
      GetAllUsersResponse,
      GetOneUserResponse,
      LoginUserResponse,
      RegisterUserResponse,
      GetFavoriteDishesResponse,
      GetFavoriteChefsResponse,
    },
  },
};
