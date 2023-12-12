import Notification from '#models/notifications/Notifications.model.js';

export const deleteNotification = async (req, res) => {
  const { id } = req.params;
  const roleIds = Object.values(req.roleIds);

  const notification = await Notification.findById(id);

  if (!roleIds.includes(notification.userId.toString())) {
    return res.status(403).json({
      message: 'You are not allowed to delete it',
    });
  }

  await Notification.findByIdAndDelete(id);

  res.status(200).json({ message: 'Processed for deletion' });
};
