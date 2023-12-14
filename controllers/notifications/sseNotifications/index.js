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
    const roleIdsArray = Object.values(req.roleIds);

    const notifications = await Notification.find({
      userId: { $in: roleIdsArray },
      read: false,
    });

    res.write(`data: ${JSON.stringify({ notifications })}\n\n`);
  };

  const intervalId = setInterval(sendNotifications, 30000);

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
};
