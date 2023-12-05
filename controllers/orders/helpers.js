import { withPagination } from '#helpers/withPagination.js';
import Order from '#models/order/Order.model.js';
import { compareObjectIds } from '../../helpers/compareObjectIds.js';
import { ForbiddenError, NotFoundError } from '../../helpers/errors.js';

// Get order by role (user, chef, courier)
export const getOrderByRole = async (findId, reqQuery) => {
  const sort = getSort(reqQuery.sortBy);
  const filter = getFilter(reqQuery.filter);

  const [orders, pagination] = await withPagination(
    Order.find({ ...findId, ...filter }, { __v: false })
      .sort(sort)
      .populate('items.dish'),
    reqQuery
  );

  return { orders, ...pagination };
};

// Change order status
export const changeOrderStatus = (
  order,
  { allowedStatuses, nextStatus, accessKey, id }
) => {
  // Check order
  if (!order) throw new NotFoundError();

  if (!compareObjectIds(order[accessKey], id))
    throw new ForbiddenError("You don't have access to this order");

  if (!allowedStatuses.includes(order.status))
    throw new ForbiddenError("Can't change status on this order");

  return nextStatus;
};

// Filtering
export const getFilter = (filterStr) => {
  const filteringFields = Object.keys(Order.schema.obj);

  if (!filterStr) return null;

  const filters = filterStr.split(',');

  return filters.reduce((acc, filter) => {
    const [key, value] = filter.split(':');

    if (!filteringFields.includes(key)) return acc;

    return { ...acc, [key]: value };
  }, {});
};

// Sorting
export const getSort = (sortStr) => {
  if (!sortStr) return '-updatedAt';

  return sortStr.split(',').join(' ');
};
