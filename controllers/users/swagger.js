import { getUsers } from './get-all/index.js';

export const usersSwagger = {
  paths: {
    '/users': {
      ...getUsers.paths['/users'],
    },
  },
  components: {
    schemas: {
      ...getUsers.components.schemas,
    },
  },
};
