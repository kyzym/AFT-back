import { ConflictError } from '#helpers/errors.js';
import Courier from '#models/courier/Courier.model.js';
import User from '#models/user/userModel.js';

export const createCourier = async (req, res) => {
  const session = await User.startSession();

  const userId = '655eadc79b5f12df707d537c'; //req.user.id
  try {
    await session.withTransaction(async () => {
      const existingCourier = await Courier.findOne({ userId: userId });
      if (existingCourier) {
        throw new ConflictError('Role of chef already exists');
      }
      // const newCourierData = new Courier({ ...req.body, userId: req.user.id });
      const newCourierData = {
        ...req.body,
        userId: userId,
      };
      const newCourier = new Courier(newCourierData);
      await newCourier.save();
      const newCourierId = newCourier._id;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            roles: { name: 'courier', id: newCourierId.toString() },
          },
        },
        { new: true }
      );
      if (!updatedUser) {
        throw new Error('Failed to update user role');
      }
      res.status(201).json({ message: 'Courier created successfully' });
    });
  } finally {
    session.endSession();
  }
};
