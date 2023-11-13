import { Schema } from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

export const orderItemSchema = new Schema({
  _id: { type: ObjectId, auto: true },
  dishId: { type: ObjectId, ref: 'Dish', required: true },
  count: { type: Number, min: 1, required: true },
  price: { type: Number, min: 0.01, required: true },
});
