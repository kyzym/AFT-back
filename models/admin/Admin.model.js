import mongoose, { Schema } from 'mongoose';
import { accountStatus } from '../../constants/index.js';

const ObjectId = Schema.Types.ObjectId;

const adminSchema = new Schema(
  {
    userId: { type: ObjectId, ref: 'User', required: true },
    accountStatus: {
      type: String,
      enum: Object.values(accountStatus),
      default: accountStatus.ACTIVE,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
