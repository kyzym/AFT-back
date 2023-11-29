import { roles } from '#constants/index.js';
import { findUserAndCheck } from '#controllers/users/helpers.js';
import { ctrlWrapper } from '#middlewares/index.js';
import { updateCartAndRespond } from '../helpers.js';
import { findDishesInDB, getChefId, getExistingItems } from './helper.js';

const controller = async (req, res) => {
  const { userId } = req.params;
  const { items: reqItems } = req.body;
  const authUserId = req.roleIds[roles.USER];

  await findUserAndCheck(userId, authUserId); // find user and check a permission

  const dbItems = await findDishesInDB(reqItems); // find dishes in the database

  const validRequestItems = getExistingItems(reqItems, dbItems); // leave only existing in db dishes

  const itemsChefId = getChefId(dbItems); // define chefId from dish field - owner

  const newCart = {
    chefId: itemsChefId,
    items: validRequestItems.map((item) => ({
      dishId: item.dishId,
      count: item.count,
    })),
  };

  await updateCartAndRespond(userId, newCart, res);
};

export const updateUserCart = ctrlWrapper(controller);
