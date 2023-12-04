import Courier from '#models/courier/Courier.model.js';
import { NotFoundError } from '../../../helpers/errors.js';

export const updateCourierAvailableStatus = async (req, res) => {
  const { courierId } = req.params;
  const { isAvailable } = req.body;

  const updatedCourier = await Courier.findByIdAndUpdate(
    courierId,
    { isAvailable },
    { new: true }
  );

  if (!updatedCourier) {
    throw new NotFoundError('Courier not found');
  }

  res
    .status(200)
    .json({ message: `Courier available status updated to ${isAvailable}` });
};
