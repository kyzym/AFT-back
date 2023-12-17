import { registerUserSwagger } from './auth/register/swagger.js';
import { loginUserSwagger } from './auth/login/swagger.js';
import { logoutUserSwagger } from './auth/logout/swagger.js';
import { refreshTokenSwagger } from './auth/refresh/swagger.js';

import { getCurrentUserSwagger } from './get-current/swagger.js';
import { getOneUserSwagger } from './get-one/swagger.js';
import { updateUserSwagger } from './update/swagger.js';
import { deleteUserSwagger } from './delete/swagger.js';
import { getAllUsersSwagger } from './get-all/swagger.js';
import { changeUserStatusSwagger } from './change-status/swagger.js';

import { getFavoritesByTypeSwagger } from './manage-favorites/get-all/swagger.js';
import { addFavoriteItemSwagger } from './manage-favorites/add/swagger.js';
import { deleteFavoriteItemSwagger } from './manage-favorites/delete/swagger.js';

import { getUserCartSwagger } from './manage-cart/get/swagger.js';
import { addUserCartItemSwagger } from './manage-cart/add/swagger.js';
import { updateUserCartItemSwagger } from './manage-cart/update/swagger.js';
import { deleteUserCartItemSwagger } from './manage-cart/delete/swagger.js';
import { clearUserCartSwagger } from './manage-cart/clear/swagger.js';
import { SwaggerSchemas, SwaggerResponses } from './swaggerCommon.js';
import { getUserOrdersSwagger } from './orders/get-all-orders/swagger.js';

export const usersSwagger = {
  paths: {
    ...registerUserSwagger.paths,
    ...loginUserSwagger.paths,
    ...logoutUserSwagger.paths,
    ...refreshTokenSwagger.paths,
    ...getCurrentUserSwagger.paths,
    '/users/{userId}': {
      ...getOneUserSwagger.paths['/users/{userId}'],
      ...updateUserSwagger.paths['/users/{userId}'],
      ...deleteUserSwagger.paths['/users/{userId}'],
    },
    ...getUserOrdersSwagger.paths,
    '/users': {
      ...getAllUsersSwagger.paths['/users'],
    },
    ...changeUserStatusSwagger.paths,
    '/users/{userId}/favorite/{type}': {
      ...getFavoritesByTypeSwagger.paths['/users/{userId}/favorite/{type}'],
      ...addFavoriteItemSwagger.paths['/users/{userId}/favorite/{type}'],
    },
    ...deleteFavoriteItemSwagger.paths,
    ['/users/{userId}/cart']: {
      ...getUserCartSwagger.paths['/users/{userId}/cart'],
      ...addUserCartItemSwagger.paths['/users/{userId}/cart'],
      ...updateUserCartItemSwagger.paths['/users/{userId}/cart'],
      ...clearUserCartSwagger.paths['/users/{userId}/cart'],
    },
    ...deleteUserCartItemSwagger.paths,
  },
  components: {
    schemas: {
      ...SwaggerSchemas,
      ...SwaggerResponses,
    },
  },
};
