import { roles } from '#constants/roles.js';
import Notification from '#models/notifications/Notifications.model.js';

export const sseNotifications = async (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  });

  const sendNotifications = async () => {
    const roleFilters = [
      { 'roles.name': roles.USER, 'roles.id': req.user._id },
    ];

    if (req.roleIds.chef) {
      roleFilters.push({
        'roles.name': roles.CHEF,
        'roles.id': req.roleIds.chef,
      });
    }

    if (req.roleIds.courier) {
      roleFilters.push({
        'roles.name': roles.COURIER,
        'roles.id': req.roleIds.courier,
      });
    }

    const notifications = await Notification.find({
      userId: req.user._id,
      $or: roleFilters,
    });
    res.write(`data: ${JSON.stringify(notifications)}\n\n`);
  };

  const intervalId = setInterval(sendNotifications, 50000);

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
};
