import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';
import { createNotification } from '../createNotification/index.js';

export const addNotificationController = ctrlWrapper(async (req, res) => {
  const { userId, roles, type, content } = req.body;

  const notification = await createNotification(userId, roles, type, content);

  res.status(201).json(notification);
});
