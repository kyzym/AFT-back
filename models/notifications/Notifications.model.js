import { roles } from '#constants/roles.js';
import { roleSchema, getDefaultRoles } from '#models/user/roleSchema.js';
import mongoose, { Schema } from 'mongoose';

const notificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    orderId: { type: Schema.Types.ObjectId, ref: 'order' },
    roles: {
      type: [roleSchema],
      default: getDefaultRoles,
    },
    type: String,
    content: String,
    role: {
      type: String,
      enum: Object.values(roles),
      required: true,
    },
    read: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    toJSON: {
      virtual: true,
      transform: function (_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const Notification = mongoose.model('notification', notificationSchema);

export default Notification;
