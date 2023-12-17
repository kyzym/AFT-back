import mongoose, { Schema } from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

const tokenSchema = new Schema({
  userId: { type: ObjectId, ref: 'user', required: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
});

const Token = mongoose.model('token', tokenSchema);

export default Token;
