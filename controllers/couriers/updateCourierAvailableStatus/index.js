import Courier from '#models/courier/Courier.model.js';
import { NotFoundError } from '../../../helpers/errors.js';

export const updateCourierAvailableStatus = async (req, res) => {
  const courierId = req.params.courierId;
  const { accountStatus } = req.body;

  const updatedCourier = await Courier.findByIdAndUpdate(
    courierId,
    { accountStatus },
    { new: true }
  );

  if (!updatedCourier) {
    throw new NotFoundError('Courier not found');
  }

  res
    .status(200)
    .json({ message: `Courier available status updated to ${accountStatus}` });
};
