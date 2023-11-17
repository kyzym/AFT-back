import { Schema } from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

export const orderItemSchema = new Schema(
  {
    _id: { type: ObjectId, auto: true },
    dishId: { type: ObjectId, ref: 'dish', required: true },
    count: { type: Number, min: 1, required: true },
    price: { type: Number, min: 0.01, required: true },
  },
  {
    id: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
