const { Movie } = require('../../models');
const { CustomError, hash } = require('../../helper');
const { createOne, findOne } = require('../../utils/crud');

module.exports = async (req, res) => {
  try {
    const { movieName, movieImage = '', description = '' } = req.body;

    const findQuery = {
      movieName,
    };

    const isMovieExist = await findOne(Movie, findQuery);

    if (isMovieExist) {
      throw new CustomError('Movie already registered.', 404);
    }

    const createQuery = {
      movieName,
      movieImage,
      description,
    };

    const newMovie = await createOne(Movie, createQuery);

    if (!newMovie) {
      throw new CustomError('Request can not be processed by server.', 500);
    }

    return res.status(200).send({
      data: {
        message: 'Movie Added successfully',
      },
    });
  } catch (err) {
    return res.status(err.code).send({ errors: [{ message: err.message }] });
  }
};
