import Courier from '#models/courier/Courier.model.js';
import { ForbiddenError, NotFoundError } from '../../../helpers/errors.js';

export const updateCourier = async (req, res) => {
  const { courierId } = req.params;
  const courierUpdates = req.body;

  if ('accountStatus' in courierUpdates) {
    if (
      courierUpdates.accountStatus === null ||
      courierUpdates.accountStatus === undefined
    ) {
      throw new ForbiddenError(
        "You are not allowed to change the 'accountStatus' field"
      );
    }
  }

  const updatedCourier = await Courier.findByIdAndUpdate(
    courierId,
    courierUpdates,
    {
      new: true,
    }
  );

  if (!updatedCourier) {
    throw new NotFoundError('Courier not found');
  }

  res.status(200).json(updatedCourier);
};
