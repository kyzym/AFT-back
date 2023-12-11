import { Schema, model } from 'mongoose';
import { CATEGORIES, CUISINES } from '../../constants/dishEnums.js';

const dishSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name of the dish is required'],
      minlength: 1,
      maxlength: 100,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'chef',
      required: [true, 'Owner (chef) ID is required'],
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    description: {
      type: String,
      required: [true, 'Description of the dish is required'],
      minlength: 10,
      maxlength: 400,
    },
    ingredients: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ingredient',
        required: [true, 'Ingredient ID is required'],
      },
    ],
    price: {
      type: Number,
      required: [true, 'Price of the dish is required'],
      min: 0.01,
    },
    isVegan: {
      type: Boolean,
      required: [
        true,
        'Information about the dish being vegan or not is required',
      ],
    },
    cuisine: {
      type: String,
      required: [true, 'Cuisine type is required'],
      enum: CUISINES,
    },
    category: {
      type: String,
      required: [true, 'Dish category is required'],
      enum: CATEGORIES,
    },
    isAvailable: {
      type: Boolean,
      default: true,
      required: [true, 'Availability status is required'],
    },
    weight: {
      type: Number,
      required: [true, 'Weight of the dish is required'],
    },
    cookTimeInMinutes: {
      type: Number,
      required: [true, 'Time of cooking is required'],
      min: 1,
    },
    isBlocked: {
      type: Boolean,
      default: false,
      required: true,
    },
    nutrition: {
      calories: Number,
      protein: Number,
      fats: Number,
      carbohydrates: Number,
    },
    spiceLevel: {
      type: Number,
      min: 0,
      max: 3,
      default: 0,
    },
    averageRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    toJSON: {
      virtual: true,
      transform: function (_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

dishSchema.virtual('chefDetails', {
  ref: 'chef',
  localField: 'owner',
  foreignField: '_id',
  justOne: true,
  select: 'name avatar',
});

const Dish = model('dish', dishSchema);

export default Dish;
