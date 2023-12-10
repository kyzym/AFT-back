import Courier from '#models/courier/Courier.model.js';

export const getCouriers = async (req, res) => {
  const query = {};
  if (req.query.isAvailable) {
    query.isAvailable = req.query.isAvailable === 'true';
  }
  const courier = await Courier.find(query);
  return res.status(200).json(courier);
};
