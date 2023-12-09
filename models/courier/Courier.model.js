import { Schema, model } from 'mongoose';
import { vehicleType } from '../../constants/vehicleType.js';
import { phoneNumberPattern } from '../../helpers/validation.js';
import { accountStatus } from '../../constants/accountStatus.js';
import { addressSchema } from '#models/schemas/address.schema.js';
import { workStatus } from '#constants/workStatus.js';

const ObjectId = Schema.Types.ObjectId;

const CourierSchema = new Schema(
  {
    userId: { type: ObjectId, ref: 'User', required: true },
    avatar: {
      type: String,
      required: [true, "Courier's photo is required"],
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: (value) => phoneNumberPattern.test(value),
        message: 'Invalid phone number format',
      },
      required: [true, "Courier's phone number is required"],
    },
    address: { type: addressSchema, required: true },
    vehicleType: {
      type: String,
      enum: Object.values(vehicleType),
      required: [
        true,
        "Courier's type of vehicle is required, default is none",
      ],
      default: vehicleType.NONE,
    },
    accountStatus: {
      type: String,
      enum: Object.values(accountStatus),
      required: false,
      default: accountStatus.PENDING,
    },
    liqpayKey: {
      type: String,
      required: [true, "Courier's LiqPay public key is required"],
    },
    isAvailable: {
      type: String,
      enum: Object.values(workStatus),
      required: true,
      default: workStatus.NON_ACTIVE,
    },
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

const Courier = model('courier', CourierSchema);

export default Courier;
