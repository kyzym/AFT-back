import { Schema } from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

export const orderItemSchema = new Schema(
  {
    dishId: {
      type: ObjectId,
      ref: 'dish',
      required: [true, 'Order dish id is required'],
    },
    count: {
      type: Number,
      min: 1,
      required: [true, 'Order count is required'],
    },
  },
  {
    timestamps: true,
    id: true,
    _id: false,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
      virtuals: true,
    },
  }
);

orderItemSchema.virtual('dish', {
  ref: 'dish',
  localField: 'dishId',
  foreignField: '_id',
  justOne: true,
});
