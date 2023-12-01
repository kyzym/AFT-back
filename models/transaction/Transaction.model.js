import { transactionAction } from '#constants/transactionAction.js';
import mongoose, { Schema } from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

const transactionSchema = new Schema(
  {
    orderId: {
      type: ObjectId,
      ref: 'order',
      required: [true, 'Order id is required'],
    },
    action: {
      type: String,
      enum: {
        values: Object.values(transactionAction),
        message: 'Invalid transaction action',
      },
      required: [true, 'Action is required'],
    },
    amount: {
      type: Number,
      min: [0.01, 'Amount must be greater than 0'],
      required: [true, 'Amount is required'],
    },
    liqpay: { type: Object, required: [true, 'LiqPay response is required'] },
  },
  {
    timestamps: true,
    id: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
      virtuals: true,
    },
  }
);

transactionSchema.virtual('order', {
  ref: 'order',
  localField: 'orderId',
  foreignField: '_id',
  justOne: true,
});

const Transaction = mongoose.model('transaction', transactionSchema);

export default Transaction;
