import Courier from '#models/courier/Courier.model.js';
import { NotFoundError } from '../../../helpers/index.js';

export const getCourier = async (req, res) => {
  const courierId = req.roleIds.courier;
  const courier = await Courier.findById(courierId);

  if (!courier) {
    throw new NotFoundError('Courier not found');
  }

  res.status(200).json(courier);
};
