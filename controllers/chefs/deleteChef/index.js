import User from '#models/user/userModel.js';
import Chef from '../../../models/chef/Chef.model.js';

export const deleteChef = async (req, res) => {
  const chefId = req.params.chefId;
  const session = await User.startSession();
  try {
    await session.withTransaction(async () => {
      const chef = await Chef.findById(chefId);

      if (!chef) {
        return res
          .status(404)
          .json({ success: false, message: 'Chef not found' });
      }
      await Chef.findByIdAndDelete(chefId);
      if (chef.userId) {
        await User.findByIdAndUpdate(chef.userId, {
          $pull: { roles: { name: 'chef' } },
        });
      }
      res
        .status(200)
        .json({ success: true, message: 'Chef processed for deletion' });
    });
  } finally {
    session.endSession();
  }
};
