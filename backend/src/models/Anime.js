import mongoose, { Schema } from 'mongoose';

const animeSchema = new Schema(
  {
    character: {
      type: String,
      required: true,
    },
    anime: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export default mongoose.model('Animes', animeSchema);
