import Courier from '#models/courier/Courier.model.js';

export const getCouriers = async (req, res) => {
  const query = {};
  if (req.query.isAvailable) {
    query.where({ isAvailable: req.query.isAvailable });
  }
  let couriers = await Courier.find(query).populate(
    'userId',
    'firstName lastName'
  );
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = couriers.length;
  couriers = couriers.slice(startIndex, endIndex);

  res.status(200).json({
    couriers,
    pageInfo: {
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    },
  });
};
