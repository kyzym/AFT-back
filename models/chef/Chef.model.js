import { Schema } from 'mongoose';
import { accountStatus } from '../../constants/chefEnums';

const ChefSchema = new Schema(
  {
    userId: { type: ObjectId, ref: 'User', required: true },
    chefImage: {
      type: String,
      required: [true, "Chef's photo is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Chef's phone number is required"],
    },
    address: { type: addressSchema, required: true },
    certificate: {
      type: String,
      required: [true, "Chef's certificate is required"],
    },
    accountStatus: {
      type: String,
      enum: Object.values(accountStatus),
      required: true,
      default: accountStatus.INACTIVE,
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Chef = model('chef', ChefSchema);

export default Chef;
