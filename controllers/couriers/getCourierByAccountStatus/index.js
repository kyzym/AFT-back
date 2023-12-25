import Courier from '#models/courier/Courier.model.js';
import { NotFoundError } from '#helpers/index.js';

export const getCourierByAccountStatus = async (req, res) => {
  const { accountStatus } = req.params;
  const couriers = await Courier.find({ accountStatus });

  if (!couriers) {
    throw new NotFoundError('Couriers not found');
  }

  res.status(200).json(couriers);
};
