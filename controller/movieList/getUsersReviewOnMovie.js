const { Movie, UserReview } = require('../../models');
const { CustomError } = require('../../helper');
const { findMany, findCount } = require('../../utils/crud');
const mongoose = require('mongoose');

module.exports = async (req, res) => {
  try {
    const { skip = 0, limit = 10 } = req.query;
    const { movieId } = req.params;

    const userReviews = await getAllUserReviews(movieId, skip, limit);
    const totalReviews = await getTotalReviewCount(movieId);

    return res.status(200).send({
      data: {
        userReviews: userReviews,
        totalCount: totalReviews,
      },
    });
  } catch (err) {
    return res.status(err.code).send({ errors: [{ message: err.message }] });
  }
};

const getAllUserReviews = async (movieId, skip, limit) => {
  const findQuery = {
    movieId: movieId,
  };
  const reviews = await findMany(
    UserReview,
    findQuery,
    {},
    [{ path: 'movieId', select: { movieName: 1 } }],
    {
      skip: Number(skip),
      limit: Number(limit),
      sort: {
        rating: -1,
      },
    }
  );
  return reviews;
};

const getTotalReviewCount = async (movieId) => {
  const count = await findCount(UserReview, { movieId: movieId });
  return count;
};
