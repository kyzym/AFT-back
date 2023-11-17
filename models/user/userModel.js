import mongoose, { Schema } from 'mongoose';
import { addressSchema, orderItemSchema } from '../schemas/index.js';
import { accountStatuses, roles } from '../../constants/index.js';
import {
  emailPattern,
  passwordPattern,
  phoneNumberPattern,
} from '../../helpers/index.js';

const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      minlength: [3, 'Full name must be at least 3 characters long'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      validate: {
        validator: (value) => passwordPattern.test(value),
        message: 'Invalid password format',
      },
      minlength: [8, 'Password must be at least 8 characters long'],
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
    cart: [orderItemSchema],
    roles: {
      type: [String],
      enum: {
        values: Object.values(roles),
        message: 'Invalid role type',
      },
      required: [true, 'User must have at least one role'],
      default: [roles.USER],
    },
    accountStatus: {
      type: String,
      enum: {
        values: Object.values(accountStatuses),
        message: 'Invalid account status',
      },
      required: [true, 'Account status is required'],
      default: accountStatuses.PENDING,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('user', userSchema);

export default User;
