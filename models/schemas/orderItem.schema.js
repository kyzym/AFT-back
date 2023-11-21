import { Schema } from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

export const orderItemSchema = new Schema(
  {
    dish: { type: ObjectId, ref: 'dish', required: true },
    name: { type: String, minlength: 1, maxlength: 100, required: true },
    count: { type: Number, min: 1, required: true },
  },
  {
    timestamps: true,
    id: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
