import User from '../models/user/index.js';
import Chef from '../models/chef/index.js';
import Courier from '../models/courier/index.js';
import Admin from '../models/admin/index.js';
import { roles } from '../constants/roles.js';

export const getRoleData = async (role, id) => {
  switch (role) {
    case roles.USER:
      return User.findById(id);
    case roles.CHEF:
      return Chef.findById(id);
    case roles.COURIER:
      return Courier.findById(id);
    case roles.ADMIN:
      return Admin.findById(id);
    default:
      return null;
  }
};
