import { getUsers } from './get-all/index.js';
import { createUser } from './create/index.js';

export const usersSwagger = {
  paths: {
    '/users': {
      ...getUsers.paths['/users'],
      ...createUser.paths['/users'],
    },
  },
  components: {
    schemas: {
      ...getUsers.components.schemas,
      ...createUser.components.schemas,
    },
  },
};
