const mongoose = require('mongoose');

const userReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      ref: 'User',
    },
    movieId: {
      type: mongoose.ObjectId,
      ref: 'Movie',
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('UserReview', userReviewSchema);
