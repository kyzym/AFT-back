import User from '../models/user/index.js';
import Chef from '../models/chef/index.js';
import Courier from '../models/courier/index.js';
import Admin from '../models/admin/index.js';

export const getRoleData = async (role, id) => {
  switch (role) {
    case 'chef':
      return Chef.findById(id);
    case 'courier':
      return Courier.findById(id);
    case 'admin':
      return Admin.findById(id);
    default:
      return User.findById(id);
  }
};
