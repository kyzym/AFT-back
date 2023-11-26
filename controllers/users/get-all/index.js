import { withPagination } from '#helpers/index.js';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';
import User from '#models/user/userModel.js';

const controller = async (req, res) => {
  const queryParams = {};
  const sortOptions = { createdAt: -1 };

  const { status, city, lastName, sortBy } = req.query;

  if (status) {
    queryParams.accountStatus = status;
  }

  if (city) {
    queryParams['address.city'] = city;
  }

  if (lastName) {
    queryParams.lastName = lastName;
  }

  if (sortBy === 'newest') {
    sortOptions.createdAt = -1;
  }

  if (sortBy === 'oldest') {
    sortOptions.createdAt = 1;
  }

  const [users, pagination] = await withPagination(
    User.find(queryParams, {
      password: false,
      updatedAt: false,
      cart: false,
      favoriteDishes: false,
      favoriteChefs: false,
    }).sort(sortOptions),
    req.query
  );

  return res.status(200).send({
    success: true,
    message: users.length > 0 ? 'Users successfully found' : 'No users found',
    users,
    pagination,
  });
};

export const getAllUsers = ctrlWrapper(controller);
