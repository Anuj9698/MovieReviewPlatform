const CustomError = require('../helper/Error');

const findOne = async (
  model,
  query,
  select = {},
  populate = [],
  options = {}
) => {
  try {
    const doc = await model
      .findOne({ ...query })
      .select({ ...select })
      .populate(populate)
      .sort(options.sort)
      .exec();
    return doc;
  } catch (err) {
    throw new CustomError(err, 500);
  }
};

const findMany = async (model, query, select, populate = [], options = {}) => {
  try {
    const docs = await model
      .find({ ...query })
      .select({ ...select })
      .populate(populate)
      .skip(options.skip ? options.skip : 0)
      .limit(options.limit)
      .sort(options.sort)
      .lean()
      .exec();
    return docs;
  } catch (err) {
    throw new CustomError(err, 500);
  }
};

const createOne = async (model, query) => {
  try {
    const doc = await model.create({ ...query });
    return doc;
  } catch (err) {
    throw new CustomError(err, 500);
  }
};

const updateOne = async (model, query) => {
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        { ...query.where },
        { ...query.data },
        { ...query.options, new: true }
      )
      .lean()
      .exec();

    return updatedDoc;
  } catch (err) {
    throw new CustomError(err, 500);
  }
};

const findCount = async (model, query) => {
  try {
    const doc = await model.countDocuments({ ...query }).exec();
    return doc;
  } catch (err) {
    throw new CustomError(err, 500);
  }
};

const aggregate = async (model, query) => {
  try {
    const doc = await model.aggregate(query);
    return doc;
  } catch (err) {
    console.log(err);
    throw new CustomError(err, 500);
  }
};

module.exports = {
  findMany,
  findOne,
  findCount,
  createOne,
  updateOne,
  aggregate,
};
