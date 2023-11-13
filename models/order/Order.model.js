import mongoose, { Schema } from 'mongoose';
import { orderStatus } from '../../constants/index.js';
import { addressSchema, orderItemSchema } from '../schemas/index.js';

const ObjectId = Schema.Types.ObjectId;

const arrayLimit = (val) => {
  return val.length > 0;
};

const orderSchema = new Schema(
  {
    orderNumber: { type: Number, unique: true, min: 1, required: true },

    userId: { type: ObjectId, ref: 'User', required: true },
    chefId: { type: ObjectId, ref: 'Chef', default: null },
    courierId: { type: ObjectId, ref: 'Courier', default: null },

    items: {
      type: [orderItemSchema],
      validate: [arrayLimit, '{PATH} must have at least one value'],
    },

    totalPrice: {
      type: Number,
      required: true,
    },
    address: { type: addressSchema, required: true },
    status: {
      type: String,
      enum: Object.values(orderStatus),
      required: true,
      default: orderStatus.PENDING,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
