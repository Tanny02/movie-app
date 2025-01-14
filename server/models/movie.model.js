import mongoose from "mongoose";

// Movie Schema
const movieSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    duration: { type: Number, required: true }, // Duration in minutes
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
