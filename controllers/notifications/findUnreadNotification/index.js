import Notification from '#models/notifications/Notifications.model.js';

export const findUnreadNotification = async (req, res) => {
  const roleIds = req.roleIds;
  const roleIdsArray = Object.values(roleIds);

  const notifications = await Notification.find({
    userId: { $in: roleIdsArray },
    read: false,
  });

  res.json(notifications);
};
