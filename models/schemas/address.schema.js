import { Schema } from 'mongoose';

export const coordinateSchema = new Schema({
  lat: { type: Number, require: true },
  lng: { type: Number, require: true },
});

export const addressSchema = new Schema({
  country: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  coordinate: {
    type: coordinateSchema,
    default: null,
  },
});
