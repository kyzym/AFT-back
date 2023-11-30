import { registerUserSwagger } from './auth/register/swagger.js';
import { loginUserSwagger } from './auth/login/swagger.js';
import { getOneUserSwagger } from './get-one/swagger.js';
import { updateUserSwagger } from './update/swagger.js';
import { deleteUserSwagger } from './delete/swagger.js';
import { getAllUsersSwagger } from './get-all/swagger.js';
import { changeUserStatusSwagger } from './change-status/swagger.js';

import { getFavoritesByTypeSwagger } from './manage-favorites/get-all/swagger.js';
import { addFavoriteItemSwagger } from './manage-favorites/add/swagger.js';
import { deleteFavoriteItemSwagger } from './manage-favorites/delete/swagger.js';

import { getUserCartSwagger } from './manage-cart/get/swagger.js';
import { updateUserCartSwagger } from './manage-cart/update/swagger.js';
import { clearUserCartSwagger } from './manage-cart/clear/swagger.js';
import { SwaggerSchemas, SwaggerResponses } from './swaggerCommon.js';

export const usersSwagger = {
  paths: {
    ...registerUserSwagger.paths,
    ...loginUserSwagger.paths,
    '/users/{userId}': {
      ...getOneUserSwagger.paths['/users/{userId}'],
      ...updateUserSwagger.paths['/users/{userId}'],
      ...deleteUserSwagger.paths['/users/{userId}'],
    },
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
      ...updateUserCartSwagger.paths['/users/{userId}/cart'],
      ...clearUserCartSwagger.paths['/users/{userId}/cart'],
    },
  },
  components: {
    schemas: {
      ...SwaggerSchemas,
      ...SwaggerResponses,
    },
  },
};
