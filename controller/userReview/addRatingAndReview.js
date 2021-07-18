const { UserReview } = require('../../models');
const { CustomError, hash } = require('../../helper');
const { createOne, findOne } = require('../../utils/crud');

module.exports = async (req, res) => {
  try {
    const { userId } = req.user;
    const { movieId, rating, review } = req.body;

    if (!movieId) {
      throw new CustomError('MovieId is required.', 400);
    }
    if (!rating) {
      throw new CustomError('rating is required.', 400);
    }
    if (!review) {
      throw new CustomError('review is required.', 400);
    }
    const findQuery = {
      movieId,
      userId: userId,
    };

    const isRatingExist = await findOne(UserReview, findQuery);

    if (isRatingExist) {
      throw new CustomError('Rating already done.', 404);
    }

    const createQuery = {
      movieId,
      userId: userId,
      rating: rating,
      review: review,
    };

    const newRating = await createOne(UserReview, createQuery);

    if (!newRating) {
      throw new CustomError('Request can not be processed by server.', 500);
    }

    return res.status(200).send({
      data: {
        message: 'Successfully Rated',
      },
    });
  } catch (err) {
    return res.status(err.code).send({ errors: [{ message: err.message }] });
  }
};
