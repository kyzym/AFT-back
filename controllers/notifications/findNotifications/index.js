import Notification from '#models/notifications/Notifications.model.js';

export const findNotifications = async (req, res) => {
  const { roleIds } = req;
  const isRead = req.query.read ? req.query.read === 'true' : false;
  const roleFilter = req.query.role;

  let queryConditions = { read: isRead };

  if (roleFilter && roleIds[roleFilter]) {
    queryConditions.userId = roleIds[roleFilter];
  } else {
    queryConditions.userId = { $in: Object.values(roleIds) };
  }

  const notifications = await Notification.find(queryConditions).sort({
    createdAt: -1,
  });

  res.json(notifications);
};
