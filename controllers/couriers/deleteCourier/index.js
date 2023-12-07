import Courier from '#models/courier/Courier.model.js';
import User from '#models/user/userModel.js';

export const deleteCourier = async (req, res) => {
  const courierId = req.roleIds.courier;
  const session = await User.startSession();
  try {
    await session.withTransaction(async () => {
      const courier = await Courier.findById(courierId);

      if (!courier) {
        return res
          .status(404)
          .json({ success: false, message: 'Courier not found' });
      }
      await Courier.findByIdAndDelete(courierId);
      if (courier.courierId) {
        await User.findByIdAndUpdate(courier.courierId, {
          $pull: { roles: { name: 'courier' } },
        });
      }
      res
        .status(200)
        .json({ success: true, message: 'Courier processed for deletion' });
    });
  } finally {
    session.endSession();
  }
};
