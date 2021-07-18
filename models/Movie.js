const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
      required: true,
    },
    movieImage: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
    },
    activated: {
      type: Boolean,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Movie', movieSchema);
