import mongoose, { Schema } from 'mongoose';
import { addressSchema } from '../schemas/index.js';
import { accountStatus } from '../../constants/index.js';
import { emailPattern, phoneNumberPattern } from '../../helpers/index.js';
import { getDefaultRoles, roleSchema } from './roleSchema.js';

const ObjectId = Schema.Types.ObjectId;

export const cartItemSchema = new Schema(
  {
    dishId: { type: ObjectId, ref: 'dish', required: true },
    count: { type: Number, min: 1, required: true },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      minlength: [3, 'First name must be at least 3 characters long'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      minlength: [3, 'Last name must be at least 3 characters long'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: (value) => emailPattern.test(value),
        message: 'Invalid email format',
      },
    },
    avatar: String,
    address: addressSchema,
    phoneNumber: {
      type: String,
      validate: {
        validator: (value) => phoneNumberPattern.test(value),
        message: 'Invalid phone number format',
      },
    },
    favoriteDishes: [{ type: ObjectId, ref: 'dish' }],
    favoriteChefs: [{ type: ObjectId, ref: 'chef' }],
    cart: {
      chefId: { type: ObjectId, ref: 'chef' },
      items: [cartItemSchema],
    },
    roles: {
      type: [roleSchema],
      default: getDefaultRoles,
    },
    accountStatus: {
      type: String,
      enum: {
        values: Object.values(accountStatus),
        message: 'Invalid account status',
      },
      default: accountStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    id: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model('user', userSchema);

export default User;
