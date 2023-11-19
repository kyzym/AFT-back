import { Schema } from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

export const orderItemSchema = new Schema(
  {
    dishId: { type: ObjectId, ref: 'dish', required: true },
    name: { type: String, minlength: 1, maxlength: 100, required: true },
    count: { type: Number, min: 1, required: true },
  },
  { timestamps: true }
);
