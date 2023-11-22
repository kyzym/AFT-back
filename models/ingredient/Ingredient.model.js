import { Schema, model } from 'mongoose';

const ingredientSchema = new Schema(
  {
    name: { type: String, required: true },
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

// ingredientSchema.post('save', (error, data, next) => {
//   error.status = 400;
//   next();
// });

export const Ingredient = model('ingredient', ingredientSchema);
