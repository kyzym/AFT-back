import { Dish } from '#models/index.js';
import { Schema, model } from 'mongoose';

const reviewSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    dish: { type: Schema.Types.ObjectId, ref: 'dish', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
  },
  {
    versionKey: false,
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

reviewSchema.post('save', async function () {
  await updateAverageRating(this.dish);
});

reviewSchema.post('findOneAndUpdate', async function () {
  await updateAverageRating(this.getQuery().dish);
});

async function updateAverageRating(dishId) {
  const aggregateResult = await Review.aggregate([
    { $match: { dish: dishId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        ratingCount: { $sum: 1 },
      },
    },
  ]);

  if (aggregateResult.length > 0) {
    const { averageRating, ratingCount } = aggregateResult[0];
    await Dish.findByIdAndUpdate(dishId, {
      averageRating,
      ratingCount,
    });
  }
}

reviewSchema.post('save', (error, data, next) => {
  error.status = 400;
  next();
});

export const Review = model('review', reviewSchema);
