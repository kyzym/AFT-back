import Notification from '#models/notifications/Notifications.model.js';

export const updateNotifications = async (req, res) => {
  const { id } = req.params;
  const roleIds = Object.values(req.roleIds);

  const notification = await Notification.findById(id);

  if (!notification) {
    return res.status(404).json({ message: 'Notification not found' });
  }

  if (!roleIds.includes(notification.userId.toString())) {
    return res
      .status(403)
      .json({ message: 'You are not allowed to update this notification' });
  }

  notification.read = true;
  await notification.save();

  res.status(200).json({ message: 'Notification updated' });
};
