import Notification from '#models/notifications/Notifications.model.js';

export const sseNotifications = async (req, res) => {
  // const userId = req.user._id;
  // const chefId = req.roleIds.chef;
  const userId = req.roleIds.user;
  // console.log(req);
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  });

  const sendNotifications = async () => {
    const notifications = await Notification.find({ userId, read: false });

    res.write(`data: ${JSON.stringify(notifications)}\n\n`);
  };

  const intervalId = setInterval(sendNotifications, 50000);

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
};
