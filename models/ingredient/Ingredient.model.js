import { Schema, model } from 'mongoose';

const ingredientSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

// ingredientSchema.post('save', (error, data, next) => {
//   error.status = 400;
//   next();
// });

export const Ingredient = model('ingredient', ingredientSchema);
