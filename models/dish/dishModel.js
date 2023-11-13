import { Schema, model } from 'mongoose';

const dishSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name of the dish is required'],
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
      enum: [
        'Ukrainian',
        'Italian',
        'Chinese',
        'Japanese',
        'Indian',
        'French',
        'American',
        'Thai',
        'Mediterranean',
        'Crimean Tatar',
      ],
    },
    category: {
      type: String,
      required: [true, 'Dish category is required'],
      enum: [
        'Main',
        'Appetizer',
        'Dessert',
        'Salad',
        'Soup',
        'Drink',
        'Breakfast',
      ],
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
    cookTime: {
      type: Number,
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
  },
  { versionKey: false, timestamps: true }
);

const Dish = model('dish', dishSchema);

export default Dish;
