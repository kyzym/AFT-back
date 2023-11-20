import { compareObjectIds } from '../../helpers/compareObjectIds.js';
import { ForbiddenError, NotFoundError } from '../../helpers/errors.js';

export const changeOrderStatus = (
  order,
  { currentStatuses, nextStatus, accessKey, id }
) => {
  // Check order
  if (!order) throw new NotFoundError();

  if (!compareObjectIds(order[accessKey], id))
    throw new ForbiddenError("You don't have access to this order");

  if (!currentStatuses.includes(order.status))
    throw new ForbiddenError("Can't change status on this order");

  return nextStatus;
};
