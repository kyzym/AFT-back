import Notification from '#models/notifications/Notifications.model.js';

export const createNotification = async (userId, roles, type, content) => {
  const notification = new Notification({
    userId,
    roles,
    type,
    content,
  });
  await notification.save();
  return notification;
};
