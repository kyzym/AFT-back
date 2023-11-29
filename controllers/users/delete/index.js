import { roles } from '#constants/index.js';
import { findUserAndCheck } from '#controllers/users/helpers.js';
import User from '#models/user/userModel.js';
import Chef from '#models/chef/Chef.model.js';
import Courier from '#models/courier/Courier.model.js';
import Admin from '#models/admin/Admin.model.js';
import { ctrlWrapper } from '#middlewares/index.js';

const roleModelMap = {
  [roles.CHEF]: Chef,
  [roles.COURIER]: Courier,
  [roles.ADMIN]: Admin,
};

const deleteAssociatedRoles = async (userRoles) => {
  // Loop through the user's roles and delete associated documents
  await Promise.all(
    userRoles.map(async (role) => {
      const Model = roleModelMap[role.name];
      if (Model) {
        await Model.findByIdAndDelete(role.id);
      }
    })
  );
};

const controller = async (req, res) => {
  const { userId } = req.params;
  const authUserId = req.roleIds[roles.USER];

  // Find and check the user to be deleted
  const user = await findUserAndCheck(userId, authUserId);

  // Delete associated roles
  await deleteAssociatedRoles(user.roles);

  // Delete user account
  await User.findByIdAndDelete(userId);

  return res.status(200).json({
    success: true,
    message: 'User account and associated roles deleted successfully',
  });
};

export const deleteUser = ctrlWrapper(controller);
