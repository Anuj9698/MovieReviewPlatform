const { Movie } = require('../../models');
const { CustomError } = require('../../helper');
const { aggregate, findCount } = require('../../utils/crud');

module.exports = async (req, res) => {
  try {
    const { skip = 0, limit = 10 } = req.query;

    const movieList = await getAllMovieList(skip, limit);
    const totalMovies = await getTotalCount();

    return res.status(200).send({
      data: {
        movieList: movieList,
        totalCount: totalMovies,
      },
    });
  } catch (err) {
    return res.status(err.code).send({ errors: [{ message: err.message }] });
  }
};

const getAllMovieList = async (skip, limit) => {
  const findQuery = [
    {
      $lookup: {
        from: 'userreviews',
        localField: '_id',
        foreignField: 'movieId',
        as: 'userreview',
      },
    },
    {
      $unwind: {
        path: '$userreview',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: '$_id',
        movieName: { $first: '$movieName' },
        avgRating: {
          $avg: { $cond: ['$userreview.rating', '$userreview.rating', 0] },
        },
        ratingCount: { $sum: { $cond: ['$userreview', 1, 0] } },
        createdAt: { $first: '$createdAt' },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    { $skip: Number(skip) },
    { $limit: Number(limit) },
  ];
  const movieList = await aggregate(Movie, findQuery);
  return movieList;
};

const getTotalCount = async () => {
  const count = await findCount(Movie);
  return count;
};
