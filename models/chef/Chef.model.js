import { Schema, model } from 'mongoose';
import { addressSchema } from '../schemas/address.schema.js';
import { accountStatus } from '../../constants/accountStatus.js';
import { phoneNumberPattern } from '../../helpers/validation.js';
import { workStatus } from '#constants/workStatus.js';
// import { getRating } from './helpers.js';

const ObjectId = Schema.Types.ObjectId;

const ChefSchema = new Schema(
  {
    userId: { type: ObjectId, ref: 'user', required: true },
    avatar: {
      type: String,
      //required: [true, "Chef's photo is required"],
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
      required: false,
      default: accountStatus.PENDING,
    },
    liqpayKey: {
      type: String,
      required: [true, "Chef's LiqPay public key is required"],
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
  }
);

ChefSchema.set('toJSON', {
  virtuals: true,
  transform: function (_doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

ChefSchema.virtual('user', {
  ref: 'user',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

ChefSchema.virtual('rating');

ChefSchema.virtual('user', {
  ref: 'user',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

const Chef = model('chef', ChefSchema);

export default Chef;
