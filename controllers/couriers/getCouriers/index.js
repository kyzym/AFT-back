import Courier from '#models/courier/Courier.model.js';

export const getCouriers = async (req, res) => {
  const query = {};
  if (req.query.isAvailable) {
    query.where({ isAvailable: req.query.isAvailable });
  }
  const courier = await Courier.find(query).populate(
    'userId',
    'firstName lastName'
  );
  return res.status(200).json(courier);
};
