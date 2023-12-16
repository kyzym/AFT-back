import { objectId } from '#controllers/swagger.common.js';
import { roles } from '#constants/roles.js';

export const NotificationSchema = {
  type: 'object',
  properties: {
    id: objectId,
    userId: objectId,
    orderId: objectId,
    roles: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/Role',
      },
      description: 'Roles associated with the notification.',
    },
    type: {
      type: 'string',
      description: 'Type of the notification.',
    },
    content: {
      type: 'string',
      description: 'Content of the notification.',
    },
    role: {
      type: 'string',
      enum: [roles.CHEF, roles.COURIER, roles.USER],
      description: 'Specific role associated with the notification.',
    },
    updateStatus: {
      type: 'string',
      description: 'Status of the notification update.',
    },
    orderNumber: {
      type: 'string',
      description: 'Number of the order associated with the notification.',
    },
    read: {
      type: 'boolean',
      default: false,
      description: 'Indicator whether the notification has been read.',
    },
  },
  required: ['userId', 'orderId', 'role'],
  example: {
    id: '507f1f77bcf86cd799439011',
    userId: '507f191e810c19729de860ea',
    orderId: '507f1f77bcf86cd799439012',
    roles: [roles.CHEF],
    type: 'New Order',
    content: 'Your order is ready.',
    role: 'CHEF',
    updateStatus: 'Pending',
    orderNumber: '10001',
    read: false,
  },
};
