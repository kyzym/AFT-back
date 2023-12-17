import { deleteNotificationSwagger } from './deleteNotification/swagger.js';
import { findNotificationsSwagger } from './findNotifications/swagger.js';
import { NotificationSchema } from './swaggerNotificationsComponents.js';
import { updateNotificationSwagger } from './updateNotification/swagger.js';

const combinedNotificationsPaths = {
  '/notifications': {
    ...findNotificationsSwagger['/notifications'],
  },
  '/notifications/{id}': {
    ...deleteNotificationSwagger['/notifications/{id}'],
  },
  '/notifications/{id}/read': {
    ...updateNotificationSwagger['/notifications/{id}/read'],
  },
};

export const notificationsSwagger = {
  paths: {
    ...combinedNotificationsPaths,
  },
  components: {
    schemas: {
      Notification: NotificationSchema,
    },
  },
};
