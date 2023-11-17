import { Schema, model } from 'mongoose';

const reviewSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    dish: { type: Schema.Types.ObjectId, ref: 'dish', required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

reviewSchema.post('save', (error, data, next) => {
  error.status = 400;
  next();
});

export const Review = model('review', reviewSchema);
