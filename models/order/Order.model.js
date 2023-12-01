import mongoose, { Schema } from 'mongoose';
import { orderStatus } from '../../constants/index.js';
import { addressSchema, orderItemSchema } from '../schemas/index.js';
import { isEmailValid, phoneNumberPattern } from '#helpers/validation.js';
import { normalizeDecimal } from '#helpers/normalizeDecimal.js';

const ObjectId = Schema.Types.ObjectId;

const arrayLimit = (val) => {
  return val.length > 0;
};

const orderSchema = new Schema(
  {
    orderNumber: {
      type: Number,
      unique: [true, 'Order number must be unique'],
      min: [1, 'Order number must be greater than 0'],
      required: [true, 'Order number is required'],
    },

    userId: {
      type: ObjectId,
      ref: 'user',
      required: [true, 'User id is required'],
    },
    chefId: {
      type: ObjectId,
      ref: 'chef',
      required: [true, 'Chef id is required'],
    },
    courierId: { type: ObjectId, ref: 'courier', default: null },

    items: {
      type: [orderItemSchema],
      validate: [arrayLimit, '{PATH} must have at least one value'],
    },

    summaryPrice: {
      tax: {
        type: Number,
        min: [0.01, 'Tax amount must be greater than 0'],
        required: [true, 'Tax amount is required'],
      },
      delivery: {
        type: Number,
        min: [0.01, 'Delivery amount must be greater than 0'],
        required: [true, 'Delivery amount is required'],
      },
      chef: {
        type: Number,
        min: [0.01, 'Chef amount must be greater than 0'],
        required: [true, 'Chef amount is required'],
      },
    },

    deliveryInfo: {
      name: {
        type: String,
        minlength: [3, 'Name must be at least 3 characters long'],
        required: [true, 'Name is required'],
      },
      phoneNumber: {
        type: String,
        validate: {
          validator: (value) => phoneNumberPattern.test(value),
          message: 'Invalid phone number format',
        },
        required: [true, 'Phone number is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [isEmailValid, 'Please fill a valid email address'],
      },
      address: { type: addressSchema, required: [true, 'Address is required'] },
    },

    additionalInfo: {
      type: String,
      maxlength: [400, 'Additional info must be at less {VALUE} characters'],
      default: null,
    },

    status: {
      type: String,
      enum: {
        values: Object.values(orderStatus),
        message: 'Invalid order status',
      },
      required: true,
      default: orderStatus.NEW,
    },

    paymentTransaction: { type: ObjectId, ref: 'transaction', default: null },
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

orderSchema.virtual('user', {
  ref: 'user',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

orderSchema.virtual('chef', {
  ref: 'chef',
  localField: 'chefId',
  foreignField: '_id',
  justOne: true,
});

orderSchema.virtual('courier', {
  ref: 'courier',
  localField: 'courierId',
  foreignField: '_id',
  justOne: true,
});

orderSchema.virtual('totalPrice').get(function () {
  const { tax, delivery, chef } = this.summaryPrice;
  return normalizeDecimal(tax + delivery + chef);
});

orderSchema.virtual('isPaid').get(function () {
  return !!this.paymentTransaction;
});

const Order = mongoose.model('order', orderSchema);

export default Order;
