import Courier from '#models/courier/Courier.model.js';
import { NotFoundError } from '../../../helpers/index.js';

export const getCourier = async (req, res) => {
  const courier = await Courier.findById(req.params.courierId);

  if (!courier) {
    throw new NotFoundError('Courier not found');
  }

  res.status(200).json(courier);
};
