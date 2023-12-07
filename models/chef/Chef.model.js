import { Schema, model } from 'mongoose';
import { addressSchema } from '../schemas/address.schema.js';
import { accountStatus } from '../../constants/accountStatus.js';
import { phoneNumberPattern } from '../../helpers/validation.js';
import { getRating } from './helpers.js';

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
      //required: [true, "Chef's certificate is required"],
    },
    accountStatus: {
      type: String,
      enum: Object.values(accountStatus),
      required: true,
      default: accountStatus.PENDING,
    },
    liqpayKey: {
      type: String,
      required: [true, "Chef's LiqPay public key is required"],
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: false,
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
ChefSchema.set('toJSON', { virtuals: true });

ChefSchema.virtual('rating').get(async function () {
  const rating = await getRating(this.id);
  console.log('rating:', rating);

  return 0;
});

const Chef = model('chef', ChefSchema);

export default Chef;
