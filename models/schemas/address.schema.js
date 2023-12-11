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
    houseNumber: { type: String, required: true },
    apartment: { type: String, default: null },
    coordinate: {
      type: coordinateSchema,
      default: null,
    },
  },
  { _id: false }
);

export const userAddressSchema = new Schema(
  {
    country: { type: String, default: '' },
    city: { type: String, default: '' },
    street: { type: String, default: '' },
    houseNumber: { type: String, default: '' },
    apartment: { type: String, default: null },
    coordinate: {
      type: coordinateSchema,
      default: null,
    },
  },
  { _id: false }
);
