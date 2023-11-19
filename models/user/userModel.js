import mongoose, { Schema } from 'mongoose';
import { addressSchema, orderItemSchema } from '../schemas/index.js';
import { accountStatuses } from '../../constants/index.js';
import {
  emailPattern,
  passwordPattern,
  phoneNumberPattern,
} from '../../helpers/index.js';
import { roleSchema, getDefaultRoles } from './roleSchema.js';

const ObjectId = Schema.Types.ObjectId;

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
      type: [roleSchema],
      default: getDefaultRoles,
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

const User = mongoose.model('user', userSchema);

export default User;
