import { ConflictError } from '#helpers/errors.js';
import User from '#models/user/userModel.js';
import Chef from '../../../models/chef/Chef.model.js';

export const createChef = async (req, res) => {
  const session = await User.startSession();
  const userId = req.body.userId;
  try {
    await session.withTransaction(async () => {
      const existingChef = await Chef.findOne({ userId: userId });
      if (existingChef) {
        throw new ConflictError('Role of chef already exists');
      }
      const newChefData = new Chef({ ...req.body, userId: userId });
      const newChef = new Chef(newChefData);
      await newChef.save();
      const newChefId = newChef._id;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            roles: { name: 'chef', id: newChefId.toString() },
          },
        },
        { new: true }
      );
      if (!updatedUser) {
        console.error('Failed to update user role:', userId);
        throw new Error('Failed to update user role');
      }

      res.status(201).json({ message: 'Chef created successfully' });
    });
  } finally {
    session.endSession();
  }
};
