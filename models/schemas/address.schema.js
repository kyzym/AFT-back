import { Schema } from 'mongoose';

export const coordinateSchema = new Schema({
  lat: { type: Number, min: -90, max: 90, required: true },
  lng: { type: Number, min: -180, max: 180, required: true },
});

export const addressSchema = new Schema(
  {
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    coordinate: {
      type: coordinateSchema,
      default: null,
    },
  },
  { _id: false }
);
