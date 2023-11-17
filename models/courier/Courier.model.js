import { Schema } from 'mongoose';
import { accountStatus } from '../../constants/accountStatus';
import { addressSchema } from '../schemas/address.schema';
import { vehicleType } from '../../constants/vehicleType';

const CourierSchema = new Schema(
  {
    userId: { type: ObjectId, ref: 'User', required: true },
    courierImage: {
      type: String,
      required: [true, "Courier's photo is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Courier's phone number is required"],
    },
    address: { type: addressSchema, required: true },
    vechicleType: {
      type: String,
      enum: Object.values(vehicleType),
      required: [true, "Courier's type of vehicle is required, default is none"],
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

const courier = model('courier', ChefSchema);

export default courier;
