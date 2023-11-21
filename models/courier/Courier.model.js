import mongoose, { Schema } from 'mongoose';
import { addressSchema } from '../helpers/validation';
import { vehicleType } from '../../constants/vehicleType';
import { phoneNumberPattern } from '../../helpers/validation';
import { accountStatus } from '../../constants/accountStatus';

const CourierSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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
    vechicleType: {
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
      required: true,
      default: accountStatus.PENDING,
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const courier = mongoose.model('courier', CourierSchema);

export default courier;
