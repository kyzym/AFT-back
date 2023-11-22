import { Schema, model } from 'mongoose';
import { addressSchema } from '../schemas';
import { accountStatus } from '../../constants/accountStatus';
import { phoneNumberPattern } from '../../helpers/validation';

const ObjectId = Schema.Types.ObjectId;

const ChefSchema = new Schema(
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
      required: [true, "Chef's phone number is required"],
    },
    address: {
      type: addressSchema,
      required: [true, "Chef's address is required"],
    },

    certificate: {
      type: String,
      required: [true, "Chef's certificate is required"],
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

const chef = model('chef', ChefSchema);

export default chef;
